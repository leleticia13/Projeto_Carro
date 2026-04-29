import { salvarArquivo } from './script_api.js';
/* PEGANDO ELEMENTOS DO DOM */
const formVeiculo = document.querySelector('#formVeiculo');
const btnCalcular = document.querySelector('#calcular');
const resultado = document.querySelector('#card-veiculo');

/* Array pessoa */
const formulário = [];

/* capturando o evento de click no botão de calcular */
btnCalcular.addEventListener('click', async (e) => {
    e.preventDefault();

    const formformulário = new FormData(formImc);
    const objformulário = {
        modelo: formformulário.get('modelo'),
        marca: formformulário.get('marca'),
        placa: formformulário.get('placa'),
        anoDeFabricacao: parseFloat(formformulário.get('anoDeFabricacao')),
        valorDoVeiculo: parseFloat(formformulário.get('valorDoVeiculo')),
        cor: formformulário.get('cor'),
        tipoCombustivel: formformulário.get('tipoCombustivel')
    }
    const resultadoSalvar = await salvarArquivo(objformulário);
    formImc.reset();
});