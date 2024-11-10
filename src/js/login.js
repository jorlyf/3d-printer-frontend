import request from "./request.js";

async function _send(_login, _password) {
  const body = {
    email: _login,
    password: _password
  }

  const response = await request("api/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (response.status === 200) {
    const jwt = await response.json();
    localStorage.setItem("AuthorizationToken", jwt);
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
}

function send() {
  const login = document.getElementById("inp_1").value;
  const password = document.getElementById("inp_2").value;
  _send(login, password);
}

const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", send);
