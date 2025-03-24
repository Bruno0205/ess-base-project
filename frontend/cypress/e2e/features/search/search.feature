Feature: Busca de Reservas

Scenario: Abrir a página de pesquisa
    Given o usuário vai para a página de pesquisa
    Then o usuário deve ver a mensagem "Filtre sua reserva dos sonhos!"

Scenario: Buscar reservas em Recife que sejam casas pet friendly e destacadas
    Given o usuário vai para a página de pesquisa e escolhe "Pernambuco" no campo "estado" e escolhe "Casa" no campo "tipo" e marca "petfriendly" e marca "destacado"
    When o usuário clica no botão "Buscar"
    Then o usuário deve ir para a página "search" e ver uma lista filtrada de reservas

Scenario: Buscar reservas com preço mínimo de 10000 reais e destacadas
    Given o usuário vai para a página de pesquisa e escolhe "10000" no campo "valmin" e marca "destacado"
    When o usuário clica no botão "Buscar"
    Then o usuário não vai encontrar nenhuma reserva