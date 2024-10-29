<template>
    <div class="personal-info-card">
      <h2>Ваша особиста інформація</h2>
      <p><strong>Ім’я:</strong> {{ firstName }}</p>
      <p><strong>Прізвище:</strong> {{ lastName }}</p>
      <p><strong>Email:</strong> {{ email }}</p>
      <button class="change-password-button" @click="changePassword">Змінити пароль</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PersonalInfo',
    props: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
    },
    methods: {
      changePassword() {
        alert('Зміна пароля');
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
    margin: 8px 0;
  }
  
  .change-password-button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #6b1f1f;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .change-password-button:hover {
    background-color: #5a1616;
  }
  </style>
  