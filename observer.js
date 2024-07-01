// @ts-nocheck

export class Observer {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

export class ChatLogObserver {
  update(data) {
    console.log(`[Chat Log] ${data.sender}: ${data.text} - ${data.timestamp}`);
  }
}

export class ChatUIObserver {
  constructor(chatMessagesElement) {
    this.chatMessagesElement = chatMessagesElement;
  }

  update(data) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${data.sender === 'John' ? 'blue-bg' : 'gray-bg'}`;
    messageElement.innerHTML = `
        <div class="message-sender">${data.sender}</div>
        <div class="message-text">${data.text}</div>
        <div class="message-timestamp">${data.timestamp}</div>
      `;
    this.chatMessagesElement.appendChild(messageElement);
    this.chatMessagesElement.scrollTop = this.chatMessagesElement.scrollHeight;
  }
}
