import { salvarArquivo, listarVeiculos, excluirVeiculo, alterarVeiculo } from "./script_api.js";

const formVeiculo = document.querySelector('#formVeiculo');
const btnCalcular = document.querySelector('#calcular');
const divLista = document.querySelector('#veiculoList');

let veiculos = [];

/* BOTÃO */
btnCalcular.addEventListener('click', async (e) => {
    e.preventDefault();

    const formData = new FormData(formVeiculo);

    const objVeiculo = {
        idFormulário: sessionStorage.getItem('veiculoId') || 0,
        modelo: formData.get('modelo'),
        marca: formData.get('marca'),
        placa: formData.get('placa'),
        anoDeFabricacao: formData.get('anoDeFabricacao'),
        valorDoVeiculo: parseFloat(formData.get('valorDoVeiculo')),
        cor: formData.get('cor'),
        tipoCombustivel: formData.get('tipoCombustivel')
    };

    if (sessionStorage.getItem('veiculoId') == null) {
        await salvarArquivo(objVeiculo);
    } else {
        await alterarVeiculo(objVeiculo);
        sessionStorage.removeItem('veiculoId');
    }

    formVeiculo.reset();
    listarTodosVeiculos();
});


/* LISTAR */
const listarTodosVeiculos = async () => {
    divLista.innerHTML = '';

    veiculos = await listarVeiculos();

    veiculos.forEach(veiculo => {
        console.log(veiculo); // DEBUG

        //const id = veiculo["idFormulário"]; // 👈 CORRETO

        const id = veiculo.idFormulário; // 👈 CORRETO
        
        const item = document.createElement('div');

        item.className = 'card-veiculo';

        item.innerHTML = `
            <p><strong>Modelo:</strong> ${veiculo.modelo}</p>
            <p><strong>Marca:</strong> ${veiculo.marca}</p>
            <p><strong>Placa:</strong> ${veiculo.placa}</p>
            <p><strong>Ano:</strong> ${new Date(veiculo.anoDeFabricacao).toLocaleDateString()}</p>
            <p><strong>Valor:</strong> R$ ${veiculo.valorDoVeiculo}</p>
            <p><strong>Cor:</strong> ${veiculo.cor}</p>
            <p><strong>Combustível:</strong> ${veiculo.tipoCombustivel}</p>
        `;

        divLista.appendChild(item);

        /* EXCLUIR */
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';

        deleteBtn.addEventListener('click', async () => {
            console.log('ID PARA EXCLUIR:', id);

            if (!id) {
                alert('ID não encontrado!');
                return;
            }

            if (!confirm(`Deseja excluir ${veiculo.modelo}?`)) return;

            const removido = await excluirVeiculo(id);

            if (removido) {
                item.remove();
            }
        });

        item.appendChild(deleteBtn);

        /* ALTERAR */
        const alterar = document.createElement('button');
        alterar.textContent = 'Alterar';

        alterar.addEventListener('click', () => {
            console.log('ID PARA ALTERAR:', id);

            if (!id) {
                alert('ID não encontrado!');
                return;
            }

            carregarForm(veiculo);

            sessionStorage.setItem('veiculoId', id);
        });

        item.appendChild(alterar);
    });
};


/* CARREGAR FORM */
const carregarForm = (v) => {
    document.querySelector('#modelo').value = v.modelo;
    document.querySelector('#marca').value = v.marca;
    document.querySelector('#placa').value = v.placa;
    document.querySelector('#anoDeFabricacao').value = v.anoDeFabricacao;
    document.querySelector('#valorDoVeiculo').value = v.valorDoVeiculo;
    document.querySelector('#cor').value = v.cor;

    document.querySelectorAll('input[name="tipoCombustivel"]').forEach(r => {
        if (r.value === v.tipoCombustivel) {
            r.checked = true;
        }
    });
};


/* INICIAR */
listarTodosVeiculos();