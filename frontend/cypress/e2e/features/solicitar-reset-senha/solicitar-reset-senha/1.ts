import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Função auxiliar para validar o redirecionamento
function validateRedirection(expectedPage: string) {
  cy.wait(500); // Aguarda um curto período para garantir o carregamento
  cy.url({ timeout: 10000 }).should("include", expectedPage); // Valida o redirecionamento
}

// Etapa: Acessar uma página específica
Given('o usuário está na página {string}', (page: string) => {
  cy.visit(page); // Acessa a página especificada (ex.: "/login")
});

// Etapa: Clicar no primeiro link "Clique aqui"
When('o usuário clica no primeiro link "Clique aqui"', () => {
  cy.contains("Clique aqui").first().click(); // Clica no primeiro link "Clique aqui"
});

// Etapa: Preencher o campo "E-mail"
When('o usuário preenche o campo "E-mail" com {string}', (email: string) => {
  cy.get('[data-cy="Email"]').type(email); // Preenche o campo "E-mail"
});

// Etapa: Clicar no botão "Enviar"
When('o usuário clica no botão "Enviar"', () => {
  cy.get('[data-cy="Enviar"]').click(); // Simula o clique no botão
});

// Etapa: Verificar o redirecionamento
Then('o usuário deve ser redirecionado para a página {string}', (page: string) => {
  validateRedirection(page); // Valida o redirecionamento
});