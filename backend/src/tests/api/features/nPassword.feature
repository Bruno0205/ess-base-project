Feature: Redefinição de Senha

  Scenario: Password reset successful
    Given que existe um usuário com e-mail "Example@Newpas-s.br", senha "Senha123" e token "AJSU23"
    When o usuário utiliza o token "AJSU23" para alterar a senha para "novaSenha456"
    Then a resposta deve conter a mensagem "Senha alterada com sucesso"

  Scenario: Unsuccessful password reset
    Given que existe um usuário com e-mail "Example@Newpas-s.br", senha "Senha123" e token "AJSU23"
    When o usuário utiliza o token "BSJAL" para alterar a senha para "senhaErrada123"
    Then a resposta deve conter a mensagem "Código inválido ou expirado"

