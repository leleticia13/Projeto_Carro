const form = document.getElementById("formVeiculo");
const lista = document.getElementById("listaVeiculos");

form.addEventListener("submit", function (e) {
    e.preventDefault();
});

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

let seguro = valor * 0.10;

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