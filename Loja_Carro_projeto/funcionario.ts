export default class funcionario{
    nome: string;
    comissao: number = 0;

    constructor(n: string){
        this.nome = n;
    }

    public getNome(){
        return this.nome
    }

    public setNome(nome: string){
        this.nome;
    }

    public getComissao(){
        return this.comissao
    }

    public setComissao(comissao: number){
        this.comissao = comissao;
    }
}