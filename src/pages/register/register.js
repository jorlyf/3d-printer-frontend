import request from "./../../common/js/request.js";
import { saveJWT } from "./../../common/js/jwt.js";
import { AddHeader} from "./../../pages/header/header.js";
import "@common/css/style.css";

AddHeader();

async function _send(_login, _password) {
  const body = {
    email: _login,
    password: _password
  }

  const response = await request("auth/register", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (response.status === 201) {
    const { data } = await response.json();
    const jwt = data.token;
    saveJWT(jwt);
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
}

function register(e) {
  e.preventDefault();

  const login = document.getElementById("inp_1").value;
  const password = document.getElementById("inp_2").value;
  _send(login, password);
}

const registerForm = document.getElementById("registerForm");
registerForm?.addEventListener("submit", register);