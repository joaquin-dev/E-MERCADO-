let subtotal = 0;

//Defino HTMLCollections de los elementos:
    //<td>
    //<td> --> <input type number>
let unitarios = document.getElementsByClassName("unitario");
let cantidades = document.getElementsByClassName("cantidadesCart");
let subtotales = document.getElementsByClassName("subtotal");
let monedas = document.getElementsByClassName("moneda")
let pesos = 0;
let pagoelegido = false;

function calcularSubtotal() {
    
    for(let i = 0; i < unitarios.length; i++){

        //Cambio el HTML de la celda "subtotal" con el cálculo del mismo
        subtotales[i].innerHTML = (unitarios[i].innerHTML * cantidades[i].value);               
    }
    //Total final
    document.getElementById("totalCart").innerHTML = "Total del carrito: " + calcularTotal();
}

function chequear(){
    if (document.getElementById("tarjeta").checked){
        document.getElementById("serie").disabled = false;
        document.getElementById("codseg").disabled = false;
        document.getElementById("fecha").disabled = false;
        document.getElementById("tarjetas").disabled = false;
        
        document.getElementById("nrocuenta").value = "";

        document.getElementById("nrocuenta").disabled = true;
    }
    if (document.getElementById("transferencia").checked){
        document.getElementById("serie").disabled = true;
        document.getElementById("codseg").disabled = true;
        document.getElementById("fecha").disabled = true;
        document.getElementById("tarjetas").disabled = true;
        document.getElementById("nrocuenta").disabled = false;
    }
}

function calcularTotal(){
    pesos = 0;
    let USDtoUYU = 40;
    for(let i = 0; i < subtotales.length; i++){

        if (monedas[i].innerHTML === "USD"){
            
            pesos += parseInt(subtotales[i].innerHTML) * USDtoUYU;
        }else{
            pesos += parseInt(subtotales[i].innerHTML);
            console.log(pesos);
        }
    }
    return pesos;
}

document.addEventListener("DOMContentLoaded", function(e){

    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(resultObj){
    
        if (resultObj.status === "ok"){
            let productsList = resultObj.data.articles;
            
            for(let i = 0; i < productsList.length; i++){
                subtotal += (productsList[i].unitCost * productsList[i].count)

                document.getElementById("tableProducts").innerHTML += `
                    <tr> 
                        <td><img class="imgList" src=`+ productsList[i].src +`>` + productsList[i].name +`</td>
                        <td class="unitario">`+ productsList[i].unitCost +`</td>
                        <td id="cant"> <input type="number" id="cantidadNum" class="cantidadesCart" min="1" value="`+ productsList[i].count +`" onchange="calcularSubtotal()"> </td> 
                        <td class="moneda">`+ productsList[i].currency +`</td>
                        <td class="subtotal">`+ subtotal +`</td>
                    </tr>
                    `
                //Total inicial
                document.getElementById("totalCart").innerHTML = "Total del carrito: " + "UYU " + calcularTotal();
            }
        }
    })

    document.getElementById("envio").addEventListener("change", function(e){
        let total = 0;
        let cincoporciento = 0.05;
        let sieteporciento = 0.07;
        let quinceporciento = 0.15;

        if (document.getElementById("envio").value === "standard"){
            total = calcularTotal() + (calcularTotal() * cincoporciento);
            document.getElementById("dias").innerHTML = "Demora: 12 - 15 días";
            document.getElementById("costo").innerHTML = "5% Sobre el subtotal ($"+ calcularTotal() * cincoporciento +" adicionales)";
        }
        else if (document.getElementById("envio").value === "express"){
            total = calcularTotal() + (calcularTotal() * sieteporciento);
            document.getElementById("dias").innerHTML = "Demora: 5 - 8 días";
            document.getElementById("costo").innerHTML = "7% Sobre el subtotal ($"+ calcularTotal() * sieteporciento +" adicionales)"; 
        }
        else if (document.getElementById("envio").value === "premium"){
            total = calcularTotal() + (calcularTotal() * quinceporciento);
            document.getElementById("dias").innerHTML = "Demora: 2 - 5 días";
            document.getElementById("costo").innerHTML = "15% Sobre el subtotal ($"+ calcularTotal() * quinceporciento +" adicionales)";
        }
        document.getElementById("costofinal").innerHTML = "Total de la compra: UYU " + total;
    })
    
    document.getElementById("aceptarcart").addEventListener("click", function(e){
        let regExp1 = /^\d{16}$|^\d{18}$|^\d{14}$^\d{[0-9]}$/;

        //Compruebo radioButtons, campos vacíos y RegExp´s en el modal
        if(document.getElementById("tarjeta").checked){
            
            if(document.getElementById("serie").value === ""){
                alert("Rellene los campos");
            }
            else if(document.getElementById("codseg".value === "")){
                alert("Rellene los campos");
            }
            else if(document.getElementById("fecha").value === ""){
                alert("Rellene los campos");
            }
            else {
                pagoelegido = true;
            }
        }
        
        else if(document.getElementById("transferencia").checked){
            pagoelegido = true;
            if (document.getElementById("nrocuenta").value === ""){
                alert("Rellene los campos");
            }
        }
        else{
            pagoelegido = true;
        }

    })

    document.getElementById("cartform").addEventListener('submit', function(e){
        e.preventDefault();
        //Si se eleigió una forma de pago --> pagoelegido vale true --> hago la compra
        if(pagoelegido === true){
            getJSONData(CART_BUY_URL).then(function(resultObj){
                alert(resultObj.data.msg);
                window.location.href = "./cart.html"
                
            })
        }
        else{
            alert("No ha seleccionado una forma de pago")
        }
    })
 });