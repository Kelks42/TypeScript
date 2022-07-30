"use strict";
Object.defineProperty(exports, "_esModule", {value: true});
var CompraCarro = /**@class */ function (){
    function CompraCarro(cli, fun, car){
        this.cliente = cli;
        this.funcionario = fun;
        this.carro = car;
        this.carro.setPreco(this.DarDesconto(this.carro.getPreco()))
        this.precoFinal = this.carro.getPreco;
        this.funcionario.setComissao(this.addComissao(this.precoFinal))
        this.valorComDesconto = 0;
 }

 CompraCarro.prototype.DarDesconto = function(preco){
    if(this.carro.getAno() < 2020){
        this.valorComDesconto = this.carro.getPreco() * 0.60;
        this.carro.setPreco(this.valorComDesconto);
    }
    else{
        this.carro.setPreco(preco);
    }
    if (this.cliente.getRenda() < 5000){
        this.valorComDesconto = this.carro.getPreco () * 0.60
        return this.carro.setPreco(this.valorComDesconto)
    }
    else{
        return this.carro.setPreco(this.carro.getPreco());
    }
 };

 CompraCarro.prototype.addComissao = function (valor) {
    return this.funcionario.setComissao(valor * 0.03);
};
}

CompraCarro.prototype.detalharCompra = function () {
    console.log("Nome: " + this.cliente.getNome() + "\nCarro: " + this.carro.getModelo() + ", Ano: " + this.carro.getAno() + ", Preço: " + this.carro.getPreco() + "\nFuncion\u00E1rio: " + this.funcionario.getNome() + ", Comiss\u00E3o: R$ " + this.funcionario.getComissao());

    return CompraCarro;
};

    exports.default = CompraCarro;
