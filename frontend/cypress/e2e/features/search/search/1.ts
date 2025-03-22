import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: Buscar reservas em Recife que sejam casas pet friendly e destacadas
Given(
  'o usuário vai para a página de pesquisa e escolhe {string} no campo {string} e escolhe {string} no campo {string} e marca {string} e marca {string}',
  (estado: string, campoEstado: string, tipo: string, campoTipo: string, petFriendly: string, destacado: string) => {
    cy.visit("/");
    cy.get('button').contains("Buscar por Reservas").click();
    cy.get(`select[name="${campoEstado}"]`).select(estado);
    cy.get(`select[name="${campoTipo}"]`).select(tipo);
    cy.get(`input[name="${petFriendly}"]`).check();
    cy.get(`input[name="${destacado}"]`).check();
  }
);

When('o usuário clica no botão "Buscar"', () => {
  cy.get('button').contains("Buscar").click();
});

Then('o usuário deve ir para a página "search" e ver uma lista filtrada de reservas', () => {
  cy.url().should("include", "/search");
  cy.get('div[class*="resultContent"]').should('exist');
});