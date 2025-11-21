const amountInput = document.querySelector('#order-amount');
const shippingSelect = document.querySelector('#shipping-type');
const calcButton = document.querySelector('#calc-btn');
const resultEl = document.querySelector('#result');

function formatPrice(value) {
  return value.toFixed(2).replace('.', ',') + ' €';
}

const shippingStrategies = {
  standard: amount => (amount >= 50 ? 0 : 4.99),
  express: amount => (amount >= 100 ? 0 : 9.99),
  pickup: amount => (amount >= 30 ? 0 : 2.99)
};

function calculateShippingCost(type, amount) {
  const strategy = shippingStrategies[type];
  if (!strategy) return 0;
  return strategy(amount);
}

calcButton.addEventListener('click', () => {
  const type = shippingSelect.value;
  const amount = Number(amountInput.value) || 0;
  const shippingCost = calculateShippingCost(type, amount);
  resultEl.textContent = 'Frais de livraison : ' + formatPrice(shippingCost);
});

