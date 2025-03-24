import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Função auxiliar para validar redirecionamento
function validateRedirection(expectedPage: string) {
  cy.url({ timeout: 10000 }).should("include", expectedPage);
}

// Passo: Verificar se o usuário está na página "/login"
Given('o usuário está na página {string}', (page: string) => {
  cy.visit(page); // Navega para a página de login
});

// Passo: Preencher os campos de login e senha
When('o usuário preenche o campo {string} com {string} e o campo {string} com {string}', (field1: string, value1: string, field2: string, value2: string) => {
  if (field1 === "Login") {
    cy.get('[data-cy="Login"]').type(value1); // Preenche o campo de login
  }
  if (field2 === "Senha") {
    cy.get('[data-cy="Senha"]').type(value2); // Preenche o campo de senha
  }
});

// Passo: Clicar no botão "Entrar"
When('o usuário clica no botão {string}', (buttonText: string) => {
  cy.intercept('POST', '**/login/auth?login=BrunoCS8&senha=Senha123').as('loginRequest'); // Intercepta a requisição de login
  cy.get('[data-cy="Entrar"]').click(); // Clica no botão "Entrar"
});

// Passo: Verificar a mensagem de erro
Then('o usuário deve ver a mensagem {string}', (message: string) => {
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.equal(message); // Verifica a mensagem exibida ao usuário
  });
});

// Passo: Verificar o redirecionamento
Then('o usuário deve ser redirecionado para a página {string}', (page: string) => {
  cy.wait('@loginRequest', { timeout: 10000 }).then((interception) => {
    expect(interception.response?.statusCode).to.eq(200); // Verifica o status HTTP da resposta
  });
  validateRedirection(page); // Verifica o redirecionamento para a página esperada
});

// Passo: Validar resposta do backend em caso de erro
Then('o backend deve retornar erro com status {int} e mensagem {string}', (statusCode: number, errorMessage: string) => {
  cy.wait('@loginRequest').then((interception) => {
    expect(interception.response?.statusCode).to.eq(statusCode); // Verifica o status HTTP
    expect(interception.response?.body.detail).to.eq(errorMessage); // Verifica a mensagem de erro no corpo da resposta
  });
});