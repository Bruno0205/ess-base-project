Feature: Login do Usuário

  Como um usuário do sistema,
  quero fazer login com minhas credenciais,
  para acessar minha página pessoal.

  Scenario: Login bem-sucedido com credenciais válidas
    Given o usuário está na página "/login"
    When o usuário preenche o campo "Login" com "BrunoCS8" e o campo "Senha" com "Senha123"
    And o usuário clica no botão "Entrar"
    Then o usuário deve ser redirecionado para a página "/usuario/BrunoCS8"

  Scenario: Tentar login com credenciais inválidas
    Given o usuário está na página "/login"
    When o usuário preenche o campo "Login" com "UsuarioIncorreto" e o campo "Senha" com "SenhaErrada"
    And o usuário clica no botão "Entrar"
    Then o usuário deve ver a mensagem "Login ou senha incorretos"
    And o backend deve retornar erro com status 401 e mensagem "Credenciais inválidas"