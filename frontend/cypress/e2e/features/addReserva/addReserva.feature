    Feature: Adicionar uma nova reserva

    Como um usuário logado,
    quero adicionar uma nova reserva,
    para disponibilizá-la para locação.

    Scenario: Adicionar uma nova reserva com sucesso
        Given o usuário está na página "/usuario/BrunoCS8"
        When o usuário clica em "Minhas Locações"
        Then o usuário deve ser redirecionado para "/usuario/BrunoCS8/locacoes"
        When o usuário clica no botão "+"
        Then o usuário deve ser redirecionado para "/usuario/BrunoCS8/reservas/addReserva"
        When o usuário preenche o formulário de reserva com os seguintes dados:
        | Campo                     | Valor                                                                 |
        | Título                    | Salão Enorme para Eventos Corporativos                                |
        | Descrição                 | Um salão enorme para festas corporativas que é perfeito para eventos com capacidade de até 1000 pessoas. Com ótima localização. |
        | Links de Imagens          | imagem1, imagem2, imagem3                                             |
        | Endereço                  | Rua das Amélias, Francoso, 12, São Paulo, SP                          |
        | Tipo                      | Salão                                                                 |
        | Início da Disponibilidade | 2025-03-25                                                            |
        | Fim da Disponibilidade    | 2025-04-01                                                            |
        | Preço Diária              | 5000                                                                  |
        | Aceita Pets               | false                                                                 |
        And o usuário clica no botão "Publicar Reserva"
        Then o usuário deve ser redirecionado para "/usuario/BrunoCS8/locacoes"

Scenario: Descrição com menos de 20 caracteres deve exibir erro
  Given o usuário está na página "/usuario/BrunoCS8"
  When o usuário clica em "Minhas Locações"
  Then o usuário deve ser redirecionado para "/usuario/BrunoCS8/locacoes"
  When o usuário clica no botão "+"
  Then o usuário deve ser redirecionado para "/usuario/BrunoCS8/reservas/addReserva"
  When o usuário preenche o formulário de reserva com os seguintes dados:
    | Campo                     | Valor                                                                 |
    | Título                    | Salão Pequeno                                                         |
    | Descrição                 | Um salão pequeno                                                     |
    | Links de Imagens          | imagem1, imagem2, imagem3                                             |
    | Endereço                  | Rua das Amélias, Francoso, 12, São Paulo, SP                          |
    | Tipo                      | Salão                                                                 |
    | Início da Disponibilidade | 2025-03-25                                                            |
    | Fim da Disponibilidade    | 2025-04-01                                                            |
    | Preço Diária              | 5000                                                                  |
    | Aceita Pets               | false                                                                 |
  And o usuário clica no botão "Publicar Reserva"
  Then o usuário deve ver a mensagem de erro "A descrição deve ter no mínimo 20 caracteres"