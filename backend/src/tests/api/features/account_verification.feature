Feature: Liberação de Conta

  Scenario: Successful account verification
    Given que existe um usuário com e-mail "Example@Newpas-s.br", código "AJSU23" e expiração válida
    When o usuário acessa o endpoint de verificação com o código "AJSU23"
    Then a resposta deve conter a mensagem "Conta verificada com sucesso!"
    And o status da conta do usuário deve ser atualizado para "liberado"

  Scenario: Failed account verification due to invalid code
    Given que existe um usuário com e-mail "Example@Newpas-s.br", código "AJSU23" e expiração válida
    When o usuário acessa o endpoint de verificação com o código "INVALIDO"
    Then a resposta deve conter a mensagem "Código inválido"

  Scenario: Failed account verification due to expired code
    Given que existe um usuário com e-mail "Example@Newpas-s.br", código "AJSU23" e expiração expirada
    When o usuário acessa o endpoint de verificação com o código "AJSU23"
    Then a resposta deve conter a mensagem "Código expirado"