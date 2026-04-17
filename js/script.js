const form = document.getElementById("formVeiculo");
const lista = document.getElementById("veiculoList");

// FUNÇÃO EXCLUIR (do botão "X" no card)
function excluirVeiculo(botao) {
    let card = botao.closest(".card-veiculo"); // pega o card inteiro
    card.remove();
}

// Função para calcular seguro e IPVA, criar o card e adicionar à lista
form.addEventListener("submit", function (e) {
    e.preventDefault();

    let modelo = document.getElementById("modelo").value;
    let marca = document.getElementById("marca").value;
    let placa = document.getElementById("placa").value;
    let ano = document.getElementById("ano").value;
    let valor = document.getElementById("valor").value;
    let combustivel = document.querySelector('input[name="combustivel"]:checked');

    if (!modelo || !marca || !placa || !ano || !valor || !combustivel) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    /* =========CALCULO DE IPVA E SEGURO======== */
    let tipo = combustivel.value;

    let anoAtual = new Date().getFullYear();
    let idade = anoAtual - ano;

    let seguro = valor * 0.10;

    let ipva = 0;
    let ipvaTexto = "";

    if (idade > 20) {
        ipvaTexto = "Isento";
    } else {
        if (tipo === "gasolina") ipva = valor * 0.20;
        else if (tipo === "etanol") ipva = valor * 0.15;
        else if (tipo === "bicombustivel") ipva = valor * 0.10;
        else if (tipo === "hibrido") ipva = valor * 0.08;
        else if (tipo === "eletrico") ipva = valor * 0.02;

        ipvaTexto = "R$ " + ipva.toFixed(2);
    }

    let total = idade > 20 ? seguro : seguro + ipva;


    // =========CRIAR CARDS E ADICIONAR À LISTA =========
    const veiculoDiv = document.createElement("div");
    veiculoDiv.classList.add("card-veiculo");

    veiculoDiv.innerHTML = `
        <div class="excluir">
            <button onclick="excluirVeiculo(this)" class="apagar">X</button>
        </div>

        <div class="info">
            <p><strong>Modelo:</strong> ${modelo}</p>
            <p><strong>Marca:</strong> ${marca}</p>
            <p><strong>Placa:</strong> ${placa}</p>
            <p><strong>Ano:</strong> ${ano}</p>
            <p><strong>Valor:</strong> R$ ${valor}</p>
            <p><strong>Combustível:</strong> ${tipo}</p>
            <br><hr><br>
            <p><strong>Seguro:</strong> R$ ${seguro.toFixed(2)}</p>
            <p><strong>IPVA:</strong> ${ipvaTexto}</p>
            <p><strong>Total:</strong> R$ ${total.toFixed(2)}</p>
        </div>
    `;

    lista.appendChild(veiculoDiv);

    form.reset();
});

// ========= BOTÃO LIMPAR =========
function reset_btn() {
    document.getElementById("modelo").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("placa").value = "";
    document.getElementById("ano").value = "";
    document.getElementById("valor").value = "";

    let combustivel = document.querySelector('input[name="combustivel"]:checked');
    if (combustivel) {
        combustivel.checked = false;
    }
}