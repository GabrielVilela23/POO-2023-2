//Disciplina: Programação Orientada a Objetos- Integral

//Alunos: André Caly, Gabriel Vilela, Gabrielly Vieira, Livia Canuto

"use strict";

class Bicicleta {
    constructor(cor) {
        this.status = false;
        this.cor = cor;
    }
    alterarStatus(status) {
        this.status = status;
    }
}

class Usuario {
    constructor(nome, cpf, telefone) {
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
    }
}

class Aluguel {
    constructor(usuario, bicicleta, diaInicial, diaFinal, valor) {
        this.diaInicial = diaInicial;
        this.diaFinal = diaFinal;
        this.valor = valor;
        this.usuario = usuario;
        this.bicicleta = bicicleta;
    }

    calculo() {
        const diasAluguel = this.diaFinal - this.diaInicial;
        this.valor += diasAluguel * 60;
        return diasAluguel;
    }

    finaliza() {
        this.bicicleta.alterarStatus(true);
    }
}

class GerenciadorClientes {
    constructor() {
        this.clientes = [];
    }

    cadastrarCliente(nome, cpf, telefone) {
        const novoCliente = new Usuario(nome, cpf, telefone);
        this.clientes.push(novoCliente);
        return novoCliente;
    }

    alugarBicicleta(cliente, bicicleta, diaInicial, diaFinal, valorInicial) {
        const aluguel = new Aluguel(cliente, bicicleta, diaInicial, diaFinal, valorInicial);
        const diasAluguel = aluguel.calculo();
        aluguel.finaliza();
        return aluguel;
    }

}

const gerenciador = new GerenciadorClientes();

const felipe = gerenciador.cadastrarCliente('Felipe', '11122233345', '11992876562');
const maria = gerenciador.cadastrarCliente('Maria', '44455566677', '11991234567');

const bike = new Bicicleta('branco');
bike.alterarStatus(true);

const aluguelFelipe = gerenciador.alugarBicicleta(felipe, bike, 3, 7, 0);
const aluguelMaria = gerenciador.alugarBicicleta(maria, bike, 2, 5, 0);

console.log(`${aluguelFelipe.usuario.nome}, seu aluguel da bicicleta na cor '${aluguelFelipe.bicicleta.cor}' por ${aluguelFelipe.diaFinal - aluguelFelipe.diaInicial} dia(s) e pelo valor de R$ ${aluguelFelipe.valor.toFixed(2)} está concluído!`);
console.log(`${aluguelMaria.usuario.nome}, seu aluguel da bicicleta na cor '${aluguelMaria.bicicleta.cor}' por ${aluguelMaria.diaFinal - aluguelMaria.diaInicial} dia(s) e pelo valor de R$ ${aluguelMaria.valor.toFixed(2)} está concluído!`);
