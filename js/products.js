//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var productsArray = []

//Carga el DOM --> getJSONData devuelve objeto json --> si estado = ok --> 
//trabajo con array y llamo showProductsList
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            console.log(resultObj)
            productsArray = resultObj.data
            showProductsList(productsArray)
        }
});

function showProductsList(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        htmlContentToAppend += `
                <div class="col-sm-4">
                    <div class="card">
                        <img class="card-img-top" src="`+ product.imgSrc +`" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">`+ product.name +`</h5>
                            <p class="card-text">`+ product.description + `</p>
                            <p class="card-text negrita">Precio: USD `+ product.cost + `</p>
                            <a href="./product-info.html?producto=`+ product.name +`" class="btn btn-primary">Más información</a>
                        </div>
                    </div>
                </div>
      `
            document.getElementById("products-list").innerHTML = htmlContentToAppend;
    }
}

document.getElementById("Ascen").addEventListener("click", (event)=>{
    productsArray.sort((a, b) =>{
        if(a.cost < b.cost){
            return 1;
        }
        if (a.cost > b.cost){
            return -1;
        }
        return 0;    
    })
    showProductsList(productsArray)
})

document.getElementById("Desc").addEventListener("click", (event)=>{
    productsArray.sort((a, b) =>{
        if(a.cost < b.cost){
            return -1;
        }
        if (a.cost > b.cost){
            return 1;
        }
        return 0;    
    })
    showProductsList(productsArray)
})

document.getElementById("rel").addEventListener("click", (event)=>{
    productsArray.sort((a, b) =>{
        if(a.soldCount < b.soldCount){
            return 1;
        }
        if (a.soldCount > b.soldCount){
            return -1;
        }
        return 0;    
    })
    showProductsList(productsArray)
})

document.getElementById("filterrange").addEventListener('click', (event)=>{
    let min = document.getElementById("min").value;
    let max = document.getElementById("max").value;
    let filteredProducts = [];

    //Itero en cada producto para saber si cae en el rango de precio
    for(let i = 0; i < productsArray.length; i++){
        let product = productsArray[i];
        
        //Si el precio esta entre min y max, lo agrego al nuevo array
        if (product.cost >= min && product.cost <= max){
            filteredProducts.push(product);
        }
    }
    showProductsList(filteredProducts); 
})
})