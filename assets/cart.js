let cart = [];
let cartCount = 0;

function updateCartCount() {
  document.querySelector('.cart-count').textContent = cartCount;
}

function formatPrice(price) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP'
  }).format(price);
}

function updateCartDropdown() {
  const cartItems = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.cart-total');
  
  cartItems.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="empty-cart">Tu carrito está vacío</div>';
    cartTotal.innerHTML = `Total: ${formatPrice(0)}`;
    return;
  }

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
      </div>
      <button class="remove-item" data-index="${index}">×</button>
    `;
    cartItems.appendChild(li);
    total += item.price;
  });

  cartTotal.innerHTML = `
    <span>Total:</span>
    <span>${formatPrice(total)}</span>
  `;

  // Añadir botón de checkout si no existe
  if (!document.querySelector('.checkout-btn')) {
    const checkoutBtn = document.createElement('button');
    checkoutBtn.className = 'checkout-btn';
    checkoutBtn.textContent = 'Proceder al pago';
    document.querySelector('.cart-dropdown').appendChild(checkoutBtn);
  }
}

// Event Listeners
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const id = button.getAttribute('data-id');
    const name = button.getAttribute('data-name');
    const price = parseInt(button.getAttribute('data-price'));

    cart.push({ id, name, price });
    cartCount++;
    updateCartCount();
    updateCartDropdown();

    // Mostrar feedback visual
    const feedback = document.createElement('div');
    feedback.className = 'add-to-cart-feedback';
    button.parentElement.appendChild(feedback);
    setTimeout(() => feedback.remove(), 2000);
  });
});

document.querySelector('.cart-dropdown').addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-item')) {
    const index = e.target.getAttribute('data-index');
    cart.splice(index, 1);
    cartCount--;
    updateCartCount();
    updateCartDropdown();
  }
});

document.querySelector('.cart-btn').addEventListener('click', (e) => {
  const cartDropdown = document.querySelector('.cart-dropdown');
  const isVisible = cartDropdown.style.display === 'block';
  
  // Cerrar el dropdown si se hace clic fuera de él
  if (!isVisible) {
    cartDropdown.style.display = 'block';
    document.addEventListener('click', function closeCart(e) {
      if (!cartDropdown.contains(e.target) && !e.target.closest('.cart-btn')) {
        cartDropdown.style.display = 'none';
        document.removeEventListener('click', closeCart);
      }
    });
  } else {
    cartDropdown.style.display = 'none';
  }
});

// Inicializar el carrito
updateCartCount();
updateCartDropdown();