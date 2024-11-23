<template>
  <div id="app">
    <HeaderComponent /> 
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue' 

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
  },
  mounted() {
  const token = localStorage.getItem("token");
  if (!token && this.$route.name !== "Login") {
    this.$router.push({ name: "Login" });
  }
}

}
</script>
