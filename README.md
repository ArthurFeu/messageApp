# messageApp

messageApp é uma aplicação de chat simples que permite a troca de mensagens entre dois contatos fictícios, John e Jane. Esta aplicação foi desenvolvida utilizando JavaScript, HTML e CSS, e segue o padrão de design Strategy para a lógica de envio de mensagens. Foi também utilizado um Observer para garantir que as mensagens sejam atualziadas em tempo real.

## Estrutura do Projeto

- `app.js`: Arquivo principal que inicializa a aplicação e configura os elementos DOM e os observadores.
- `index.html`: Página HTML que contém a estrutura básica do chat.
- `jest.config.js`: Configuração para os testes unitários utilizando Jest.
- `observer.js`: Implementação do padrão Observer para atualizar o log do chat e a interface do usuário.
- `strategy.js`: Implementação do padrão Strategy para definir a lógica de envio de mensagens para John e Jane.
- `style.css`: Estilos CSS para a aplicação.
- `Tests`: Pasta que contém os arquivos de teste.
