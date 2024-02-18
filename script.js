// Part 1: UI Interaction
// Selecting elements from the DOM
const sidebar = document.querySelector("#sidebar");
const hide_sidebar = document.querySelector(".hide-sidebar");
const new_chat_button = document.querySelector(".new-chat");

// Adding event listener to toggle sidebar visibility
hide_sidebar.addEventListener("click", function() {
    sidebar.classList.toggle("hidden");
});

// Selecting elements for user menu interaction
const user_menu = document.querySelector(".user-menu ul");
const show_user_menu = document.querySelector(".user-menu button");

// Adding event listener to toggle user menu visibility with animation
show_user_menu.addEventListener("click", function() {
    if (user_menu.classList.contains("show")) {
        user_menu.classList.toggle("show");
        setTimeout(function() {
            user_menu.classList.toggle("show-animate");
        }, 200);
    } else {
        user_menu.classList.toggle("show-animate");
        setTimeout(function() {
            user_menu.classList.toggle("show");
        }, 50);
    }
});

// Selecting model selector buttons and adding event listeners
const models = document.querySelectorAll(".model-selector button");
for (const model of models) {
    model.addEventListener("click", function() {
        document.querySelector(".model-selector button.selected")?.classList.remove("selected");
        model.classList.add("selected");
    });
}

// Adjusting message box height dynamically
const message_box = document.querySelector("#message");
message_box.addEventListener("keyup", function() {
    message_box.style.height = "auto";
    let height = message_box.scrollHeight + 2;
    if (height > 200) {
        height = 200;
    }
    message_box.style.height = height + "px";
});

// Function to show different views
function show_view(view_selector) {
    document.querySelectorAll(".view").forEach(view => {
        view.style.display = "none";
    });
    document.querySelector(view_selector).style.display = "flex";
}

// Event listener for new chat button
new_chat_button.addEventListener("click", function() {
    show_view(".new-chat-view");
});

// Event listener for conversation buttons to switch views
document.querySelectorAll(".conversation-button").forEach(button => {
    button.addEventListener("click", function() {
        show_view(".conversation-view");
    });
});

// Part 2: Chat Functionality
// Event listener to initialize chat functionality when DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.querySelector(".hide-sidebar");
    const userMenuButton = document.querySelector(".user-menu button");
    const userMenu = document.querySelector(".user-menu ul");
    const messageInput = document.getElementById("message");
    const sendButton = document.querySelector(".send-button");
    const conversationView = document.querySelector(".conversation-view");

    // Toggle sidebar visibility
    sidebarToggle.addEventListener("click", function() {
        sidebar.classList.toggle("hidden");
    });

    // Toggle user menu visibility
    userMenuButton.addEventListener("click", function() {
        userMenu.classList.toggle("show");
    });

    // Function to send message
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message !== "") {
            // Create message element
            const messageWrapper = document.createElement("div");
            messageWrapper.classList.add("user", "message");
            messageWrapper.innerHTML = `
                <div class="identity">
                    <i class="user-icon">LA</i>
                </div>
                <div class="content">
                    <p>${message}</p>
                </div>
            `;
            // Append message to conversation view
            conversationView.appendChild(messageWrapper);
            // Scroll conversation view to the bottom
            conversationView.scrollTop = conversationView.scrollHeight;
            // Clear message input
            messageInput.value = "";
            // Handle response from assistant
            handleResponse(message);
        }
    }

    // Event listeners for sending message
    sendButton.addEventListener("click", sendMessage);
    messageInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    // Function to handle user input and generate response from assistant
    function handleUserInput(event) {
        event.preventDefault();
        sendMessage();
    }

    // Function to display response message from assistant
    function handleResponse(question) {
        const response = generateResponse(question);
        displayMessage("assistant", response);
    }

    // Function to generate response from user input
    function generateResponse(question) {
        // Example response for demonstration purposes
        switch (question.toLowerCase()) {
            case "how are you?":
                return "I'm just a program, but thanks for asking!";
            case "what is your name?":
                return "I'm ChatGPT, your friendly assistant!";
            case "how can you help me?":
                return "I can assist you with various tasks like providing information, answering questions, or just having a conversation.";
            default:
                return "You asked: '" + question + "'. Here is a generic response.";
        }
    }

    // Function to display message in conversation view
    function displayMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender);
        const contentElement = document.createElement("div");
        contentElement.classList.add("content");
        contentElement.innerHTML = "<p>" + message + "</p>";
        messageElement.appendChild(contentElement);
        conversationView.appendChild(messageElement);
        conversationView.scrollTop = conversationView.scrollHeight;
    }

    // Event listener for message form submission
    messageForm.addEventListener("submit", handleUserInput);
});
