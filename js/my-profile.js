//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("imagenmostrar").innerHTML = `<img id="imgprofile" src="`+localStorage.getItem("imagen")+`" alt="">`;
    
    document.getElementById("formperfil").addEventListener("submit", function(e){
    localStorage.setItem("imagen", "https://i.ibb.co/LkbfCJ7/mario.jpg");
        
        var datosperfil = {
            nombres: document.getElementById("nombres").value,
            apellidos: document.getElementById("apellidos").value,
            edad: document.getElementById("edad").value,
            email: document.getElementById("email").value,
            telefono: document.getElementById("telefono").value
        }
        localStorage.setItem("datosperfil", JSON.stringify(datosperfil));
    })
    //Solo si existe el elemento "datosperfil" en el localStorage --> muestro los datos
    if (!(localStorage.getItem("datosperfil") === null)){
        document.getElementById("nombres").value = JSON.parse(localStorage.getItem("datosperfil")).nombres;
        document.getElementById("apellidos").value = JSON.parse(localStorage.getItem("datosperfil")).apellidos;
        document.getElementById("edad").value = JSON.parse(localStorage.getItem("datosperfil")).edad;
        document.getElementById("email").value = JSON.parse(localStorage.getItem("datosperfil")).email;
        document.getElementById("telefono").value = JSON.parse(localStorage.getItem("datosperfil")).telefono;
    }
});