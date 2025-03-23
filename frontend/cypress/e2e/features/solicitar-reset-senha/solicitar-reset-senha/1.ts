import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

//Função p/ validar redirecionamento
function validateRedirection(expectedPage: string) {
  cy.wait(500); //Espera meio seg p/ garantir q carregou
  cy.url({ timeout: 10000 }).should("include", expectedPage); //Confere se a URL tem o q espera
}

//Etapa: acessar uma pág específica
Given('o usuário está na página {string}', (page: string) => {
  cy.visit(page); //Abre a pág informada
});

//Etapa: clicar no 1º link "Clique aqui"
When('o usuário clica no primeiro link "Clique aqui"', () => {
  cy.contains("Clique aqui").first().click(); //Clica no 1º "Clique aqui" q encontrar
});

//Etapa: preencher o campo "E-mail"
When('o usuário preenche o campo "E-mail" com {string}', (email: string) => {
  cy.get('[data-cy="Email"]').type(email); //Digita o e-mail no campo
});

//Etapa: clicar no botão "Enviar"
When('o usuário clica no botão "Enviar"', () => {
  cy.get('[data-cy="Enviar"]').click(); //Clica no btn de enviar
});

//Etapa: verificar o redirecionamento
Then('o usuário deve ser redirecionado para a página {string}', (page: string) => {
  validateRedirection(page); //Confere se foi redirecionado p/ pág certa
});
