Feature: Cadastro de Usuário

  Como um novo usuário,
  quero me cadastrar como Pessoa Física ou Pessoa Jurídica,
  para acessar o sistema.

  Scenario: Cadastrar Pessoa Física com sucesso
    Given o usuário está na página "/register"
    When o usuário preenche o formulário de cadastro com os seguintes dados:
      | Campo      | Valor                    |
      | UF         | PB                       |
      | Email      | testeemail01@testegh.com |
      | Login      | UsuarioPF                |
      | Senha      | Senha123                 |
      | CPF        | 123.123.312-23           |
      | Nome       | Bruno Carvalho           |
      | Nascimento | 2000-12-12               |
    And o usuário clica no botão "Cadastrar"
    Then o usuário deve ver a mensagem "Cadastro realizado com sucesso!"
    And o usuário deve ser redirecionado para "/login"

  Scenario: Cadastrar Pessoa Jurídica com sucesso
    Given o usuário está na página "/register"
    When o usuário seleciona "Pessoa Jurídica"
    And o usuário preenche o formulário de cadastro com os seguintes dados:
      | Campo        | Valor                          |
      | UF           | PE                             |
      | Email        | testeemail02@testegh.com       |
      | Login        | EmpresaPJ                      |
      | Senha        | Senha123                       |
      | CNPJ         | 43.334.432/0001-41             |
      | Razão Social | Empresa Nova LTDA              |
    And o usuário clica no botão "Cadastrar"
    Then o usuário deve ver a mensagem "Cadastro realizado com sucesso!"
    And o usuário deve ser redirecionado para "/login"

  Scenario: Tentar cadastrar Pessoa Física com email já existente
    Given o usuário está na página "/register"
    When o usuário preenche o formulário de cadastro com os seguintes dados:
      | Campo      | Valor                    |
      | UF         | PB                       |
      | Email      | testeemail01@testegh.com | # Mesmo email do primeiro cadastro
      | Login      | UsuarioDuplicado         |
      | Senha      | Senha123                 |
      | CPF        | 987.654.321-00           |
      | Nome       | João Silva               |
      | Nascimento | 1990-01-01               |
    And o usuário clica no botão "Cadastrar"
    Then o usuário deve ver a mensagem "Email já cadastrado"

  Scenario: Tentar cadastrar Pessoa Jurídica com senha curta
    Given o usuário está na página "/register"
    When o usuário seleciona "Pessoa Jurídica"
    And o usuário preenche o formulário de cadastro com os seguintes dados:
      | Campo        | Valor                          |
      | UF           | PE                             |
      | Email        | testeemail03@testegh.com       |
      | Login        | EmpresaSenhaCurta              |
      | Senha        | 123                            | # Senha curta e inválida
      | CNPJ         | 12.345.678/0001-00             |
      | Razão Social | Empresa Inválida LTDA          |
    And o usuário clica no botão "Cadastrar"
    Then o usuário deve ver a mensagem "A senha deve ter no mínimo 5 caracteres, conter pelo menos uma letra maiúscula, uma letra minúscula e um número."