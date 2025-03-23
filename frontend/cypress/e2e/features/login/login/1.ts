import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Função auxiliar para validar o redirecionamento
function validateRedirection(expectedPage: string) {
  cy.wait(500)
  cy.url({ timeout: 10000 }).should("include", expectedPage); // Valida o redirecionamento
}

// Etapa: Acessar a página de login
Given('o usuário está na página {string}', (page: string) => {
  cy.visit(page); // Acessa a página especificada "/login"
});

// Etapa: Preencher os campos de login e senha
When(
  'o usuário preenche o campo "Login" com {string} e o campo "Senha" com {string}',
  (login: string, senha: string) => {
    cy.get('[data-cy="Login"]').type(login); // Preenche o campo "Login"
    cy.get('[data-cy="Senha"]').type(senha); // Preenche o campo "Senha"
  }
);

When('o usuário clica no botão "Entrar"', () => {
  cy.intercept('POST', 'http://localhost:8000/login/auth', { fixture: 'loginSuccess.json' }).as('authRequest');
  cy.get('[data-cy="Entrar"]').click(); // Simula o clique no botão
  cy.wait('@authRequest'); // Espera pela resposta simulada
});

// Etapa: Verificar o redirecionamento
Then('o usuário deve ser redirecionado para a página {string}', (page: string) => {
  validateRedirection(page); // Valida o redirecionamento
});