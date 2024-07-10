let socket;
const BACKEND_URL = "https://server-1l3h.onrender.com";

async function register() {
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;
  const email = document.getElementById("reg-email").value;

  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });
    const data = await response.json();
    alert(data.message);
  } catch (error) {
    alert("Registration failed");
  }
}

async function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      document.getElementById("auth-container").style.display = "none";
      document.getElementById("chat-container").style.display = "block";
      connectWebSocket();
      loadMessages();
    } else {
      alert("Login failed");
    }
  } catch (error) {
    alert("Login failed");
  }
}

function connectWebSocket() {
  const token = localStorage.getItem("token");
  socket = new WebSocket(`wss://${new URL(BACKEND_URL).host}?token=${token}`);

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    displayMessage(message);
  };
}

function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const content = messageInput.value;
  if (content) {
    const message = {
      content: content,
      username: localStorage.getItem("username"),
    };

    socket.send(JSON.stringify(message));
    messageInput.value = "";
  }
}


function displayMessage(message) {
 
  const messagesDiv = document.getElementById("messages");
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");

  const username =
    message.username ||
    (message.sender && message.sender.username) ||
    "Unknown";

  messageElement.innerHTML = `
    <span class="username">${username}</span>: 
    <span class="content">${message.content}</span>
    <span class="timestamp">(${new Date(
      message.timestamp
    ).toLocaleTimeString()})</span>
  `;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function loadMessages() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/messages`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const messages = await response.json();
    messages.forEach(displayMessage);
  } catch (error) {
    console.error("Error loading messages:", error);
  }
}
function showRegisterForm() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("register-form").style.display = "block";
}

function showLoginForm() {
  document.getElementById("register-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}
function logout() {
  localStorage.removeItem("token");
  socket.close();
  document.getElementById("auth-container").style.display = "block";
  document.getElementById("chat-container").style.display = "none";
  document.getElementById("messages").innerHTML = "";
}

if (localStorage.getItem("token")) {
  document.getElementById("auth-container").style.display = "none";
  document.getElementById("chat-container").style.display = "block";
  connectWebSocket();
  loadMessages();
}
