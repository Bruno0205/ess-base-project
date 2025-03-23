import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Etapa: Acessar a página inicial
Given('o usuário está na página {string}', (page: string) => {
  cy.visit(page); // Acessa a página especificada (ex.: "/login")
});

// Etapa: Clicar no primeiro link "Clique aqui"
When('o usuário clica no primeiro link "Clique aqui"', () => {
  cy.contains("Clique aqui").first().click(); // Clica no primeiro link "Clique aqui"
});

// Etapa: Verificar redirecionamento para "/mudar-senha"
Then('o usuário deve ser redirecionado para a página {string}', (page: string) => {
  cy.url({ timeout: 10000 }).should("include", page); // Valida o redirecionamento
});

// Etapa: Preencher o campo "E-mail"
When('o usuário preenche o campo "E-mail" com {string}', (email: string) => {
  cy.get('[data-cy="Email"]').type(email); // Preenche o campo "E-mail"
});

// Etapa: Clicar no botão "Enviar"
When('o usuário clica no botão "Enviar"', () => {
  cy.intercept('POST', 'http://localhost:8000/reset-password/request', { fixture: 'resetPasswordSuccess.json' }).as('resetRequest');
  cy.get('[data-cy="Enviar"]').click(); // Simula o clique no botão
  cy.wait('@resetRequest'); // Espera pela resposta simulada
});

// Etapa: Verificar redirecionamento para "/resetar-senha"
Then('o usuário deve ser redirecionado para a página {string}', (page: string) => {
  cy.url({ timeout: 10000 }).should("include", page); // Valida o redirecionamento
});