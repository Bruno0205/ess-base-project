Feature: Registro de Usuários

  Scenario: Test Register PF User
    Given não existe um usuário com email "testpf@example.com"
    When registro um usuário PF com email "testpf@example.com" e senha válida "ValidPwd123"
    Then a resposta deve conter a mensagem "Cadastro realizado com sucesso. Verifique seu email."

  Scenario: Test Register PJ User
    Given não existe um usuário com email "testpj@example.com"
    When registro um usuário PJ com email "testpj@example.com" e senha válida "ValidPwd123"
    Then a resposta deve conter a mensagem "Cadastro realizado com sucesso. Verifique seu email."

  Scenario: Test Register Existing Email
    Given um usuário PF com email "existingpf@example.com" já está registrado
    When tento registrar outro usuário PF com o mesmo email "existingpf@example.com"
    Then a resposta deve conter o erro "Email já cadastrado"

  Scenario: Test Register Invalid Password
    Given não existe um usuário com email "invalidpwd@example.com"
    When tento registrar um usuário PF com email "invalidpwd@example.com" e senha inválida "Senha"
    Then a resposta deve conter o erro "A senha deve ter no mínimo 5 caracteres, conter pelo menos uma letra maiúscula, uma letra minúscula e um número."

