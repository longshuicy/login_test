<!-- src/components/Home.vue -->
<template>
  <div class="container-fluid col-sm-6 col-sm-offset-3">
    <form class="form-signup" v-on:submit.prevent>
        <h2 class="form-signin-heading">Please Sign Up</h2><br>
        <div>
          <label for="inputUsername" class="sr-only">Username</label>
          <input type="username" id="username" class="form-control" placeholder="Username" required autofocus v-model = "username">
        </div><br>
        <div>
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model = "password">
        </div><br>
        <button class="btn btn-lg btn-primary btn-block" type="submit" @click = "submit()">Sign up</button>
      </form>
  </div>

</template>

<script>
  export default {
    name: 'signup',
    data () {
      return{
        username: '',
        password: '',
        success: false,
      }
    },
    methods: {

      submit() {
        this.$http.post('http://localhost:3000/register', {username: this.username, password: this.password}).then(response => {
           
            if (response.body.error){
              alert(response.body.error);
            }
            else if (!response.body.error && response.body.status == "OK"){
              
              alert("You have successfully registered!!!!!");
              this.success = true;  
            }
            else{
              alert("Looks like somethings wrong, try again!");
            }

          }).then(()=> {
            console.log(this.success);
            if (!this.success){
              this.$router.push('/signup');
            }
            else{
              this.$router.push('/login');
            }
          });
      },
      
      created: function () {
        if (this.$store.state.currentLoggin){
          this.$store.commit('switchView', 'dash');
          this.$router.push('/dashboard');        
        }
      }
    }
  }
</script>

<style scoped>
  .container-fluid {
      padding: 60px 50px;
  }
</style>