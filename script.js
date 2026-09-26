const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

let messages = JSON.parse(localStorage.getItem("chatMessages")) || [
    {
        text: "Hello! 👋 Welcome to the chat.",
        type: "received",
        time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        })
    }
];

function saveMessages() {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
}

function displayMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", message.type);

    messageDiv.innerHTML = `
        <div class="message-text">${message.text}</div>
        <div class="time">${message.time}</div>
    `;

    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}

function displayAllMessages() {
    chatBox.innerHTML = "";

    messages.forEach(message => {
        displayMessage(message);
    });
}

function sendMessage() {
    const text = messageInput.value.trim();

    if (text === "") {
        return;
    }

    const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    const newMessage = {
        text: text,
        type: "sent",
        time: time
    };

    messages.push(newMessage);
    displayMessage(newMessage);

    messageInput.value = "";

    saveMessages();

    setTimeout(() => {
        botReply(text);
    }, 700);
}

function botReply(userMessage) {
    const message = userMessage.toLowerCase();

    let reply = "Thanks for your message! 😊";

    if (message.includes("hello") || message.includes("hi")) {
        reply = "Hello! 👋 How are you?";
    } else if (message.includes("how are you")) {
        reply = "I'm doing great! Thanks for asking. 😊";
    } else if (message.includes("help")) {
        reply = "Sure! You can send me a message and I'll reply.";
    } else if (message.includes("bye")) {
        reply = "Goodbye! Have a nice day! 👋";
    }

    const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    const replyMessage = {
        text: reply,
        type: "received",
        time: time
    };

    messages.push(replyMessage);
    displayMessage(replyMessage);
    saveMessages();
}

sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

displayAllMessages();
