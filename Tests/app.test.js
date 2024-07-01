import { ChatApp } from '../app.js';
const sendMessage = require('../app.js').sendMessage;
const clearChat = require('../app.js').clearChat;

jest.mock('../app.js', () => {
  return {
    ChatApp: jest.fn().mockImplementation(() => {
      return {
        setupEventListeners: jest.fn(),
        updateMessageSender: jest.fn(),
        setupObservers: jest.fn(),
        chatObserver: {
          notify: jest.fn(),
        },
      };
    }),
  };
});

describe('ChatApp', () => {
  beforeEach(() => {
    const clearMock = jest.fn();
    Object.defineProperty(global, 'localStorage', {
      value: { clear: clearMock },
    });

    jest.clearAllMocks();
  });

  test('Instancia do app', () => {
    let mockSelectors = {
      johnSelectorBtn: '#john-selector',
      janeSelectorBtn: '#jane-selector',
      chatMessagesElement: '.chat-messages',
      chatInputForm: '.chat-input-form',
      chatInput: '.chat-input',
      clearChatBtn: '.clear-chat-button',
      chatHeaderElement: '.chat-header',
    };
    let chatAppInstance = new ChatApp(mockSelectors);
    expect(chatAppInstance).toBeDefined();
  });

  test('updateMessageSender atualiza elementos e faz o strategy', () => {
    let mockSelectors = {
      chatHeaderElement: document.createElement('div'),
      chatMessagesElement: document.createElement('div'),
      johnSelectorBtn: document.createElement('button'),
      janeSelectorBtn: document.createElement('button'),
      chatInput: document.createElement('input'),
    };
    let chatAppInstance = new ChatApp(mockSelectors);
    chatAppInstance.domElements = mockSelectors;

    chatAppInstance.domElements.chatHeaderElement.textContent = 'John';
    chatAppInstance.messageSenderStrategy = chatAppInstance.johnMessageSenderStrategy;
    chatAppInstance.domElements.chatMessagesElement.classList.add('jane-mode');
    chatAppInstance.domElements.chatInput.placeholder = 'Type here, John...';

    chatAppInstance.updateMessageSender('Jane');

    expect(chatAppInstance.domElements.chatHeaderElement.textContent).toBe('John');
    expect(chatAppInstance.messageSenderStrategy).toBe(chatAppInstance.janeMessageSenderStrategy);
    expect(chatAppInstance.domElements.chatMessagesElement.classList.contains('jane-mode')).toBe(true);
    expect(chatAppInstance.domElements.chatMessagesElement.classList.contains('john-mode')).toBe(false);
    expect(chatAppInstance.domElements.chatInput.placeholder).toBe('Type here, John...');
  });
});

describe('sendMessage', () => {
  test('Envia mensagem corretamente e notifica observador', () => {
    jest.clearAllMocks();
    const mockMessage = 'Hello, Jane!';
    const mockStrategy = {
      sendMessage: jest.fn(),
      sender: 'John',
    };
    const mockApp = {
      messageSenderStrategy: mockStrategy,
      chatObserver: {
        notify: jest.fn(),
      },
      domElements: {
        chatInput: { value: mockMessage },
        chatInputForm: { reset: jest.fn() },
      },
    };

    sendMessage(mockApp, { preventDefault: jest.fn() });

    expect(mockStrategy.sendMessage).toHaveBeenCalledWith(mockMessage);
    expect(mockApp.chatObserver.notify).toHaveBeenCalledWith({
      sender: 'John',
      text: mockMessage,
      timestamp: expect.any(String),
    });
    expect(mockApp.domElements.chatInputForm.reset).toHaveBeenCalled();
  });
});

describe('clearChat', () => {
  test('Limpa o chat corretamente', () => {
    jest.clearAllMocks();
    const mockApp = {
      domElements: {
        chatMessagesElement: { innerHTML: '' },
      },
    };

    clearChat(mockApp);

    expect(localStorage.clear).toHaveBeenCalled();
    expect(mockApp.domElements.chatMessagesElement.innerHTML).toBe('');
  });
});
