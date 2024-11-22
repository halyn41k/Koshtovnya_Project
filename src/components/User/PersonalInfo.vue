<template>
  <div class="personal-info-card">
    <h2 class="info-title">Ваша особиста інформація</h2>
    <div class="info-details">
      <p><strong>Ім’я:</strong> {{ user.firstName }}</p>
      <p><strong>Прізвище:</strong> {{ user.lastName }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
    </div>
    <button class="change-password-button" @click="changePassword">Змінити пароль</button>
  </div>
</template>


<script>
export default {
  name: "PersonalInfo",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
      },
    };
  },
  created() {
    // Завантаження даних користувача з localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      alert("Будь ласка, увійдіть у систему.");
      this.$router.push("/login");
    }
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
  background-color: #5a1616;
}
</style>
