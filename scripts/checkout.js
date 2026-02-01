// Load cart items from localStorage
function loadOrderSummary() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const summaryItems = document.getElementById('summary-items');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');

  if (cart.length === 0) {
    summaryItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    return;
  }

  let subtotal = 0;
  let itemsHTML = '';

  cart.forEach((item) => {
    subtotal += item.price;
    itemsHTML += `
      <div class="summary-item">
        <div class="item-info">
          <h4>${item.title}</h4>
          <p class="item-price">$${item.price}</p>
        </div>
      </div>
    `;
  });

  summaryItems.innerHTML = itemsHTML;

  const shipping = 15;
  const total = subtotal + shipping;

  subtotalEl.textContent = '$' + subtotal;
  totalEl.textContent = '$' + total;
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('checkout-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    alert(
      'Thank you for your order! We will contact you shortly at ' +
        data.email +
        ' to confirm your purchase.',
    );

    // Clear cart from localStorage
    localStorage.removeItem('cart');

    // Redirect to home page after a moment
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  });

  // Load order summary when page loads
  loadOrderSummary();
});
