import "@common/css/style.css";
import { saveJWT } from "../../common/js/jwt";
import { getJWT } from "../../common/js/jwt";
import { AddHeader} from "./../../pages/header/header.js";

window.onload = load;

AddHeader();

function load() {
    const jwt = getJWT();

    if (jwt){
        const elements = document.getElementsByClassName("forAuthorizedUsers");

        for(let element of elements)
        {
            element.style.display = 'block';
        }
    } else{
        const elements = document.getElementsByClassName("forNon-authorizedUsers");

        for(let element of elements)
        {
            element.style.display = 'block';
        }
    }
}

function logOut() {
    alert('Выход из аккаунта');
    saveJWT(undefined);
}