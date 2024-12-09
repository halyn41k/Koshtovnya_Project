<template>
  <div class="personal-info-card">
    <h2 class="info-title">Ваша особиста інформація</h2>
    <div class="info-details">
      <p><strong>Ім’я:</strong> {{ first_name }}</p>
      <p><strong>Прізвище:</strong> {{ last_name }}</p>
      <p><strong>По батькові:</strong> {{ second_name }}</p> 
      <p><strong>Email:</strong> {{ email }}</p>
    </div>
    <button class="change-password-button" @click="changePassword">Змінити пароль</button>
  </div>
</template>

<script>
export default {
  props: {
    first_name: {
      type: String,
      default: 'Ім’я',
    },
    last_name: {
      type: String,
      default: 'Прізвище',
    },
    second_name: {
      type: String,
      default: 'По батькові', 
    },
    email: {
      type: String,
      default: 'email@example.com',
    },
  },
  methods: {
    changePassword() {
      this.$router.push("/changepassword");
    },
  },
};
</script>





<style scoped>
.personal-info-card {
  padding: 20px;
  border-radius: 8px;
  text-align: left;
  font-family: 'Merriweather', sans-serif;
}

.personal-info-card h2 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.personal-info-card p {
  font-size: 16px;
  color: #555;
  margin: 16px 0; 
}

.change-password-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #6b1f1f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 16px;
  font-family: 'Merriweather', sans-serif;
}

.change-password-button:hover {
  background-color: #a01212;
}
</style>
