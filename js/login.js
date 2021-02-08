//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById('loginform').addEventListener('submit', (evento)=> {
        evento.preventDefault()

        let username = document.getElementById("user").value;
        let pass = document.getElementById("pass").value;

        let usuario = {
            username: username,
            password: pass
        }

        localStorage.setItem("user", JSON.stringify(usuario));

        window.location.href = "./index.html";
        sessionStorage.setItem("logged", true);
        return true;
    })
    });