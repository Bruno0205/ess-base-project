Scenario: Usuário tenta acessar o formulário de publicação sem confirmar o email

Given que o usuário está logado como “usuário não-anfitrião”
And o email do usuário está pendente de confirmação
When o usuário "Adicionar Locação"
Then o sistema exibe um pop-up com a mensagem "Você precisa confirmar seu email antes de publicar uma reserva. Por favor, verifique sua caixa de entrada ou clique aqui para reenviar o email de confirmação."
And o usuário permanece na mesma página