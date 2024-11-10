import request from "./request.js";
import { saveJWT } from "./jwt.js";

async function _send(_login, _password) {
  const body = {
    email: _login,
    password: _password
  }

  const response = await request("api/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (response.status === 201) {
    const jwt = await response.json();
    saveJWT(jwt);
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
}

function register() {
  const login = document.getElementById("inp_1").value;
  const password = document.getElementById("inp_2").value;
  _send(login, password);
}

const registerButton = document.getElementById("registerButton");
registerButton?.addEventListener("click", register);
