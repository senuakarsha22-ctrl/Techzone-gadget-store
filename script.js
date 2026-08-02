document.addEventListener('DOMContentLoaded', () => {
  let shoppingCart = [];

  const cartToggleBtn = document.getElementById('cartToggle');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeCartBtn = document.getElementById('closeCart');
  const cartBadge = document.getElementById('cartBadge');
  const cartItemCount = document.getElementById('cartItemCount');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartTotalPrice = document.getElementById('cartTotalPrice');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');
  const searchInput = document.getElementById('searchInput');

  // Toggle Cart Drawer
  const openCart = () => {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
  };

  const closeCart = () => {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
  };

  cartToggleBtn.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  // Add Item to Cart
  document.querySelectorAll('.btn-add-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      const id = card.dataset.id;
      const name = card.dataset.name;
      const price = parseFloat(card.dataset.price);
      const img = card.dataset.img;

      addItemToCart(id, name, price, img);
      triggerToast(`Added "${name}" to cart!`);
    });
  });

  // Buy Now Action
  document.querySelectorAll('.btn-buy-now').forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      const id = card.dataset.id;
      const name = card.dataset.name;
      const price = parseFloat(card.dataset.price);
      const img = card.dataset.img;

      addItemToCart(id, name, price, img);
      openCart();
    });
  });

  function addItemToCart(id, name, price, img) {
    const existing = shoppingCart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      shoppingCart.push({ id, name, price, img, quantity: 1 });
    }
    renderCart();
  }

  function renderCart() {
    const totalCount = shoppingCart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = shoppingCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartBadge.textContent = totalCount;
    cartItemCount.textContent = totalCount;
    cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;

    if (shoppingCart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="cart-empty-state">
          <i class="fa-solid fa-basket-shopping"></i>
          <p>Your cart is empty.</p>
        </div>`;
      return;
    }

    cartItemsList.innerHTML = shoppingCart.map(item => `
      <div style="display:flex; gap:12px; align-items:center; margin-bottom:12px; background:#181b24; padding:8px; border-radius:6px;">
        <img src="${item.img}" style="width:48px; height:48px; object-fit:cover; border-radius:4px;">
        <div style="flex:1;">
          <h4 style="font-size:0.85rem; margin-bottom:2px;">${item.name}</h4>
          <span style="font-size:0.8rem; color:var(--accent-cyan);">$${item.price} x ${item.quantity}</span>
        </div>
      </div>
    `).join('');
  }

  function triggerToast(message) {
    toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  // Live Product Filter
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
      const title = card.dataset.name.toLowerCase();
      card.style.display = title.includes(term) ? 'flex' : 'none';
    });
  });
});
