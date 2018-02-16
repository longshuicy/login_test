<template>
  <div>
    <ul class="nav navbar-nav navbar-right">
      <li><a href="#about">ABOUT</a></li>
      <li><a href="#media">MEDIAS</a></li>
      <li><a href="#contact">CONTACT</a></li>
      <li @click = "signup()" v-if>
        <router-link to = "/signup" v-if="notloggedIn">
          <span class="glyphicon glyphicon-user"></span>
          <span style="border:none">Sign Up</span>
        </router-link>
      </li>
      <li @click = "login()" v-if="notloggedIn">
        <router-link to = "/login" >
          <span class="glyphicon glyphicon-log-in"></span>
          <span style="border:none">Login</span>
        </router-link>
      </li>
      <li id="home-usernm" v-if="isloggedIn">
          <span class="glyphicon glyphicon-user"></span>
          <span style="border:none">Welcome, {{user}}</span>
      </li>
      <li @click = "toDashboard()" v-if="isloggedIn">
        <router-link to = "/dashboard" >
          <span class="glyphicon glyphicon-log-in"></span>
          <span style="border:none">Dashboard</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

  export default {
    name: 'homeNavbar',
    data () {
      return{
        isloggedIn: this.$store.state.currentLoggin,
        user: this.$store.state.username
      }
    },
    computed:{
      notloggedIn: function () {
        return !this.$store.state.currentLoggin;
      }
    },
    methods :{
      login() {
        if (this.$store.state.currentLoggin){
          this.$store.commit('switchView', 'dash');
          this.$router.push('/dashboard');        
        }
        else{
          this.$store.commit('switchView', 'ls');
        }
      },
      signup() {
        if (this.$store.state.currentLoggin){
          this.$store.commit('switchView', 'dash');
          this.$router.push('/dashboard');        
        }
        else{
          this.$store.commit('switchView', 'ls');
        }
      },
      toDashboard() {
        if (this.$store.state.currentLoggin){
          this.$store.commit('switchView', 'dash');
          this.$router.push('/dashboard');        
        }
        else{
          this.$store.commit('switchView', 'ls');
        }
      },
    },   
  }
</script>

<style scoped>

  .navbar li a, .navbar .navbar-brand {
    color: #fff !important;
  }

  .navbar-nav li a:hover, .navbar-nav li.active a {
      color: #007ee5 !important;
      background-color: #fff !important;
  }
  .nav #home-usernm{
    color: #ffa;
    font-size:15px;
    margin-top:13px;
    margin-left:15px;
    margin-right:3px;
  }
  .navbar-default .navbar-toggle {
      border-color: transparent;
      color: #fff !important;
  }
</style>