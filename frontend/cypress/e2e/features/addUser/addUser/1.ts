import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

function validateRedirection(expectedPage: string) {
  cy.url({ timeout: 10000 }).should("include", expectedPage);
}

Given('o usuário está na página {string}', (page: string) => {
  cy.visit(page);
});

When('o usuário seleciona {string}', (tipoPessoa: string) => {
  if (tipoPessoa === "Pessoa Jurídica") {
    cy.get('[data-cy="pessoa-juridica-button"]').click();
    cy.wait(500);

    // Checa o atributo 'data-active' em vez da classe
    cy.get('[data-cy="pessoa-juridica-button"]').should("have.attr", "data-active", "true");
    cy.get('[data-cy="pessoa-fisica-button"]').should("have.attr", "data-active", "false");
  }
});

When('o usuário preenche o formulário de cadastro com os seguintes dados:', (dataTable: any) => {
  const data = dataTable.rowsHash();

  cy.get('[data-cy="uf-input"]').type(data["UF"]);
  cy.get('[data-cy="email-input"]').type(data["Email"]);
  cy.get('[data-cy="login-input"]').type(data["Login"]);
  cy.get('[data-cy="senha-input"]').type(data["Senha"]);

  if ("CPF" in data) {
    cy.get('[data-cy="cpf-input"]').type(data["CPF"]);
    cy.get('[data-cy="nome-input"]').type(data["Nome"]);
    cy.get('[data-cy="nascimento-input"]').type(data["Nascimento"]);
  } else if ("CNPJ" in data) {
    cy.get('[data-cy="cnpj-input"]').type(data["CNPJ"]);
    cy.get('[data-cy="razao-social-input"]').type(data["Razão Social"]);
  }
});

When('o usuário clica no botão "Cadastrar"', () => {
  cy.intercept('POST', '**/cadastro/cadastro/**').as('cadastroRequest');
  cy.get('[data-cy="cadastrar-button"]').click();
});

Then('o usuário deve ver a mensagem {string}', (message: string) => {
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.equal(message);
  });
});

Then('o usuário deve ser redirecionado para {string}', (page: string) => {
  validateRedirection(page);
});

Then('o backend deve retornar erro com status {int} e mensagem {string}', (statusCode: number, errorMessage: string) => {
  cy.wait('@cadastroRequest').then((interception) => {
    expect(interception.response?.statusCode).to.eq(statusCode);
    expect(interception.response?.body.detail).to.eq(errorMessage);
  });
});
