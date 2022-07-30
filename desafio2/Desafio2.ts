@@ -0.0 +1.35 @@

enum Trabalho {
    Atriz,
    Padeiro
}

type trabalhador = {
    nome: string,
    idade: number,
    profissao: Trabalho
}

let pessoa1: trabalhador = {
    nome: 'maria',
    idade: 29,
    profissao: Trabalho.Atriz
};

let pessoa2: trabalhador = {
    nome: 'roberto',
    idade: 19,
    profissao: Trabalho.Padeiro
};

let pessoa3: trabalhador = {
    nome: 'laura',
    idade: 32,
    profissao: Trabalho.Atriz
};

let pessoa4: trabalhador = {
    nome: "carlos",
    idade: 19,
    profissao: Trabalho.Padeiro
}