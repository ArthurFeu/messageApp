export class MessageSendingStrategy {
  sendMessage(message) {
    console.log(`[Default] Sending message: "${message}"`);
  }
}

export class JohnMessageSendingStrategy extends MessageSendingStrategy {
  constructor() {
    super();
    this.sender = 'John';
  }

  sendMessage(message) {
    console.log(`[John] Sending message: "${message}"`);
  }
}

export class JaneMessageSendingStrategy extends MessageSendingStrategy {
  constructor() {
    super();
    this.sender = 'Jane';
  }

  sendMessage(message) {
    console.log(`[Jane] Sending message: "${message}"`);
  }
}
