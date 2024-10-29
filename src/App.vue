<template>
  <div id="app">
    <HeaderComponent /> 
    <HomePage />
    <FooterComponent />
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue' 

export default {
  name: 'App',
  components: {
    HeaderComponent,
    HomePage,
    FooterComponent
  }
}
</script>
