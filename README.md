# Lolisp2w
![Logo_lolisp2w](https://github.com/fuzilo/lolisp2w/assets/19290063/06763cdb-c5da-4183-a548-72b0fc0ccd57)


Bem-vindo ao repositório de skins do League of Legends LolisPw2! 
Este projeto tem como objetivo fornecer uma base de dados abrangente e organizada de skins do jogo League of Legends, facilitando a busca e visualização de informações sobre cada skin.

## Objetivo do Projeto
O principal objetivo desta aplicação é centralizar informações sobre todas as skins disponíveis no League of Legends, permitindo que os jogadores e entusiastas do jogo possam:
- Visualizar detalhes específicos de cada skin.
- Buscar skins por campeões, temas ou outras categorias.
- Manter-se atualizados com novas skins lançadas pela Riot Games.

## Motivação
A ideia para este projeto surgiu da necessidade de uma ferramenta que agregue todas as skins de maneira organizada e acessível. 
Com o grande número de skins disponíveis e lançamentos frequentes, é difícil para os jogadores acompanharem todas as opções disponíveis no jogo. 
Este repositório visa resolver este problema, proporcionando uma interface intuitiva e funcional para a navegação e busca de skins.

## Funcionalidades
- Busca de Skins: Pesquisa rápida e eficiente de skins por nome, campeão ou tema.
- Detalhes da Skin: Informações detalhadas sobre cada skin, incluindo data de lançamento, preço, nível de raridade, entre outros.
- Atualizações Regulares: O repositório será atualizado regularmente com novas skins e informações pertinentes.
- Interface Amigável: Interface de usuário intuitiva e fácil de usar.

## Tecnologias Utilizadas
- Node.js: Plataforma de desenvolvimento utilizada para a construção da aplicação.
- Express.js: Framework web para Node.js, usado para criar a API da aplicação.
- MongoDB: Banco de dados NoSQL utilizado para armazenar as informações das skins.
- React: Biblioteca JavaScript para construção da interface do usuário.

## Update 16/07/2024
    Funcionalidades de CRUD prontas. Inserido o motor de busca por termos parciais e case-insentive, porém é necessário especificar cada campo, como nome, tema, campeão. Por conta da lógica, ele só funciona para Strings. Para valores, como preço não é compatível. O mesmo pode-se dizer da data de lançamento. Provavelmente, o ideal será criar uma nova lógica de busca, para retornar um "range" de valores de preço e datas.
    # Update16/07/2024 - 2
    Adicionado a lógica de busca por intervalos, para datas e valores
   
 Rota e Query Parameters: A rota /skins/search aceita parâmetros de consulta (req.query) para field (campo a ser pesquisado) e value (valor a ser procurado).
 Construção da Query: A função constrói dinamicamente o objeto de consulta query, utilizando expressões regulares para permitir buscas parciais e case-insensitive.
 Consulta MongoDB: Skin.find(query) executa a consulta no banco de dados MongoDB com base nos parâmetros fornecidos.
## Exemplo de Uso:
- Buscar por parte do nome: /skins/search?field=name&value=akali
- Buscar por intervalo de preço: /skins/search?field=price&min=1000&max=2000
- Buscar por intervalo de datas: /skins/search?field=releaseDate&min=2019-01-01&max=2020-01-01