import { Observer, ChatLogObserver, ChatUIObserver } from "../observer";
process.env.NODE_ENV = "node";

describe("Observer", () => {
	test("deve adicionar e notificar observadores corretamente", () => {
		const observer = new Observer();
		const mockObserver = {
			update: jest.fn(),
		};

		observer.addObserver(mockObserver);
		observer.notify({ sender: "John", text: "Hello", timestamp: "12:00" });

		expect(mockObserver.update).toHaveBeenCalledWith({
			sender: "John",
			text: "Hello",
			timestamp: "12:00",
		});
	});

	test("deve remover observadores corretamente", () => {
		const observer = new Observer();
		const mockObserver = {
			update: jest.fn(),
		};

		observer.addObserver(mockObserver);
		observer.removeObserver(mockObserver);
		observer.notify({ sender: "John", text: "Hello", timestamp: "12:00" });

		expect(mockObserver.update).not.toHaveBeenCalled();
	});
});

describe("ChatUIObserver", () => {
	test("deve criar elementos de mensagem corretamente", () => {
		const chatMessagesElement = document.createElement("div");
		const chatUIObserver = new ChatUIObserver(chatMessagesElement);

		chatUIObserver.update({
			sender: "John",
			text: "Hello",
			timestamp: "12:00",
		});

		expect(chatMessagesElement.querySelector(".message")).toBeTruthy();
		expect(chatMessagesElement.querySelector(".message-sender").textContent).toBe("John");
		expect(chatMessagesElement.querySelector(".message-text").textContent).toBe("Hello");
		expect(chatMessagesElement.querySelector(".message-timestamp").textContent).toBe("12:00");
	});
});
