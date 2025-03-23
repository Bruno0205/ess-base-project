import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { DataTable } from "@cucumber/cucumber"; //Importa o tipo DataTable

//Função p/ validar redirecionamento
function validateRedirection(expectedPage: string) {
  cy.url({ timeout: 15000 }).should("include", expectedPage); //Confere se URL tem o esperado
}

//Etapa: acessar uma pág específica
Given('o usuário está na página {string}', (page: string) => {
  cy.visit(page); //Acessa a pág informada
});

//Etapa: clicar no link "Minhas Locações"
When('o usuário clica em {string}', (linkText: string) => {
  cy.contains(linkText).click(); //Clica no texto do link
});

//Etapa: verificar redirecionamento
Then('o usuário deve ser redirecionado para {string}', (page: string) => {
  validateRedirection(page); //Confere se redirecionou certo
});

//Etapa: clicar no botão "+"
When('o usuário clica no botão "+"', () => {
  cy.get('[data-cy="add-reserva-button"]').click(); //Clica no btn "+"
});

//Etapa: preencher o formulário de reserva
When('o usuário preenche o formulário de reserva com os seguintes dados:', (dataTable: DataTable) => {
  const data = dataTable.rowsHash(); //Converte a tabela em obj {chave:valor}

  //Preenche os campos do form c/ base nos dados
  cy.get('[name="titulo"]').type(data["Título"]); //Campo "Título"
  cy.get('[name="descricao"]').type(data["Descrição"]); //Campo "Descrição"
  cy.get('[name="imagens"]').type(data["Links de Imagens"]); //Campo "Links de Imagens"
  cy.get('[name="endereco"]').type(data["Endereço"]); //Campo "Endereço"
  cy.get('[name="tipo"]').select(data["Tipo"]); //Campo "Tipo"
  cy.get('[name="disponibilidadeInicio"]').type(data["Início da Disponibilidade"]); //Campo "Início da Disponibilidade"
  cy.get('[name="disponibilidadeFim"]').type(data["Fim da Disponibilidade"]); //Campo "Fim da Disponibilidade"
  cy.get('[name="preco"]').type(data["Preço Diária"]); //Campo "Preço Diária"

  //Marca/desmarca "Aceita Pets?"
  const aceitaPets = data["Aceita Pets"] === "true"; //Converte p/ boolean
  if (aceitaPets) {
    cy.get('[data-cy="Aceitapets"]').check(); //Marca o checkbox
  } else {
    cy.get('[data-cy="AceitaPets"]').uncheck(); //Desmarca o checkbox
  }
});

//Etapa: clicar no botão "Publicar Reserva"
When('o usuário clica no botão "Publicar Reserva"', () => {
  cy.intercept('POST', 'http://127.0.0.1:8000/cadastro-reservas/add_reserva').as('addReservaRequest'); //Intercepta req POST
  cy.get('[data-cy="PublicarReserva"]').click(); //Clica no btn "Publicar Reserva"
});

//Etapa: verificar redirecionamento final
Then('o usuário deve ser redirecionado para a página {string}', (page: string) => {
  validateRedirection(page); //Confere se redirecionou p/ pág certa
});

//Etapa: validar msg de erro
Then('o usuário deve ver a mensagem de erro {string}', (errorMessage: string) => {
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.equal(errorMessage); //Confere se msg do alert tá certa
  });
});
