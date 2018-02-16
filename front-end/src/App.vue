<template>
  <div id= "hahah">
    <selfNavbar />
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import selfNavbar from './components/Navbar';

  export default {
    name: 'app',
    components: {
      'selfNavbar' : selfNavbar    
    },
  }
</script>

<style scoped>
  .container-fluid {
      padding: 60px 50px;
  }
</style>
