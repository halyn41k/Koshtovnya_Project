<template>
    <div class="delivery-address">
      <h2 class="address-title">Ваша адреса доставки:</h2>
      <div class="address-details">
        <p class="recipient">{{ addressData.name }}</p>
        <p class="phone">{{ addressData.phone }}</p>
        <p class="location">{{ addressData.city }}, {{ addressData.postalOffice }}</p>
        <p class="street">{{ addressData.street }}</p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'DeliveryAddress',
  props: {
    addressData: {
      type: Object,
      required: true
    }
  }
};
</script>

  
  
  <style scoped>
  .delivery-address {
  padding: 23.33px 0; /* 35px / 1.5 */
  font: 16.67px/1.3 Merriweather, sans-serif; /* 25px / 1.5 */
}

.address-title {
  margin-left: 25.33px; /* 38px / 1.5 */
}

.address-divider {
  margin-top: 13.33px; /* 20px / 1.5 */
}

.address-details {
  margin: 10.67px 0 0 25.33px; /* 16px, 38px / 1.5 */
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
  </style>