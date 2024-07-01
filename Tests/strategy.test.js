import { MessageSendingStrategy, JohnMessageSendingStrategy, JaneMessageSendingStrategy } from '../strategy';

describe('MessageSendingStrategy', () => {
	test('Teste de mensagem padrão', () => {
		const strategy = new MessageSendingStrategy();
		const message = 'Hello, world!';
		const consoleLogSpy = jest.spyOn(console, 'log');

		strategy.sendMessage(message);

		expect(consoleLogSpy).toHaveBeenCalledWith(`[Default] Sending message: "${message}"`);

		consoleLogSpy.mockRestore();
	});
});

describe('JohnMessageSendingStrategy', () => {
	test('Envia mensagens de John', () => {
		const strategy = new JohnMessageSendingStrategy();
		const message = 'Hello from John!';
		const consoleLogSpy = jest.spyOn(console, 'log');

		strategy.sendMessage(message);

		expect(consoleLogSpy).toHaveBeenCalledWith(`[John] Sending message: "${message}"`);

		consoleLogSpy.mockRestore();
	});
});

describe('JaneMessageSendingStrategy', () => {
	test('Envia mensagens de Jane', () => {
		const strategy = new JaneMessageSendingStrategy();
		const message = 'Hi, it\'s Jane!';
		const consoleLogSpy = jest.spyOn(console, 'log');

		strategy.sendMessage(message);

		expect(consoleLogSpy).toHaveBeenCalledWith(`[Jane] Sending message: "${message}"`);

		consoleLogSpy.mockRestore();
	});
});
