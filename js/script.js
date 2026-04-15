const form = document.getElementById("formVeiculo");
const lista = document.getElementById("listaVeiculos");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let modelo = document.getElementById("modelo").value;
    let marca = document.getElementById("marca").value;
    let placa = document.getElementById("placa").value;
    let ano = document.getElementById("ano").value;
    let valor = document.getElementById("valor").value;
    let combustivel = document.querySelector('input[name="combustivel"]:checked');

    if (!combustivel) {
        alert("Escolha o combustível");
        return;
    }

    let tipo = combustivel.value;

    let anoAtual = new Date().getFullYear();
    let idade = anoAtual - ano;

    // seguro 10%
    let seguro = valor * 0.10;

    // ipva
    let ipva = 0;
    let ipvaTexto = "";

    if (idade > 20) {
        ipvaTexto = "Isento";
    } else {
        if (tipo === "gasolina") {
            ipva = valor * 0.20;
        } else if (tipo === "etanol") {
            ipva = valor * 0.15;
        } else if (tipo === "bicombustivel") {
            ipva = valor * 0.10;
        } else if (tipo === "hibrido") {
            ipva = valor * 0.08;
        } else if (tipo === "eletrico") {
            ipva = valor * 0.02;
        }

        ipvaTexto = "R$ " + ipva.toFixed(2);
    }

    let total;
    if (idade > 20) {
        total = seguro;
    } else {
        total = seguro + ipva;
    }

    let li = document.createElement("li");

    li.innerHTML =
        "Modelo: " + modelo + " | Marca: " + marca + " | Placa: " + placa + "<br>" +
        "Idade: " + idade + "<br>" +
        "Seguro: R$ " + seguro.toFixed(2) + "<br>" +
        "IPVA: " + ipvaTexto + "<br>" +
        "Total: R$ " + total.toFixed(2) + "<br>" +
        "<button class='remover'>Remover</button>";

    // remover
    li.querySelector(".remover").onclick = function () {
        li.remove();
    };

    lista.appendChild(li);

    // limpar formulário
    form.reset();
});