//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let user = JSON.parse(localStorage.getItem('user'));

let htmlContentToAppend = ``;
let stars = ``;

function addStars(llenas, vacias){

    //2do For() Repito para la cantidad de estrellas llenas
    for(let j = 0; j < llenas; j++){
        stars = stars + `
        <span class="fa fa-star checked"></span>`
    }

    //3er For() Repito para la cantidad de estrellas vacías
    for(let k = 0; k < vacias; k++){
        stars = stars + `
        <span class="fa fa-star"></span>`
    }
    return stars;
 }

document.addEventListener("DOMContentLoaded", function(e){
    
    document.getElementById('usercomment').innerHTML = `Usuario: ` + `<span class="userBold">` + user.username + `</span> `

    //Realizo petición a JSON con info del producto
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            //Si respuesta == ok --> Añado contenido HTML dinámico con la info del producto
            
            let product = resultObj.data; 

            let productoActual = getQueryVariable("producto");
            document.getElementById("productInfo").innerHTML = `<h3>` + productoActual.replace(/%20/g, " ") + `</h3>` + `<img src="` + product.images[0] + `" class="img-thumbnail">`

            document.getElementById("ulDatos").innerHTML =`
            <li class="datos"><span class="ulNegro">Descripción: </span>  `+ product.description + `</li>
            <li class="datos"><span class="ulNegro">Costo: </span>  `+ product.cost + "  USD" + `</li>
            <li class="datos"><span class="ulNegro">Tipo de moneda: </span>  `+ product.currency + `</li>
            <li class="datos"><span class="ulNegro">Unidades vendidas: </span>  `+ product.soldCount + `</li>`

            //Recorro el array de imágenes del producto para añadir fotos a la galería
            let htmlContentToAppend = ``
            for(let i = 0; i < product.images.length - 1; i++){
                htmlContentToAppend = htmlContentToAppend + `
                <div class="col-md-3 mb-3">
                    <div class="card">
                    <img class="img-fluid" src=` + product.images[i] + `
                    alt="Card image cap">
                    </div>
                </div>
                `  
            }
            document.getElementById("galeria").innerHTML = htmlContentToAppend;
        
                //Productos relacionados
                getJSONData(PRODUCTS_URL).then(function(resultObj){
                    if (resultObj.status === "ok"){
                        productsArray = resultObj.data
                        for(let i = 1; i < 4; i++){
                            document.getElementById("relatedProd").innerHTML += `
                            <p class="relatedNames"><span class="ulNegro">`+ productsArray[i].name +`: </span></p>
                            <a href="product-info.html?producto=`+ productsArray[i].name +`"><img class="alineadas" src="img/prod` + (i+1) + `.jpg" alt="" ></a>
                        `
                        }
                    }
            });   
        }
    }); 

 //CARGA DE COMENTARIOS
 
 getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
    if (resultObj.status === "ok"){
        let comment = resultObj.data;

            //1er For() Recorre Array de comentarios
            for(let i = 0; i < comment.length; i++){

                //Calculo la cantidad de estrellas vacías
                let voidstars = 5 - comment[i].score;
                
                addStars(comment[i].score, voidstars);
                
                htmlContentToAppend = htmlContentToAppend + `
                <div class="comentario">
                    <img class="comentIcon" src="img/userComent.png" alt="">
                    <p class="texto"> <span class="userBold">` + comment[i].user + `</span>: ` + comment[i].description + `</p>
                    <p class="fecha">Publicado: ` + comment[i].dateTime + `</p>
                </div>` + `<p class="stars">` + stars + `</p>` + `` 
                
                stars = ``;
            }
            document.getElementById("seccionComentarios").innerHTML = htmlContentToAppend;   
    }})
});

//Obtengo parámetro de la URL con el nombre del producto --> limpio el String de separadores y otros elementos.
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
 }

 //Carga de comentario con nombre de usuario.
 document.getElementById("publicar").addEventListener('click', (event)=>{
    let comentario = document.getElementById('comment').value;
    let llenas = document.getElementById("score").value;

    if(comentario.length === 0 || llenas === ""){
        alert("ERROR: Ingrese un comentario y puntuación")
    }
    else{
        //Creo Objeto Date para obtener fecha y hora actual --> 
        //Con las funciones de Date lleno el strin fecha con los datos
        let hoy = new Date();
        let fecha = hoy.getFullYear() + '-' + hoy.getMonth() + '-' + hoy.getDate() + ' ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        
        let vacias = 5 - document.getElementById("score").value;
        stars = addStars(llenas, vacias);

        document.getElementById("seccionComentarios").innerHTML = htmlContentToAppend + `
            <div class="comentario">
                <img class="comentIcon" src="img/userComent.png" alt="">
                <p class="texto"><span class="userBold">` + user.username + `</span>: ` + comentario +  `</p>
                <p class="fecha">Publicado: ` + fecha + `</p>
            </div>` + `<p class="stars">` + stars + `</p>`
            
            //Igualo la string stars a vacío para volver a utilizar (Si no, se acumulan las estrellas)
            stars = ``;
    } 
})