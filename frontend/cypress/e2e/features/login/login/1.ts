import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Função auxiliar para interceptar a requisição de login
function interceptLoginRequest(login: string, senha: string) {
  cy.intercept("POST", "http://localhost:8000/login/auth*", {
    statusCode: 200,
    body: {
      message: "Login bem-sucedido",
      user: {
        ativo: true,
        uf: "PE",
        email: "bcs6@cin.ufpe.br",
        login: login,
        senha: senha,
        liberado: true,
        codigo_verificacao: "8E3438",
        codigo_valido_ate: "2025-03-22T11:21:25.411921",
        reset_token: null,
        reset_token_expira: null,
        tipo_pessoa: "fisica",
        cpf: "123.231.231-22",
        nome: "BRUNO CARVALHO SOARES",
        nascimento: "2001-06-06",
      },
    },
  }).as("loginRequest");
}

// Função auxiliar para validar o redirecionamento
function validateRedirection(expectedPage: string) {
  cy.wait("@loginRequest").then((interception) => {
    expect(interception.response?.statusCode).to.eq(200); // Valida o status da resposta
  });

  cy.url({ timeout: 10000 }).should("include", expectedPage); // Valida o redirecionamento
}

// Etapa: Acessar a página de login
Given('o usuário está na página {string}', (page: string) => {
  cy.visit(page); // Acessa a página especificada (ex.: "/login")
});

// Etapa: Preencher os campos de login e senha
When(
  'o usuário preenche o campo "Login" com {string} e o campo "Senha" com {string}',
  (login: string, senha: string) => {
    interceptLoginRequest(login, senha); // Intercepta a requisição ao backend
    cy.get('[data-cy="Login"]').type(login); // Preenche o campo "Login"
    cy.get('[data-cy="Senha"]').type(senha); // Preenche o campo "Senha"
  }
);

// Etapa: Clicar no botão "Entrar"
When('o usuário clica no botão "Entrar"', () => {
  cy.get('[data-cy="Entrar"]').click(); // Simula o clique no botão
});

// Etapa: Verificar o redirecionamento
Then('o usuário deve ser redirecionado para a página {string}', (page: string) => {
  validateRedirection(page); // Valida o redirecionamento
});