import { salvarArquivo } from './script_api.js';
/* PEGANDO ELEMENTOS DO DOM */
const formVeiculo = document.querySelector('#formVeiculo');
const btnCalcular = document.querySelector('#calcular');
const resultado = document.querySelector('#card-veiculo');

/* Array pessoa */
const Formulário = [];

/* capturando o evento de click no botão de calcular */
btnCalcular.addEventListener('click', async (e) => {
    e.preventDefault();

    const formformulario = new FormData(formVeiculo);
    const objformulario = {
        modelo: formformulario.get('modelo'),
        marca: formformulario.get('marca'),
        placa: formformulario.get('placa'),
        anoDeFabricacao: formformulario.get('anoDeFabricacao'),
        valorDoVeiculo: formformulario.get('valorDoVeiculo'),
        cor: formformulario.get('cor'),
        tipoCombustivel: formformulario.get('tipoCombustivel')
    }
    const resultadoSalvar = await salvarArquivo(objformulário);
    formImc.reset();
});