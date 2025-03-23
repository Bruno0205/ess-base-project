// frontend/cypress/e2e/features/login/common-step-definitions.ts

import { Given } from "@badeball/cypress-cucumber-preprocessor";

// Etapa genérica para acessar uma página
Given("o usuário está na página {string}", (page: string) => {
  cy.visit(page); // Acessa a página especificada
});