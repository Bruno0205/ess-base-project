import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Função auxiliar p/ validar redirecionamento
function validateRedirection(expectedPage: string) {
  cy.wait(500);//Espera meio segundo p/ garantir q a página carregou
  cy.url({ timeout: 10000 }).should("include", expectedPage);//Confere se a URL contém o caminho esperado
}

// acessar uma página específica
Given('estou na página {string}', (page: string) => {
  cy.visit(page);//Abre a página informada
});

//clicar no link ou botão "verificar conta"
When('clico em {string}', (buttonText: string) => {
  cy.contains(buttonText).click();//Clica no elemento com o texto especificado
});

//verificar redirecionamento
Then("sou redirecionado para {string}", function (urlEsperada: string) {
  cy.url().should("include", urlEsperada);//Verifica se a URL atual contém a URL esperada
});

//preencher o campo "E-mail"
When('preencho o campo "E-mail" com {string}', (email: string) => {
  cy.get('[data-cy="email-input"]')//Localiza o campo pelo atributo data-cy
    .should("be.visible")//Verifica se o campo está visível
    .clear()//Limpa o campo antes de preenchê-lo
    .type(email);//Preenche o campo com o e-mail fornecido
});

//clicar no botão "Solicitar código"
When('clico em "Solicitar código"', () => {
  cy.get('[data-cy="solicitar-codigo-button"]').click();//Clica no botão "Solicitar código"
});

//verificar mensagem de alerta
Then('vejo a mensagem {string}', (message: string) => {
  // Captura o alert diretamente sem mock
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.equal(message);//Verifica se o texto do alert corresponde à msg esperada
  });
});

// preencher o campo "Código de Verificação"
When('preencho o campo "Código de Verificação" com {string}', (codigo: string) => {
  cy.get('[data-cy="codigo-input"]')//Localiza o campo pelo atributo data-cy
    .should("be.visible")//Verifica se o campo está visível
    .clear()//Limpa o campo antes de preenchê-lo
    .type(codigo);//Preenche o campo com o código fornecido
});

// clicar no botão "Liberar Conta"
When('clico em "Liberar Conta"', () => {
  cy.get('[data-cy="liberar-conta-button"]').click();//Clica no botão "Liberar Conta"
});