я чисто в App.vue поміняла
<template>
  <div id="app">
    <MainHeader /> 
    <HomePage />
    <FooterComponent />
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue'
import MainHeader from './components/MainHeader.vue'
import FooterComponent from './components/FooterComponent.vue' 

export default {
  name: 'App',
  components: {
    HomePage,
    MainHeader,
    FooterComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
