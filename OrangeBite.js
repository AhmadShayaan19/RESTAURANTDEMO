const foods = [
  {
    id: 1,
    name: "Cheese Burger",
    category: "Burger",
    price: 199,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 299,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591"
  },
  {
    id: 3,
    name: "Chocolate Cake",
    category: "Dessert",
    price: 149,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587"
  },
  {
    id: 4,
    name: "Cold Coffee",
    category: "Drink",
    price: 99,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
  }
];

let cart = [];

const foodContainer = document.getElementById("food-container");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const cartBox = document.getElementById("cart");

function displayFoods(items) {
  foodContainer.innerHTML = "";

  items.forEach(food => {
    foodContainer.innerHTML += `
      <div class="food-card">
        <img src="${food.image}" alt="${food.name}">
        <div class="food-info">
          <h3>${food.name}</h3>
          <p>₹${food.price}</p>
          <button onclick="addToCart(${food.id})">Add to Cart</button>
        </div>
      </div>
    `;
  });
}

function filterFoods(category) {
  if (category === "All") {
    displayFoods(foods);
  } else {
    displayFoods(foods.filter(food => food.category === category));
  }
}

function addToCart(id) {
  const item = cart.find(food => food.id === id);

  if (item) {
    item.qty++;
  } else {
    const food = foods.find(food => food.id === id);
    cart.push({ ...food, qty: 1 });
  }

  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <h4>${item.name}</h4>
        <p>₹${item.price} x ${item.qty}</p>
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
    `;
  });

  cartTotal.textContent = total;
  cartCount.textContent = count;
}

function changeQty(id, change) {
  const item = cart.find(food => food.id === id);

  item.qty += change;

  if (item.qty <= 0) {
    cart = cart.filter(food => food.id !== id);
  }

  updateCart();
}

document.getElementById("cart-btn").addEventListener("click", () => {
  cartBox.classList.toggle("hidden");
});

displayFoods(foods);