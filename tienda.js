/**
 *   ==========================
 *   === Carrito Compras JS ===
 *   ==========================
 */

// =================================
// === Añadir objetos a la lista ===
// =================================
let items = ""
for (var i = 1; i <= 12; i++){
  let element = data[i];

  if((i-1) % 3 == 0){
    items += `<div id="tarjetas" class="contenedor">`;
  }
  
  items += `<div id="tarjeta-${element.id}" class="tarjeta">
      <img src="img/${element.img}" />
      <h2>${element.name}</h2>
      <p>Precio: ${element.price}€</p>
      <buttom class="myButton" onclick="addToCart(${element.id})">Comprar</buttom>
  </div>`;

  if(i % 3 == 0){
    items += `</div>`;
  }  
}

$('#lista-cursos').html(items);


// =================================
// === Mostrar y Ocultar carrito ===
// =================================
$('#cartBtn').click(() => {
  $('#ghost').fadeToggle(1000);
  //e1();
});


function e1(){
  $('#ghost').animate({
    opacity: 0.25
  }, 5000, function() {
    e2();
  });
}

function e2(){
  $('#ghost').animate({
    opacity: 1
  }, 5000, function() {
    e1();
  });
}


// ===================================
// === Añadir elementos al carrito ===
// ===================================

function addToCart(id) {  
  // Si en JSON existe el "id"
  if (cart[id]){
    cart[id]++;   // Incrementa 1
  } else {
    cart[id] = 1; // Setear a 1
  }
  paintCart()
}

// ====================================
// === Remover elementos al carrito ===
// ====================================

function removeToCart(id) {
  // Si queda un objeto de un tipo
  if (cart[id] == 1){
    delete cart[id];    // Elimnar clave del JSON
  } else {
    cart[id]--;     // Decrementar 1
  }
  paintCart()
}

// ====================================
// === Limpiar elementos al carrito ===
// ====================================


$('#vaciar-carrito').click((e) => {
  cart = {};
  paintCart()
});

// ===================================
// === Pintar elementos al carrito ===
// ===================================

function paintCart(){
  // Ocualtamos todo el contenido de la clase "fantasma"
  // Y mostramos el "loading"
  $('#carrito').fadeOut(0);
  $('#notItem').fadeOut(0);
  $('#loading').fadeIn(0);

  // Grabar en localstorage el contenido actual del carrito
  localStorage.setItem("cart", JSON.stringify(cart));
  let html = "";
  let total = 0;
  for (const key in cart) {
    if (cart.hasOwnProperty(key)) {
      const element = cart[key];
      let item = data[key];  
      total += item.price * element ;
       html += `<tr>
        <td class="text-center"><img src="img/${item.img}"  width="50px"/></td>
        <td>${item.name}</td>
        <td class="text-center">${element} x ${item.price}€</td>
        <td class="text-center">${item.price * element}€</td>
        <td>
          <buttom class="myButton2" onclick="addToCart(${key})">+</buttom>
          <buttom class="myButton2" onclick="removeToCart(${key})">-</buttom>
        </td>
      </tr>`;       
    }
  }

  html += `<tr class="trTotal">
        <td></td>
        <td></td>
        <td class="text-center">Total:</td>
        <td class="text-center">${total}€</td>
        <td></td>
      </tr>`;       
  
      $('#lista-carrito tbody').html(html);

  $('#loading').fadeOut(250);

  // Si no hay ningun objeto
  // Mostrar mensaje de vacio y sino mostramos la lista
  setTimeout(() =>{
    if(total == 0){      
      $('#notItem').fadeIn();
    }else{
      $('#carrito').fadeIn();
    }
  }, 250)
}

// Si el localstorage contiene el objeto "cart"
// Lo cargamos a nuestra variable sino lo cargamos vacio
// Para que al darle al F5 no se pierda la info
let store = localStorage.getItem("cart")
if(store == null){
  var cart = {}; // Objeto JSON vacio  
}else{
  var cart = JSON.parse(store);  
}
paintCart();
