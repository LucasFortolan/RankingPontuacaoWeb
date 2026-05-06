/*

O vetor listPerson armazena a lista principal de jogadores e é o vetor salvo no localStorage.

O vetor ranking é utilizado para controlar a exibição da tabela sem alterar diretamente a ordem original de listPerson. Ele é criado a partir de listPerson usando toSorted(), gerando um novo vetor ordenado, mas mantendo referência aos mesmos objetos dos jogadores.

Dessa forma, listPerson permanece como a base principal de dados, enquanto ranking funciona como uma visão ordenada dos jogadores para exibição na tabela.

A variável ordemRanking armazena a última ordem escolhida pelo usuário, podendo ser "crescente" ou "decrescente". Esse valor também é salvo no localStorage para que, ao recarregar a página, a tabela continue sendo exibida na última configuração selecionada. Caso não exista nenhuma ordem salva, o valor padrão utilizado será `"crescente"`.

O ranking real é sempre calculado considerando a maior pontuação como a melhor posição. A diferença entre crescente e decrescente afeta apenas a forma de exibição da tabela, não a posição real dos jogadores.

No projeto, o vetor ranking é mantido em ordem decrescente, pois essa é a ordem real de classificação. Quando a exibição crescente é selecionada, a tabela apenas percorre esse vetor no sentido inverso, evitando uma nova ordenação apenas para mudar a visualização, evitando custo de adicional de processamento para mudar a ordenação.
*/

class Person {
    constructor(nome, pontuacao) {
        this.nome = nome,
        this.pontuacao = pontuacao;
    }
}

let listPerson = JSON.parse(localStorage.getItem("usuarios")) || [];
let ranking = [];
let ordemRanking = localStorage.getItem("ordemRanking") || "decrescente";

const formUsuario = document.getElementById("formUsuario")
const formApagar = document.getElementById("formApagarJogador")

formApagar.addEventListener("submit", function(event) {
    event.preventDefault();
    apagarJogador();
});

function apagarJogador() {
    document.getElementById("text-FormApagar").textContent = ""
    const nome = document.getElementById("inputNomeApagar").value.trim().toUpperCase();
    for (let i = 0; i < listPerson.length; i++) {
        if (listPerson[i].nome === nome) {
            listPerson.splice(i, 1);
            salvarUsuariosLocalStorage();
            aplicarOrdemSalva();
            document.getElementById("inputNomeApagar").value = "";
            document.getElementById("text-FormApagar").textContent = `Jogador: ${nome} foi apagado.`;
            break;
        }
        else if (i+1 == listPerson.length){
            document.getElementById("text-FormApagar").textContent = `Jogador: ${nome} não encontrado.` 
        }
    }
    
}   

function salvarUsuariosLocalStorage() {
    localStorage.setItem("usuarios", JSON.stringify(listPerson));
}

function salvarOrdemRankingLocalStorage() {
    localStorage.setItem("ordemRanking", ordemRanking);
}

function adicionar() {
    const nome = document.getElementById("inputNome").value.trim().toUpperCase();
    const pontuacao = Number.parseInt(document.getElementById("inputPontuacao").value);
    if (listPerson.length == 0) {
        let novaPessoa = new Person(nome,pontuacao)
        listPerson.push(novaPessoa)
    }
    else if (listPerson.length > 0) {
        for (let i = 0; i < listPerson.length; i++) {
            if (listPerson[i].nome === nome) {
                listPerson[i].pontuacao += pontuacao;
                if (listPerson[i].pontuacao > 999) {
                    listPerson[i].pontuacao = 999;
                    document.getElementById("text-formUsuario").textContent = `Jogador: ${nome} recebeu novos pontos. O limite máximo é 999 pontos.`;
                    break
                }
                document.getElementById("text-formUsuario").textContent = `Jogador: ${nome} recebeu novos pontos.`
                break
            }
            else if (i + 1 == listPerson.length) {
                let novaPessoa = new Person(nome,pontuacao)
                listPerson.push(novaPessoa)
                document.getElementById("text-formUsuario").textContent = `Jogador: ${nome} foi cadastrado.`
                break
            }
        }
    }
    atualizarPosicoesRanking();
    imprimirRanking();
    document.getElementById("inputNome").value = "";
    document.getElementById("inputPontuacao").value = "";
}

// add.EventListener -> fique observando esse elemento e execute uma função quando algo acontecer
// "submit" é o evento
// function(event) Essa é a função que será executada quando o formulário for enviado.
formUsuario.addEventListener("submit", function(event) {
    event.preventDefault(); //  Impede o comportamento padrão de um formulário é: enviar os dados e recarregar a página
    adicionar();
    salvarUsuariosLocalStorage();
});

function imprimirRanking() {
    var tabela = document.getElementById("tabelaBody");
    tabela.innerHTML = "";

    atualizarPosicoesRanking();
    if (ordemRanking == "crescente"){
        for (let i = 0; i < ranking.length; i++) {
            var linha = tabela.insertRow();

            var colunaNome = linha.insertCell(0);
            var colunaPontuacao = linha.insertCell(1);
            var colunaRanking = linha.insertCell(2);

            colunaNome.textContent = ranking[i].nome;
            colunaPontuacao.textContent = ranking[i].pontuacao;
            colunaRanking.textContent = ranking[i].posicao;
        }
    }
    if (ordemRanking == "decrescente"){
        for (let i = ranking.length - 1; i >= 0; i--) {
            var linha = tabela.insertRow();

            var colunaNome = linha.insertCell(0);
            var colunaPontuacao = linha.insertCell(1);
            var colunaRanking = linha.insertCell(2);

            colunaNome.textContent = ranking[i].nome;
            colunaPontuacao.textContent = ranking[i].pontuacao;
            colunaRanking.textContent = ranking[i].posicao;
        }
    }
}

function atualizarPosicoesRanking() {
    // Decrescente
    ranking = listPerson.toSorted((a, b) => b.pontuacao - a.pontuacao);

    let posicao = 1;

    for (let i = 0; i < ranking.length; i++) {
        if (i > 0 && ranking[i].pontuacao !== ranking[i - 1].pontuacao) {
            posicao = i + 1;
        }

        ranking[i].posicao = posicao;
    }
}

function rankingCrescente() {
    ordemRanking = "crescente"
    salvarOrdemRankingLocalStorage();
    imprimirRanking();
}

function rankingDecrescente() {
    ordemRanking = "decrescente"
    salvarOrdemRankingLocalStorage();
    imprimirRanking();
}   

imprimirRanking();