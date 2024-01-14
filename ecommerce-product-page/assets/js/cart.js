import generateToast from './toast.js';
import { localStorageService } from './utils/localstorage.js';

const cartPanel = document.querySelector('#cartPanel');
const cartBtn = document.querySelector('#cartBtn');
const cartBody = document.querySelector('#cart__body');
const checkoutBtn = document.querySelector('#checkout');
const cartIndicator = document.querySelector('#cartIndicator');
const PRICE_PER_ITEM = 125;
let totalAmount = 0;
let selectedItemAmount = 0;


const checkoutState = {
  default: `<div></div>
        <p class="alt-bkg1 font-bold">Your cart is empty</p>
        <div></div>`,
  items:
    `<div class="cart__body--content flex gap-1">
      <div class="cart__body--content-description flex gap-1">
        <img class="cart__img" src="./images/image-product-1-thumbnail.jpg" alt="Shoes">
            <div class="grid alt-bkg1">
              <p class="product--name">Fall Limited Edition Sneakers</p>
              <p class="product--amt flex">
                <span>$125.00</span>
                <span>&times;</span>
                <span id="amt">3</span>
                <span id="total" class="text font-bold">$375</span>
              </p>
            </div>
          </div>
          <button id="trash" aria-label="Remove product from cart">
            <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <defs>
                <path
                  d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
                  id="a" />
              </defs>
              <use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a" />
            </svg>
          </button>
        </div>
        <button class="cart__body--btn rounded accent-pale bg-accent fs-2 font-bold">Checkout
        </button>
      </div>`
}

function toggleCartPanel() {
  const isExpanded = cartBtn.getAttribute('aria-expanded') === 'true';
  cartBtn.setAttribute('aria-expanded', !isExpanded);
  cartPanel.toggleAttribute('disabled', isExpanded);
}

function updateCartDisplay() {
  if (totalAmount === 0) {
    cartBody.innerHTML = checkoutState.default;
    cartIndicator.textContent = null;
    cartIndicator.classList.remove('active');
  } else {
    cartBody.innerHTML = checkoutState.items;
    document.querySelector('#amt').textContent = totalAmount;
    const totalCost = totalAmount * PRICE_PER_ITEM;
    document.querySelector('#total').textContent = `$${totalCost}.00`;
    cartIndicator.textContent = totalAmount;
    cartIndicator.classList.add('active');
    document.querySelector('.cart__body--btn').textContent = `Checkout ($${totalCost}.00)`;
    if (selectedItemAmount != 0) {
      generateToast(`${selectedItemAmount} added to cart`);
    }
    localStorageService.set('cartTotalAmount', totalAmount);
  }
}

function updateCartIndicator() {
  const isActive = selectedItemAmount > 0;
  cartIndicator.textContent = isActive ? selectedItemAmount : null;
  cartIndicator.classList.toggle('active', isActive);
}

function updateCartItemDetails() {
  const totalCost = selectedItemAmount * PRICE_PER_ITEM;
  document.querySelector('#amt').textContent = selectedItemAmount;
  document.querySelector('#total').textContent = `$${totalCost}.00`;
  cartIndicator.textContent = selectedItemAmount;
  document.querySelector('.cart__body--btn').textContent = `Checkout ($${totalCost}.00)`;
  generateToast(`${selectedItemAmount} added to cart`);
}

function handleAmountChange(change) {
  selectedItemAmount += change;
  selectedItemAmount = Math.max(0, selectedItemAmount);
  document.querySelector('#qty').textContent = selectedItemAmount;
  updateAmountButtonState();
}

function updateAmountButtonState() {
  const amtDecreaseBtn = document.querySelector('#amt--decrease');
  amtDecreaseBtn.toggleAttribute('disabled', selectedItemAmount === 0);
  amtDecreaseBtn.classList.toggle('alt-bkg2', selectedItemAmount === 0);
  amtDecreaseBtn.classList.toggle('accent', selectedItemAmount > 0);
}

document.querySelectorAll('.amt').forEach(btn => {
  btn.addEventListener('click', event => {
    handleAmountChange(event.currentTarget.id === 'amt--decrease' ? -1 : 1);
  });
});

cartBtn.addEventListener('click', toggleCartPanel);

checkoutBtn.addEventListener('click', () => {
  totalAmount += selectedItemAmount;
  updateCartDisplay();
  selectedItemAmount = 0;
  document.querySelector('#qty').textContent = selectedItemAmount;
  updateAmountButtonState();
});

cartPanel.addEventListener('click', event => {
  if (event.currentTarget === event.target) {
    toggleCartPanel();
  }
  if (event.target.matches('#trash')) {
    localStorageService.remove('cartTotalAmount');
    selectedItemAmount = 0;
    totalAmount = 0;
    updateCartDisplay();
    generateToast('Items removed from cart.');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const storedTotalAmount = localStorageService.get('cartTotalAmount');
  if (storedTotalAmount !== null) {
      totalAmount = storedTotalAmount;
      updateCartDisplay();
  }
});