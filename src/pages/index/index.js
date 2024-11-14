import "@common/css/style.css";
import { saveJWT } from "../../common/js/jwt";
import { getJWT } from "../../common/js/jwt";

window.onload = load;

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

function AddHeader(){
    const el = link.import.getElementById('HeaderTemplate');
    document.header.appendChild(el);
}