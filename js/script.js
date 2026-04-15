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