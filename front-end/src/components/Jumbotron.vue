<!-- src/components/Home.vue -->

<template>
  <div  class="container-fluid jumbotron text-center">
    <h2>Welcome to Social Universe Observatory</h2> 
    <p>We help people to monitor Social Media</p> <br><br>
    <img src="./../assets/complete_demo.gif" class = "img" >
  </div>
</template>

<script>
 
  export default {
    name: 'selfJumbotron',
  }
</script>

<style scoped>
  .container-fluid {
      padding: 60px 50px 60px 50px;
  }
 .jumbotron { 
    background-color: #171E26; /* Orange */
    color: #ffffff;
    letter-spacing: 2px;
  }

  .img {
    width: 80%;
  }

</style>