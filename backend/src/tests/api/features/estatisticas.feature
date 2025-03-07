Feature: Visualizar estatísticas de um imóvel

  Scenario: Vizualizar estatísticas de um imóvel
    Given que o usuário está logado como "anfitrião"
    And e que há várias reservas efetuadas no imóvel "Casa Aconchegante" do usuário anfitrião no banco de dados
    And que o usuário está na página de estatística
    When ele seleciona o imóvel "Casa Aconchegante"
    And clica no botão ver estatísticas
    Then o sistema exibe um histórico de reservas do imóvel "Casa Aconchegante"

  Scenario: Vizualizar estatísticas segmentadas de um imóvel
    Given que o usuário está logado como "anfitrião"
    And que há várias reservas efetuadas no imóvel "Casa Aconchegante", onde 2 foram na temporada de "Carnaval" e 2 na temporada "Fim de ano" do usuário anfitrião no banco de dados
    And que o usuário está na página de estatística
    When ele seleciona o imóvel "Casa Aconchegante"
    And clica no botão ver estatísticas
    And clica na opção de "Carnaval"
    Then o sistema exibe um histórico de reservas do imóvel "Casa Aconchegante" segmentado pelo período de "Carnaval"
