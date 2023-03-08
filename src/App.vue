<template>
  <div id="app">
    <TopHeader />
    <Login />
    <Header />
    <router-view />
    <Footer />
    <Toast />
  </div>
</template>
<script>
import TopHeader from '@/components/layout/TopHeader.vue'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import Login from '@/components/Login/index.vue'
import Toast from './components/Toast/toast.vue'
export default {
  components: {
    TopHeader, Header, Footer, Login, Toast
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
