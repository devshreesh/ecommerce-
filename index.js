// Practice
// Select the first element with class "hamburger"
const navbar = document.querySelector(".navbar"); // Select the first element with class "navbar"

function show() {
  // Check if the navbar is already visible
  if (navbar.style.display === "none") {
    navbar.style.display = "block";
  } else {
    navbar.style.display = "none";
  }
}


//...funton to updata cart display number
function onloadcartnumber() {
  let productNumbers = localStorage.getItem("cartnumbers");

  if (productNumbers) {
    document.querySelector(".jkh").innerHTML = productNumbers;
  }
}














//...funtion  for add to cart button
const addtocart = document.querySelectorAll(".qwert");

for (let i = 0; i < addtocart.length; i++) {
  addtocart[i].addEventListener("click", () => {
    cartnumbers(products[i]);
    totalcost(products[i]);
  });
}

//... function to update the number of items in the shopping cart displayed on the page
function cartnumbers(product) {
  let productNumbers = localStorage.getItem("cartnumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartnumbers", productNumbers + 1);
    document.querySelector(".jkh").innerHTML = productNumbers + 1;
  } else {
    localStorage.setItem("cartnumbers", 1);
    document.querySelector(".jkh").innerHTML = 1;
  }

  setItem(product);
}
//... store item into local storage
function setItem(product) {
  let cartItems = localStorage.getItem("productsincart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].quantity += 1;
  } else {
    product.quantity = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsincart", JSON.stringify(cartItems));
}

//...funtion to calculate the total price of all items in the cart
function totalcost(product) {
  let cartCost = localStorage.getItem("totalcost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalcost", cartCost + product.price);
  } else {
    localStorage.setItem("totalcost", product.price);
  }
}



function displaycart() {
  let cartItems = localStorage.getItem("productsincart");
  cartItems = JSON.parse(cartItems);
  let productcontainer = document.querySelector(".product-container");
  let cartCost = localStorage.getItem("totalcost");

  if (cartItems && productcontainer) {
    productcontainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productcontainer.innerHTML += `
      <div class="product">
          <img src="".jpg">
          <span>${item.name}</span>
          <span>${item.quantity}</span>
          <span>${item.price}</span>
          <button class="btn"><i class="fa-solid fa-circle-xmark"></i></button>
     </div>`;
    });

    productcontainer.innerHTML += `
    <div class="headings">
    <span>poduct</span>
    <span class="lppout" >quantity</span>
    <span >price</span>
    <span></span>
    
    </div>`

    productcontainer.innerHTML += `
    <div class="basket">
    <span>Total:</span>
    <br>
    <br>
    <br>
    <br>
        <span>₹${cartCost}</span>
        <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <a href="chekout.html"><button>checkout</button></a>

      
   
</div>`
  }
}





displaycart();


onloadcartnumber();


 