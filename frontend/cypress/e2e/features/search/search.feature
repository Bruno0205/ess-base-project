Feature: Busca de Reservas

Scenario: Buscar reservas em Recife que sejam casas pet friendly e destacadas
    Given o usuário vai para a página de pesquisa e escolhe "Pernambuco" no campo "estado" e escolhe "Casa" no campo "tipo" e marca "petfriendly" e marca "destacado"
    When o usuário clica no botão "Buscar"
    Then o usuário deve ir para a página "search" e ver uma lista filtrada de reservas