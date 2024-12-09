<template>
  <div class="order-details">
    <section class="delivery-address">
      <h2 class="address-title">Ваша адреса доставки:</h2>
      <div class="address-box">
        <p><strong>Ім'я:</strong> {{ formData.firstName }} {{ formData.lastName }}</p>
        <p><strong>Телефон:</strong> {{ formData.phoneDelivery || formData.phone }}</p>
        <p><strong>Місто:</strong> {{ formData.city }}</p>
        <p><strong>Пошта:</strong> {{ formData.postalService }}</p>
        <p><strong>Відділення:</strong> {{ formData.postalOffice }}</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "DeliveryAddress",
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
};
</script>


<style scoped>


  .order-details {
    gap: 13px;
    margin: 10px 0 0 18.67px;
    max-width: 1108px;
  }

  .order-items {
  max-height: 500px; /* Встановлюємо максимальну висоту */
  overflow-y: auto; /* Додаємо вертикальний скрол */
  margin-top: 20px; /* Відступ зверху */
  padding-right: 10px; /* Для естетики скролбару */
}

/* Налаштування для скролбару */
.order-items::-webkit-scrollbar {
  width: 8px;
}

.order-items::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.order-items::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

/* Для стилізації елементів у секції */
.order-items .item {
  display: flex;
  gap: 20px;
  background-color: #f5f5f5;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
}

.order-items .item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.order-items .item-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.order-items .item-title {
  font-size: 18px;
  font-weight: 600;
}

.order-items .item-price,
.order-items .item-quantity {
  font-size: 16px;
  color: #555;
}


.address-title {
  margin-left: 25.33px; 
}

.address-divider {
  margin-top: 13.33px; 
}

.address-details {
  margin: 10.67px 0 0 25.33px; 
}

  
  @media (max-width: 991px) {
    .delivery-address {
      max-width: 100%;
      margin-top: 40px;
    }
  
    .address-title,
    .address-details {
      margin-left: 10px;
    }
  }

  .delivery-address {
  padding: 20px;
  font: 16px/1.3 Merriweather, sans-serif;
  margin-top: 20px;
}

.address-title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

.address-box {
  background-color: #fff;
  border: 1px solid #d3d3d3; 
  border-radius: 8px; 
  padding: 20px;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}

.address-box p {
  margin: 5px 0;
}

</style>