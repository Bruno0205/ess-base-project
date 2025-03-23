export function interceptLoginRequest(login: string, senha: string) {
    cy.intercept("POST", "http://localhost:8000/login/auth*", {
      statusCode: 200,
      body: {
        message: "Login bem-sucedido",
        user: {
          ativo: true,
          uf: "PE",
          email: "bcs6@cin.ufpe.br",
          login,
          senha,
          liberado: true,
          codigo_verificacao: "8E3438",
          codigo_valido_ate: "2025-03-22T11:21:25.411921",
          reset_token: null,
          reset_token_expira: null,
          tipo_pessoa: "fisica",
          cpf: "123.231.231-22",
          nome: "BRUNO CARVALHO SOARES",
          nascimento: "2001-06-06",
        },
      },
    }).as("loginRequest");
  }
  
  export function validateRedirection(expectedPage: string) {
    cy.wait("@loginRequest").its('response.statusCode').should('eq', 200);
    cy.url({ timeout: 10000 }).should("include", expectedPage);
  }
  