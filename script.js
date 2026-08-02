document.addEventListener('DOMContentLoaded', () => {
  let cart = [];

  const cartToggleBtn = document.getElementById('cartToggle');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeCartBtn = document.getElementById('closeCart');
  const cartBadge = document.getElementById('cartBadge');
  const drawerCartCount = document.getElementById('drawerCartCount');
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotalPrice = document.getElementById('cartTotalPrice');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

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

  // Add To Cart Functionality
  document.querySelectorAll('.btn-add-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      const id = card.dataset.id;
      const name = card.dataset.name;
      const price = parseFloat(card.dataset.price);
      const img = card.dataset.img;

      addToCart(id, name, price, img);
      showToast(`Added ${name} to cart!`);
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

      addToCart(id, name, price, img);
      openCart();
    });
  });

  function addToCart(id, name, price, img) {
    const existingIndex = cart.findIndex(item => item.id === id);
    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({ id, name, price, img, qty: 1 });
    }
    updateCartUI();
  }

  function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    cartBadge.textContent = totalItems;
    drawerCartCount.textContent = totalItems;
    cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-msg">Your shopping cart is currently empty.</p>';
      return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item" style="display:flex; gap:12px; margin-bottom:16px; align-items:center;">
        <img src="${item.img}" style="width:50px; height:50px; border-radius:8px; object-fit:cover;">
        <div style="flex-grow:1;">
          <h4 style="font-size:0.9rem;">${item.name}</h4>
          <p style="font-size:0.8rem; color:var(--text-muted);">$${item.price} x ${item.qty}</p>
        </div>
      </div>
    `).join('');
  }

  function showToast(message) {
    toastMsg.textContent = message;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 3000);
  }
});

