import { JohnMessageSendingStrategy, JaneMessageSendingStrategy } from './strategy.js';
import { Observer, ChatLogObserver, ChatUIObserver } from './observer.js';

class ChatApp {
  constructor(domSelectors) {
    this.domElements = this.setupDOMElements(domSelectors);

    this.johnMessageSenderStrategy = new JohnMessageSendingStrategy();
    this.janeMessageSenderStrategy = new JaneMessageSendingStrategy();

    this.messageSenderStrategy = this.johnMessageSenderStrategy;

    this.setupObservers();

    this.setupEventListeners();
  }

  setupDOMElements(domSelectors) {
    const domElements = {};
    for (const [key, selector] of Object.entries(domSelectors)) {
      domElements[key] = document.querySelector(selector);
    }
    return domElements;
  }

  setupObservers() {
    this.chatObserver = new Observer();
    this.chatLogObserver = new ChatLogObserver();
    this.chatUIObserver = new ChatUIObserver(this.domElements.chatMessagesElement);
    this.chatObserver.addObserver(this.chatLogObserver);
    this.chatObserver.addObserver(this.chatUIObserver);
  }

  setupEventListeners() {
    this.domElements.johnSelectorBtn.addEventListener('click', () => this.updateMessageSender('John'));
    this.domElements.janeSelectorBtn.addEventListener('click', () => this.updateMessageSender('Jane'));
    this.domElements.chatInputForm.addEventListener('submit', this.sendMessage);
    this.domElements.clearChatBtn.addEventListener('click', () => this.clearChat());
  }

  updateMessageSender(name) {
    const otherContactName = (name === 'John') ? 'Jane' : 'John';
    this.domElements.chatHeaderElement.textContent = otherContactName;

    this.messageSenderStrategy = (name === 'John') ? this.johnMessageSenderStrategy : this.janeMessageSenderStrategy;

    this.domElements.chatMessagesElement.classList.remove('jane-mode', 'john-mode');
    this.domElements.chatMessagesElement.classList.add(`${name.toLowerCase()}-mode`);

    this.domElements.johnSelectorBtn.classList.toggle('active-person', name === 'John');
    this.domElements.janeSelectorBtn.classList.toggle('active-person', name === 'Jane');

    this.domElements.chatInput.placeholder = `Type here, ${name}...`;
  }
}

function sendMessage(e) {
  e.preventDefault();

  const message = chatApp.domElements.chatInput.value;
  chatApp.messageSenderStrategy.sendMessage(message);

  const data = {
    sender: chatApp.messageSenderStrategy.sender,
    text: message,
    timestamp: new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour: 'numeric',
      minute: 'numeric',
    }),
  };
  chatApp.chatObserver.notify(data);
  chatApp.domElements.chatInputForm.reset();
}

function clearChat() {
  localStorage.clear();
  chatApp.domElements.chatMessagesElement.innerHTML = '';
}

module.exports = { sendMessage, clearChat };

const chatApp = new ChatApp({
  johnSelectorBtn: '#john-selector',
  janeSelectorBtn: '#jane-selector',
  chatMessagesElement: '.chat-messages',
  chatInputForm: '.chat-input-form',
  chatInput: '.chat-input',
  clearChatBtn: '.clear-chat-button',
  chatHeaderElement: '.chat-header',
});

chatApp.domElements.chatInputForm.addEventListener('submit', sendMessage);
chatApp.domElements.clearChatBtn.addEventListener('click', clearChat);