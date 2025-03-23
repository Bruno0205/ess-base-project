import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";


//////////////// 1
// Scenario: Após ir para a página das pesquisas, selecionar para "Ver Detalhes" na reserva "Residencia Schrader" e a partir da página da reserva abrir a página de comentários
Given('o usuário clica em "Buscar por Reservas"', () => {
  cy.visit("/");
  cy.get('button').contains("Buscar por Reservas").click();
});

When('o usuário clica em "Ver Detalhes" na reserva {string}', (reservaName: string) => {
  cy.get('div').contains(reservaName).parent().find('button').contains("Ver Detalhes").click();
});

When('o usuário clica em "Mostrar Avaliações"', () => {
  cy.get('button').contains("Mostrar Avaliações").click();
});


//////////////// 2
// Scenario: A partir da página de usuário de "BrunoCS8" e após clicar em "Minhas Locações", selecionar "Ver Detalhes" na reserva "Casa Beira Mar" e a partir da página da reserva abrir a página de comentários.
Given('o usuário está na página de usuário de {string}', (username: string) => {
  cy.visit(`/usuario/${username}`);
});

When('o usuário clica em "Minhas Locações"', () => {
  cy.get('button').contains("Minhas Locações").click();
});

//When('o usuário clica em "Ver Detalhes" na reserva {string}', (reservaName: string) => {
//  cy.get('div').contains(reservaName).parent().find('button').contains("Ver Detalhes").click();
//});

//When('o usuário clica em "Mostrar Avaliações"', () => {
//  cy.get('button').contains("Mostrar Avaliações").click();
//});

Then('o usuário deve ir para a página de comentários da reserva {string}', (reservaName: string) => {
  cy.url().should("include", `/reservas/${reservaName.toLowerCase().replace(/\s+/g, "-")}/avaliacoes`);
  cy.contains(`Avaliações para ${reservaName}`).should('be.visible');
});


//////////////// 3
// Scenario: A partir da página de avaliações da reserva "Beira Mar" no nome do usuário "BrunoCS8", adicionar uma avaliação com o nome "BarneyMat", 4 estrelas marcadas e o comentário de "Show de bola!" e postar na página.
Given('o usuário está na página de comentários da reserva {string} no nome do usuário {string}', (reservaName: string, username: string) => {
  cy.visit(`/usuario/${username}/reservas/${reservaName.toLowerCase().replace(/\s+/g, "-")}/avaliacoes`);
});

When('o usuário adiciona uma avaliação com o nome {string}, {int} estrelas e o comentário {string}', (nome: string, estrelas: number, comentario: string) => {
  cy.get('input[name="usuario"]').should('be.visible').type(nome);
  cy.get('svg').eq(estrelas - 1).click();
  cy.get('textarea[name="comentario"]').type(comentario);
});

When('o usuário clica em "Postar"', () => {
  cy.get('button').contains("Enviar Avaliação").click();
});

Then('a avaliação deve ser postada com sucesso', () => {
  cy.contains("Avaliação adicionada com sucesso!").should('be.visible');
});


//////////////// 4
// Scenario: A partir da página de avaliações da reserva "Beira Mar" no nome do usuário "BrunoCS8",, adicionar uma avaliação com o nome "BarneyMat", não marcar nenhum comentário, e não conseguir postar na página.
When('o usuário adiciona uma avaliação com o nome {string} e não coloca nenhum comentário', (nome: string) => {
  cy.get('input[name="usuario"]').should('be.visible').type(nome);
});

Then('o usuário deve ver uma mensagem de erro indicando que o campo de comentários é obrigatório', () => {
  cy.get('button').contains("Enviar Avaliação").click();
  cy.get('textarea[name="comentario"]').then(($textarea) => {
    expect(($textarea[0] as HTMLTextAreaElement).validationMessage);
  });
});


//////////////// 5
// Scenario: A partir da página de avaliações da reserva "Beira Mar", adicionar uma avaliação com comentário {string} e nenhum nome, e não conseguir postar na página.
When('o usuário adiciona uma avaliação com o comentário {string} e não preenche o campo de nome', (comentario: string) => {
  cy.get('textarea[name="comentario"]').type(comentario);
});

Then('o usuário deve ver uma mensagem de erro indicando que o campo de nome é obrigatório', () => {
  cy.get('button').contains("Enviar Avaliação").click();
  cy.get('textarea[name="comentario"]').then(($textarea) => {
    expect(($textarea[0] as HTMLTextAreaElement).validationMessage);
  });
});
