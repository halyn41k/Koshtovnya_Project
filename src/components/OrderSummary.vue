<template>
    <div class="order-summary">
      <h2 class="summary-title">Сума до оплати</h2>
      <div class="summary-details">
        <div class="summary-row">
          <span>Проміжний підсумок</span>
          <span class="price">2700₴</span>
        </div>
        <div class="summary-row">
          <span>Доставка</span>
          <span class="price">0₴</span>
        </div>
        <div class="summary-row total">
          <span>Загальна сума</span>
          <span class="price">2700₴</span>
        </div>
      </div>
      <button class="payment-button">
        <span>Оплатити</span>
        <img src="https://cdn.builder.io/api/v1/image/assets/c3e46d0a629546c7a48302a5db3297d5/436b738744905f60c6a542e2cd314f5694db20045d36b8991f8dab9a31b316a0?apiKey=c3e46d0a629546c7a48302a5db3297d5" alt="Payment icon" class="button-icon" />
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'OrderSummary'
  }
  </script>
  
  <style scoped>
.order-summary {
  border-radius: 16px;
  background-color: rgba(255, 247, 246, 1);
  width: 300px;
  height: 200px;
  padding: 20px;
  border: 1px solid rgba(230, 230, 230, 1);
  margin-left: 900px;
  margin-top: -150px;
  position: sticky;  
}

.summary-title {
  color: #000;
  font: 700 20px/1.3 Merriweather, sans-serif;
  margin-bottom: 16px;
}

.summary-details {
  font: 400 14px/1.3 Merriweather, sans-serif;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.price {
  color: rgba(160, 18, 18, 1);
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 14px;
}

.total {
  font-size: 18px;
  margin-top: 16px;
}

.payment-button {
  border-radius: 8px;
  background-color: rgba(107, 31, 31, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font: 700 12px/1.3 Merriweather, sans-serif;
  padding: 6px 15px;
  margin-top: 10px;
  width: 100%;
  border: none;
  cursor: pointer;
}

.button-icon {
  width: 24px;
  height: 24px;
}

@media (max-width: 991px) {
  .order-summary {
    max-width: 100%;
    margin-top: 20px;
    padding: 15px;
  }
}
</style>
