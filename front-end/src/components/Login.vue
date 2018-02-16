<!-- src/components/Home.vue -->

<template>
  <div class="container-fluid col-sm-6 col-sm-offset-3">
    <form class="form-signin" v-on:submit.prevent>
        <h2 class="form-signin-heading">Please Log In</h2><br>
        <div>
          <label for="inputUsername" class="sr-only">Username</label>
          <input type="username" id="username" class="form-control" placeholder="Username" required autofocus v-model = "username">
        </div><br>
        <div>
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model = "password">
        </div><br>
        <div class="checkbox">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit" @click = "submit()">Sign in</button>
      </form>
  </div>

</template>

<script>
  import { EventBus } from './../main.js';

  export default {
    name: 'login',
    data () {
      return{
        username: '',
        password: '',
        success: false
      }
    },
    methods: {
      submit() {
        
        this.$http.post('http://localhost:3000/login', {username: this.username, password: this.password})
          .then(response => {
            if (response.body.error){
              alert(response.body.error);
            }

            else if (!response.body.error && response.body.status == "OK"){
              alert("You have successfully logged In!!!!!");
              this.success = true;
              this.$store.commit('changeUsername', response.body.username);  
            }
            else{
              alert("Looks like somethings wrong, try again!");
            }
          }).then(() => {
            if (this.success){
              this.$store.commit('switchView', 'dash');
              this.$router.push('/dashboard');
              this.$store.commit('switchLoggin', true);
            }
            else{
              this.$router.push('/login');
            }
          });

      }
    },

    created: function () {
      if (this.$store.state.currentLoggin){
        this.$store.commit('switchView', 'dash');
        this.$router.push('/dashboard');        
      }
    }
  }
</script>

<style scoped>
  .container-fluid {
      padding: 60px 50px;
  }
</style>