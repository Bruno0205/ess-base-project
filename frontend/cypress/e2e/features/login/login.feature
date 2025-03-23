Feature: Testar o fluxo de login

  Scenario: Login bem-sucedido com credenciais válidas
    Given o usuário está na página "/login"
    When o usuário preenche o campo "Login" com "BrunoCS8" e o campo "Senha" com "Senha123"
    And o usuário clica no botão "Entrar"
    Then o usuário deve ser redirecionado para a página "/usuario/BrunoCS8"