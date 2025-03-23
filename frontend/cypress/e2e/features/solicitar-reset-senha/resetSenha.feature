Feature: Solicitar Reset de Senha

  Como um usuário esquecido da senha,
  quero solicitar um reset de senha,
  para poder recuperar o acesso ao sistema.

  Scenario: Solicitar reset de senha com sucesso
    Given o usuário está na página "/login"
    When o usuário clica no primeiro link "Clique aqui"
    Then o usuário deve ser redirecionado para a página "/mudar-senha"
    When o usuário preenche o campo "E-mail" com "bcs6@cin.ufpe.br"
    And o usuário clica no botão "Enviar"
    Then o usuário deve ser redirecionado para a página "/resetar-senha"