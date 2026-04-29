const salvarArquivo = async (objformulário) => {
    console.log(objformulário)
    const endPoint = 'https://localhost:7123/api/Formulário';

    try {
        const resposta = await fetch(
            endPoint, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objformulário)
        })

        if (resposta.ok) {
            const txtErro = await resposta.text();
            throw new Error(txtErro);
        }
        const dados = await resposta.json();
        return dados;

    } catch (erro) {
        console.log('Erro ao salvar o arquivo:', erro)
    }
}
export { salvarArquivo };