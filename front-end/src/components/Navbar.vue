<template>
  <div>
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header" @click=homepage()>
          <router-link to = "/" class="navbar-brand"  style="font-family:">SUO</router-link>
        </div>
        <component :is="currentView">
          <!-- inactive components will be cached! -->
        </component>
      </div>
    </nav>
  </div>
</template>

<script>
  import homeNavbar from './HomeNavbar';
  import lsNavbar from './LSNavbar';
  import dashNavbar from './DashNavbar';
  import { mapState } from 'vuex';


  export default {
    name: 'selfNavbar',
    computed: mapState({
      currentView: state=>state.currentView,
    }),
    components:{
      home: homeNavbar,
      ls: lsNavbar,
      dash: dashNavbar
    },
    methods:{
      homepage(){
        this.$store.commit('switchView', 'home');
      }
    }
  }
</script>

<style scoped>
  .navbar {
    font-size: 15px ;
    border: 0;
    margin-bottom: 2px;
    letter-spacing: 2px;
    background-color: #171E26;
    line-height: 1.42857143 !important;

  }

  .navbar li a, .navbar .navbar-brand {
    color: #fff !important;
  }

  .navbar-nav li a:hover, .navbar-nav li.active a {
      color: #007ee5 !important;
      background-color: #fff !important;
  }

  .navbar-default .navbar-toggle {
      border-color: transparent;
      color: #fff !important;
  }
</style>