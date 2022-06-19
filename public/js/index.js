const products = [
  {
    id: 1,
    name: "Helmet-1",
    price: 150.99,
    instock: 100,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.",
    imgSrc: "./images/h-1.png",
  },
  {
    id: 2,
    name: "Helmet-2",
    price: 164.99,
    instock: 43,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.",
    imgSrc: "./images/h2.png",
  },
  {
    id: 3,
    name: "Helmet-3",
    price: 354.99,
    instock: 10,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.",
    imgSrc: "./images/h3.png",
  },
  {
    id: 4,
    name: "Helmet-4",
    price: 249.99,
    instock: 5,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.",
    imgSrc: "./images/h4.jpg",
  },
  {
    id: 5,
    name: "Helmet-5",
    price: 549.99,
    instock: 4,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.",
    imgSrc: "./images/h5.jpg",
  },
  {
    id: 6,
    name: "Helmet-6",
    price: 332.99,
    instock: 40,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.",
    imgSrc: "./images/h6.jpg",
  },
];

const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsCartEl = document.querySelector(".total-items-in-cart");
const cartOpenEl = document.querySelector(".btncart");
const carty = document.querySelector(".cart")



// Render products
cartOpenEl.onclick = function (){
  if (carty.style.display !== "none"){
    carty.style.display = "none";
  } else {
    carty.style.display = "block";
  }
};


function renderProducts() {
  products.forEach((product) => {
    productsEl.innerHTML += `
    <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2><small>£</small>${product.price}</h2>
                        <p>
                            ${product.description}
                        </p>
                    </div>
                    <div class="add-to-wishlist">
                        <img src="./icons/heart.png" alt="add to wish list">
                    </div>
                    <div class="add-to-cart" onclick="addToCart(${product.id})">
                        <img src="./icons/bag-plus.png" alt="add to cart">
                    </div>
                </div>
            </div>
    `;
  });
}


renderProducts();

let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

function addToCart(id){
  if(cart.some((item) => item.id === id)){
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

function updateCart(){
  renderCartItems();
  renderSubtotal();

  localStorage.setItem("CART", JSON.stringify(cart))
}


function renderSubtotal(){
  let totalPrice = 0, totalItems = 0;

  cart.forEach((item) =>{
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotalEl.innerHTML = `Subtotal (${totalItems} items): ${totalPrice.toFixed(2)} `;
  totalItemsCartEl.innerHTML = totalItems;
}


function renderCartItems(){
  cartItemsEl.innerHTML = "";
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `  <div class="cart-item">
          <div class="item-info" onclick="removeItemFromCart(${item.id})">
              <img src="${item.imgSrc}" alt="${item.name}">
              <h4>${item.name}</h4>
          </div>
          <div class="unit-price">
              <small>£</small>${item.price}
          </div>
          <div class="units">
              <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
              <div class="number">${item.numberOfUnits}</div>
              <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
          </div>
      </div>
      `;

  });
}

function removeItemFromCart (id){
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {

      let numberOfUnits = item.numberOfUnits;

    if(item.id === id){
      if(action === "minus" && numberOfUnits > 1){
        numberOfUnits --;
      } else if (action === "plus" && numberOfUnits < item.instock){
        numberOfUnits++;
      }
    }
    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}
