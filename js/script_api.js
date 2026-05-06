const salvarArquivo = async (objformulario) => {
    console.log(objformulario)
    const endPoint = 'https://localhost:7123/api/Formulário';

    try {
        const resposta = await fetch(
            endPoint, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objformulario)
        })

        if (!resposta.ok) {
            const txtErro = await resposta.text();
            throw new Error(txtErro);
        }
        const dados = await resposta.json();
        return dados;

    } catch (erro) {
        console.log('Erro ao salvar o arquivo:', erro)
    }
}

const listarVeiculos = async () => {
    const endPoint = 'https://localhost:7123/api/Formulário';

    try {   
        const resposta = await fetch(endPoint);
        if (!resposta.ok) {
            const txtErro = await resposta.text();
            throw new Error(txtErro);
        }
        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.log('Erro ao listar os veículos:', erro);
        return [];
    }
}

const excluirVeiculo = async (id) => {
    if (!id) {
        console.log('ID inválido:', id);
        return false;
    }

    const endPoint = `https://localhost:7123/api/Formulário/${id}`;

    try {
        const resp = await fetch(endPoint, {
            method: 'DELETE'
        });

        console.log('Status:', resp.status);

        return resp.ok;
    } catch (erro) {
        console.log('Erro ao excluir:', erro);
        return false;
    }
}

const alterarVeiculo = async (objformulario) => {

    console.log(objformulario);

    // 🔥 CORREÇÃO AQUI
    const id = objformulario["idFormulário"];

    if (!id) {
        console.log('ID não encontrado:', objformulario);
        return;
    }

    const endPoint = `https://localhost:7123/api/Formulário/${id}`;

    try {
        const resposta = await fetch(endPoint, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objformulario)
        });

        if (!resposta.ok) {
            const txtErro = await resposta.text();
            throw new Error(txtErro);
        }

        const dados = await resposta.json();
        return dados;

    } catch (erro) {
        console.log('Erro ao alterar veículo:', erro);
    }
}
export { salvarArquivo, listarVeiculos, excluirVeiculo, alterarVeiculo };