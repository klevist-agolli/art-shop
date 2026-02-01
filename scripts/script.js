// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(title, price) {
  cart.push({ title, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();

  const button = event.target;
  const originalText = button.textContent;
  button.textContent = 'ADDED ✓';
  button.style.background = '#8B9A7C';

  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = '';
  }, 1500);
}

function updateCart() {
  const cartCount = document.getElementById('cart-count');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  cartCount.textContent = cart.length;

  let total = 0;
  let itemsHTML = '';

  cart.forEach((item, index) => {
    total += item.price;
    itemsHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.title}</strong>
                    <br>$${item.price}
                </div>
                <button onclick="removeFromCart(${index})" style="background: var(--rust); color: white; border: none; padding: 0.5rem 1rem; cursor: pointer;">Remove</button>
            </div>
        `;
  });

  cartItems.innerHTML =
    itemsHTML || '<p style="text-align: center; padding: 2rem;">Your cart is empty</p>';
  cartTotal.textContent = total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

function toggleCart() {
  const modal = document.getElementById('cartModal');
  modal.classList.toggle('active');
}

function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  // Redirect to checkout page
  window.location.href = 'checkout.html';
}

// Wait for page to load before accessing elements
document.addEventListener('DOMContentLoaded', function () {
  // Close cart when clicking outside
  document.getElementById('cartModal').addEventListener('click', function (e) {
    if (e.target === this) {
      toggleCart();
    }
  });

  // Load cart on page load
  updateCart();
});
