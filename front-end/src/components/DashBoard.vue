<!-- src/components/Home.vue -->
<template>
  <div class="container-fluid">
    <div class = "row">
      <div class="panel panel-default">
        <div class="panel-heading">Instruction</div>
        <div class="panel-body">1. To use our platform, users need to log in social platforms with their own accounts and give us permission to access their account information.</div>
        <div class="panel-body">2. Click on social platforms, which you want use, in the Unauthorized panel and log in with your own account.</div>
        <div class="panel-body">3. Once you successfully logged in, the corresponding social media logo will disappear from the Unauthorized panel and appear in the Authorized panel.</div>

      </div>
    </div>
    <div class = "row">
      <div class="col-sm-4 pull-left">
        <div >
          <h2> Unauthorized Panel</h2>
        </div>
        <div class="row">
          <div @click = "fbClick()" v-if = "!loginArray['facebook']" class="col-sm-4">
            <icon name="facebook-square" scale = '5' color = "#3B5998"></icon>
            <h4>FACEBOOK</h4>
          </div>
          <div @click = "twClick()" v-if = "!loginArray['twitter']" class="col-sm-4">
            <icon name="twitter-square" scale = '5' color = "#4099FF"></icon>
            <h4>TWITTER</h4>
          </div>
          <div @click = "insClick()" v-if = "!loginArray['instagram']" class="col-sm-4">
            <icon name="instagram" scale = '5' color = "#333"></icon>
            <h4>INSTAGRAM</h4>
          </div>
          <div @click = "wikiClick()" v-if = "loginArray['wikimedia']" class="col-sm-4">
            <icon name="wikipedia-w" scale = '5'></icon>
            <h4>Wikipedia</h4>
          </div>
          <div @click = "stackClick()" v-if = "loginArray['stackoverflow']" class="col-sm-4">
            <icon name="stack-overflow" scale = '5'></icon>
            <h4>StackOverflow</h4>
          </div>
          <div @click = "flcClick()" v-if = "!loginArray['flickr']" class="col-sm-4">
            <icon name="flickr" scale = '5' color = "#ff0084"></icon>
            <h4>Flickr</h4>
          </div>
          <div @click = "sptClick()" v-if = "!loginArray['spotify']" class="col-sm-4">
            <icon name="spotify" scale = '5' color = "#00e461"></icon>
            <h4>Spotify</h4>
          </div>
          <div @click = "redClick()" v-if = "!loginArray['reddit']" class="col-sm-4">
            <icon name="reddit-square" scale = '5' color = "#ff4500"></icon>
            <h4>Reddit</h4>
          </div>
          <div @click = "youClick()" v-if = "!loginArray['youtube']" class="col-sm-4">
            <icon name="youtube-square" scale = '5' color = "#bb0000"></icon>
            <h4>Youtube</h4>
          </div>
          <div @click = "pinClick()" v-if = "!loginArray['pinterest']" class="col-sm-4">
            <icon name="pinterest-square" scale = '5' color = "#cb2027"></icon>
            <h4>Pinterest</h4>
          </div>
          <div @click = "tumblrClick()" v-if = "!loginArray['tumblr']" class="col-sm-4">
            <icon name="tumblr-square" scale = '5' color = "#32506d"></icon>
            <h4>Tumblr</h4>
          </div>
        </div>
      </div>
      
      <div class="col-sm-4 col-sm-offset-2">
        <div>
          <h2> Authorized Panel </h2>
        </div>
        <div class="row">
          <div v-if = "loginArray['facebook']" class="col-sm-4">
            <icon name="facebook-square" scale = '5' color = "#3B5998"></icon>
            <h4>FACEBOOK</h4>
          </div>
          <div v-if = "loginArray['twitter']" class="col-sm-4">
            <icon name="twitter-square" scale = '5' color = "#4099FF"></icon>
            <h4>TWITTER</h4>
          </div>
          <div v-if = "loginArray['instagram']" class="col-sm-4">
            <icon name="instagram" scale = '5'></icon>
            <h4>INSTAGRAM</h4>
          </div>
          <div v-if = "loginArray['wikimedia']" class="col-sm-4">
            <icon name="wikipedia-w" scale = '5'></icon>
            <h4>Wikipedia</h4>
          </div>
          <div v-if = "loginArray['stackoverflow']" class="col-sm-4">
            <icon name="stack-overflow" scale = '5'></icon>
            <h4>StackOverflow</h4>
          </div>
          <div v-if = "loginArray['flickr']" class="col-sm-4">
            <icon name="flickr" scale = '5' color = "#ff0084"></icon>
            <h4>Flickr</h4>
          </div>
          <div v-if = "loginArray['spotify']" class="col-sm-4">
            <icon name="spotify" scale = '5' color = "#00e461"></icon>
            <h4>Spotify</h4>
          </div>
          <div v-if = "loginArray['reddit']" class="col-sm-4">
            <icon name="reddit-square" scale = '5' color = "#ff4500"></icon>
            <h4>Reddit</h4>
          </div>
          <div v-if = "loginArray['youtube']" class="col-sm-4">
            <icon name="youtube-square" scale = '5' color = "#bb0000"></icon>
            <h4>Youtube</h4>
          </div>
          <div v-if = "loginArray['pinterest']" class="col-sm-4">
            <icon name="pinterest-square" scale = '5' color = "#cb2027"></icon>
            <h4>Pinterest</h4>
          </div>
          <div v-if = "loginArray['tumblr']" class="col-sm-4">
            <icon name="tumblr-square" scale = '5' color = "#32506d"></icon>
            <h4>Tumblr</h4>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapState } from 'vuex';


  export default {
    name: 'dashboard',
    data () {
      return{
        loginArray: {'facebook': false, 
		'twitter': false, 
		'flickr': false, 
		'spotify': false, 
		'reddit': false, 
		'youtube': false, 
		'tumblr': false,
		'instagram':false,
		'wikimedia':false,
		'stackoverflow':false}
      }
    },
    computed: mapState({
      wikimedia: state=>state.wikimedia,
      stackoverflow: state=>state.stackoverflow
    }),

    methods: {
      mainClick: function(choice){
        var string = 'http://localhost:3000/login/' + choice;
        var win = window.open(string);
        var timer = setInterval(function() {
            if (win.closed) {
                clearInterval(timer);
                location.reload();
            }
        }, 500);
      },
      fbClick() {
        this.mainClick('facebook');
      },
      twClick() {
        this.mainClick('twitter');
      },
      insClick() {
        //this.$store.commit('switchSoicalState', 'instagram');
		this.mainClick('instagram');
      },
      wikiClick() {
        this.$store.commit('switchSoicalState', 'wikimedia');
      },
      stackClick() {
        this.$store.commit('switchSoicalState', 'stackoverflow');
      },
      flcClick() {
        this.mainClick('flickr');
      },
      sptClick() {
        this.mainClick('spotify');
      },
      redClick() {
        this.mainClick('reddit');
      },
      youClick() {
        this.mainClick('youtube');
      },
      pinClick() {
        this.mainClick('pinterest');
      },
      tumblrClick() {
        this.mainClick('tumblr');
      },
    },

    created: function(){

      this.$http.get('http://localhost:3000/checkstatus').then(response=>{
        this.loginArray = response.body.authProviders;

      }).then(() => {
        for (var key in this.loginArray) {
          if (this.loginArray[key]){
            this.$store.commit('switchSoicalState', key);
          }
        }
      });
    },
    beforeCreate: function () {
      if (!this.$store.state.currentLoggin){
        this.$store.commit('switchView', 'ls');
        this.$router.push('/login');        
      }
    }
  }
</script>

<style scoped scoped>
  button {
    background-color: white;
    border: none;
  }
  .container-fluid {
    font-size: 18px;
  }
</style>