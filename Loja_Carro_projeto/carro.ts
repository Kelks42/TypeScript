"use strict";
Object.defineProperty(exports, "_esModule", {value: true});
var Carro = /**@class */ function (){
function Carro(m, a, p){
    this.modelo = m;
    this.ano = a;
    this.preco = p;
    }
    Carro.prototype.getModelo = function (){
    return this.modelo;
    };

    Carro.prototype.setModelo = function (modelo) {
    return this.modelo = modelo;
    };

    Carro.prototype.getAno = function () {
        return this.ano
    };

    Carro.prototype.setAno = function (ano) {
        this.ano = ano;
    };    

    Carro.prototype.getPreco = function(){
        return this.preco;
    };

    Carro.prototype.setPreco = function (preco){
        return this.preco = preco;
    };
        return Carro;
}();
exports.default = Carro;
