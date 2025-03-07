Feature: Autenticacao do Usuario 

  Scenario: Successful login with correct credentials
    Given que existe um usuário com login "BruhPF" e senha "Senha123"
    When o usuário tenta autenticar com login "BruhPF" e senha "Senha123"
    Then a resposta deve conter a mensagem "Login bem-sucedido"
    And os dados do usuário devem ser retornados

  Scenario: Failed login with incorrect password
    Given que existe um usuário com login "BruhPF" e senha "Senha123"
    When o usuário tenta autenticar com login "BruhPF" e senha "SenhaErrada"
    Then a resposta deve conter o erro "Login e/ou senha incorreto(s)."

