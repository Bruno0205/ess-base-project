Feature: Busca de Reservas

Scenario: Após ir para a página das pesquisas, selecionar para "Ver Detalhes" na reserva "Residencia Schrader" e a partir da página da reserva abrir a página de comentários.
    Given o usuário clica em "Buscar por Reservas"
    And o usuário clica em "Ver Detalhes" na reserva "Residencia Schrader"
    And o usuário clica em "Mostrar Avaliações"
    Then o usuário deve ir para a página de comentários da reserva "Residencia Schrader"

Scenario: A partir da página de usuário de "BrunoCS8" e após clicar em "Minhas Locações", selecionar "Ver Detalhes" na reserva "Casa Beira Mar" e a partir da página da reserva abrir a página de comentários.
    Given o usuário está na página de usuário de "BrunoCS8"
    When o usuário clica em "Minhas Locações"
    And o usuário clica em "Ver Detalhes" na reserva "Casa Beira Mar"
    And o usuário clica em "Mostrar Avaliações"
    Then o usuário deve ir para a página de comentários da reserva "Casa Beira Mar"

Scenario: A partir da página de avaliações da reserva "Beira Mar", adicionar uma avaliação com o nome "BarneyMat", 4 estrelas marcadas e o comentário de "Show de bola!" e postar na página.
    Given o usuário está na página de comentários da reserva "Beira Mar" no nome do usuário "BrunoCS8"
    When o usuário adiciona uma avaliação com o nome "BarneyMat", 4 estrelas e o comentário "Show de bola!"
    And o usuário clica em "Postar"
    Then a avaliação deve ser postada com sucesso

Scenario: A partir da página de avaliações da reserva "Beira Mar", adicionar uma avaliação com o nome "BarneyMat", não marcar nenhum comentário, e não conseguir postar na página.
    Given o usuário está na página de comentários da reserva "Beira Mar" no nome do usuário "BrunoCS8"
    When o usuário adiciona uma avaliação com o nome "BarneyMat" e não coloca nenhum comentário
    And o usuário clica em "Postar"
    Then o usuário deve ver uma mensagem de erro indicando que o campo de comentários é obrigatório

Scenario: A partir da página de avaliações da reserva "Beira Mar", adicionar uma avaliação com comentário "Eu não sei meu nome!!" e nenhum nome, e não conseguir postar na página.
    Given o usuário está na página de comentários da reserva "Beira Mar" no nome do usuário "BrunoCS8"
    When o usuário adiciona uma avaliação com o comentário "Eu não sei meu nome!!" e não preenche o campo de nome
    And o usuário clica em "Postar"
    Then o usuário deve ver uma mensagem de erro indicando que o campo de nome é obrigatório