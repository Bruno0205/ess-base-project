Feature: Verificar Conta

  Como um usuário,
  quero verificar minha conta inserindo meu e-mail,
  para que eu possa receber um código de verificação.

  Scenario: Verificar conta com sucesso
    Given estou na página "/usuario/BrunoCS8"
    When clico em "Verificar Conta"
    Then sou redirecionado para "/usuario/BrunoCS8/liberarConta"
    When preencho o campo "E-mail" com "bcs6@cin.ufpe.br"
    And clico em "Solicitar Código"
    Then vejo a mensagem "Código enviado para o email!"

  Scenario: Verificar conta com e-mail inexistente
    Given estou na página "/usuario/BrunoCS8"
    When clico em "Verificar Conta"
    Then sou redirecionado para "/usuario/BrunoCS8/liberarConta"
    When preencho o campo "E-mail" com "teste23@gkmail"
    And clico em "Solicitar Código"
    Then vejo a mensagem "Usuário não encontrado"