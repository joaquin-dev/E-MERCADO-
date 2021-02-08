const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json"
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

//Si no existe logged en el sessionStorarge y no estoy en el login, ir al login
if ( !(sessionStorage.getItem("logged")) && !(window.location.href.endsWith("login.html")) ){
  window.location = "login.html";
  }

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

  function MyFunction(){
    let userinfo = JSON.parse(localStorage.getItem('user'))
    document.getElementById("generalButton").innerHTML += 
    `<div class="btn-group" >
        <button type="button" class="btn btn-danger btnGral" >`+userinfo.username+`</button>
        <button type="button" class="btnGral btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span class="sr-only" >Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu">
            <a class="dropdown-item" href="cart.html">Ver mi carrito</a>
            <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="login.html">Cerrar sesion</a>
    </div>`
  }
  MyFunction();


  
  // //Convierto objeto JSON del localStorage a Objeto JS para acceder a propiedades.
  // let userinfo = JSON.parse(localStorage.getItem('user'))
  // document.getElementById('usernamegeneral').innerHTML = userinfo.username;
});