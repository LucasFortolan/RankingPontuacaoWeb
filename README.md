# Sistema de Ranking de Pontuação Web

Sistema web simples para controle de pontuação e ranking de jogadores, desenvolvido com **HTML**, **CSS** e **JavaScript**.

O projeto permite cadastrar jogadores, somar pontuações, apagar jogadores, ordenar a exibição da tabela e manter os dados salvos no navegador usando `localStorage`.

## Funcionalidades

- Cadastro de jogadores com nome e pontuação
- Soma automática de pontos caso o jogador já exista
- Limite máximo de 999 pontos por jogador
- Exclusão de jogadores pelo nome
- Ranking baseado na maior pontuação
- Tratamento de empate na mesma posição
- Ordenação de exibição crescente e decrescente
- Salvamento dos dados no `localStorage`
- Interface simples

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- LocalStorage
- 
## Como funciona a lógica do ranking

- O vetor `listPerson` armazena a lista principal de jogadores e é o vetor salvo no `localStorage`.
- O vetor `ranking` é utilizado para controlar a exibição da tabela sem alterar diretamente a ordem original de `listPerson`. Ele é criado a partir de `listPerson` usando `toSorted()`, gerando um novo vetor ordenado, mas mantendo referência aos mesmos objetos dos jogadores.
- Dessa forma, `listPerson` permanece como a base principal de dados, enquanto `ranking` funciona como uma visão ordenada dos jogadores para exibição na tabela.
- A variável `ordemRanking` armazena a última ordem escolhida pelo usuário, podendo ser `"crescente"` ou `"decrescente"`. Esse valor também é salvo no `localStorage` para que, ao recarregar a página, a tabela continue sendo exibida na última configuração selecionada.
- O ranking real é sempre calculado considerando a maior pontuação como a melhor posição. A diferença entre crescente e decrescente afeta apenas a forma de exibição da tabela, não a posição real dos jogadores.
- No projeto, o vetor `ranking` é mantido em ordem decrescente, pois essa é a ordem real de classificação. Quando a exibição crescente é selecionada, a tabela apenas percorre esse vetor no sentido inverso, evitando uma nova ordenação apenas para mudar a visualização, evitando custo de adicional de processamento para mudar a ordenação.

## Estrutura do projeto

```text
ranking-pontuacao-web/
│
├── index.html
├── style.css
└── script.js

## Regras do sistema

### Cadastro de jogador

- O nome do jogador deve ter no mínimo **3 caracteres** e no máximo **20 caracteres**.
- A pontuação informada deve ser um número inteiro entre **1 e 999**.
- Ao cadastrar um nome, o sistema transforma o texto em letras maiúsculas.
- Espaços antes e depois do nome são removidos automaticamente.

### Pontuação

- Se o jogador ainda não existir, ele será cadastrado com a pontuação informada.
- Se o jogador já existir, a pontuação informada será somada à pontuação atual.
- A pontuação máxima acumulada por jogador é **999 pontos**.
- Caso a soma ultrapasse 999, a pontuação do jogador será limitada a **999**.

### Ranking

- O ranking real sempre considera a maior pontuação como a melhor colocação.
- O jogador com maior pontuação ocupa a **1ª posição**.
- Jogadores com a mesma pontuação ocupam a mesma posição no ranking.
- Quando há empate, a próxima posição considera a quantidade real de jogadores anteriores.

### Ordenação da tabela

- O botão **Decrescente** exibe a tabela da maior pontuação para a menor.
- O botão **Crescente** exibe a tabela da menor pontuação para a maior.
- A ordenação muda apenas a forma de exibição.
- A posição real no ranking continua baseada na maior pontuação.

### Exclusão de jogador

- O jogador pode ser apagado pelo nome.
- O nome digitado para exclusão também é convertido para letras maiúsculas.
- Se o jogador for encontrado, ele será removido da lista.
- Se o jogador não for encontrado, o sistema exibe uma mensagem informando isso.
- Após apagar um jogador, o ranking é atualizado automaticamente.

### Armazenamento

- Os jogadores são salvos no `localStorage` do navegador.
- A última ordenação escolhida também é salva no `localStorage`.
- Ao recarregar a página, os jogadores continuam cadastrados.
- Os dados ficam salvos apenas no navegador utilizado.
