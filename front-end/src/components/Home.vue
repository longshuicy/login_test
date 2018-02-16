<template>
  <div>
    <selfJumbotron />
    <!-- Container (About Section) -->
    <div id = "about" class="container-fluid">
      <div class="row">
        <div class="col-sm-8">
          <h2>About Social Universe Observatory</h2>
          <h4>Social Universe Observator is an online platform that helps people collecting social media data. Unlike traditional platforms, which only provides general query, social universe observatory provides data collection from general level to detailed level.</h4>      
          <p>Social - Social Media is the new place people share their lives, feelings, events and etc.</p>
          <p>Universe - Monitor multiple social media platforms is more meaningful. Different media sources of the same topic offer more valuable information.</p>
          <p>Observatory - Raw Social Media data are noisy, meaningless, and unorganized. Organize and summarize raw data, and provide different levels of observation help people to understand them better.</p>
        </div>
        <div class="col-sm-4">
          <span class="glyphicon glyphicon-duplicate logo"></span>
        </div>
      </div>
    </div>

    <div class="container-fluid bg-grey">
      <div class="row">
        <div class="col-sm-4">
          <span class="glyphicon glyphicon-tasks logo"></span>
        </div>
        <div class="col-sm-8">
          <h2>Our Goal</h2>
          <h4><strong>Collection:</strong> Collect data from different media sources.</h4>      
          <h4><strong>Parallel:</strong> Support data collection from multiple media sources in one query</h4>
          <h4><strong>Monitor:</strong> Monitor popular events on soical media. Scheule data collection.</h4>
        </div>
      </div>
    </div>

    <!-- Container (Services Section) -->
    <div id = "media" class="container-fluid text-center">
      <h2>Social Media Platforms</h2>
      <h4>What we offer</h4>
      <br>
      <div class="row">
        <div class="col-sm-4">
          <icon name="facebook-square" scale = '6' color = "#3B5998"></icon>
          <h4>FACEBOOK</h4>
        </div>
        <div class="col-sm-4">
          <icon name="twitter-square" scale = '6' color = "#4099FF"></icon>
          <h4>TWITTER</h4>
        </div>
        <div class="col-sm-4">
          <icon name="instagram" scale = '6'></icon>
          <h4>INSTAGRAM</h4>
        </div>
      </div>
      <br><br>
      <div class="row">
        <div class="col-sm-4">
          <icon name="wikipedia-w" scale = '6'></icon>
          <h4>Wikipedia</h4>
        </div>
        <div class="col-sm-4">
          <icon name="stack-overflow" scale = '6'></icon>
          <h4>Stack Overflow</h4>
        </div>
        <div class="col-sm-4">
          <icon name="flickr" scale = '6' color = "#ff0084"></icon>
          <h4>Flickr</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4">
          <icon name="spotify" scale = '6' color = "#00e461"></icon>
          <h4>Spotify</h4>
        </div>
        <div class="col-sm-4">
          <icon name="reddit-square" scale = '6' color = "#ff4500"></icon>
          <h4>Reddit</h4>
        </div>
        <div class="col-sm-4">
          <icon name="youtube-square" scale = '6' color = "#bb0000"></icon>
          <h4>Youtube</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4">
          <icon name="pinterest-square" scale = '6' color = "#cb2027"></icon>
          <h4>Pinterest</h4>
        </div>
        <div class="col-sm-4">
          <icon name="weibo" scale = '6' color = "#FF0000"></icon>
          <h4>Weibo</h4>
        </div>
        <div class="col-sm-4">
          <icon name="tumblr-square" scale = '6' color = "#32506d"></icon>
          <h4>Tumblr</h4>
        </div>
        <div class="col-sm-4">
          <icon name="gears" scale = '5' color = "#9400D3"></icon>
          <h4>More Coming...</h4>
        </div>
        
      </div>
    </div>

    <div id = "contact" class="container-fluid bg-grey">
      <h2 class="text-center">CONTACT</h2>
      <div class="row">
        <div class="col-sm-5">
          <p>Feel free to contact us with any question. We will get back ASAP</p>
          <p><span class="glyphicon glyphicon-map-marker"></span> Urbana,IL,US</p>
          <p><span class="glyphicon glyphicon-phone"></span> +1 217-111-1111</p>
          <p><span class="glyphicon glyphicon-envelope"></span> socialmonitor@gmail.com</p> 
        </div>
        <div class="col-sm-7">
          <div class="row">
            <div class="col-sm-6 form-group">
              <input class="form-control" id="name" name="name" placeholder="Name" type="text" required>
            </div>
            <div class="col-sm-6 form-group">
              <input class="form-control" id="email" name="email" placeholder="Email" type="email" required>
            </div>
          </div>
          <textarea class="form-control" id="comments" name="comments" placeholder="Comment" rows="5"></textarea><br>
          <div class="row">
            <div class="col-sm-12 form-group">
              <button class="btn btn-default pull-right" type="submit">Send</button>
            </div>
          </div> 
        </div>
      </div>
    </div>
    <div>
      <gmap-map :center="ape" :zoom="17" style="width: 100%; height: 400px">
        <gmap-marker  :position="ape" :clickable="true" :draggable="true" @click="center=ape"></gmap-marker>
      </gmap-map>
    </div>
    <footer class = "footer container-fluid text-center">
      <a href="#hahah" title="To Top">
        <span class="glyphicon glyphicon-chevron-up"></span>
      </a>
      <p>Copyright <span class="glyphicon glyphicon-copyright-mark"></span> 2017 Social Monitor, CS Dept, UIUC</p> 

    </footer>
  </div>
</template>

<script>
  import selfJumbotron from './Jumbotron';
  import selfNavbar from './Navbar';

  export default {
    name: 'home',
    data () {
      return {
        ape: {lat: 40.1138, lng: -88.2249},
      }
    },
    components: {
      'selfJumbotron' : selfJumbotron,
    },
    created: function(){
      var logginStatus;
      var username;
      this.$http.get('http://localhost:3000/isloggedIn').then(response => {
        if (response.body.status == 'OK' && response.body.username){
          this.$store.commit('switchLoggin', true);
          this.$store.commit('changeUsername', response.body.username); 
        }else{
			this.$store.commit('switchLoggin', false);
			this.$store.commit('changeUsername', null);
			this.$store.commit('switchView', 'home');
		}
      });
    }
  }
</script>

<style scoped>
  .container-fluid {
      padding: 60px 50px;
  }
  .bg-grey {
      background-color: #f6f6f6;
  }
  .logo-small {
      color: #f4511e;
      font-size: 50px;
  }
  .logo {
      color: #171E26;
      font-size: 150px;
  }
  @media screen and (max-width: 768px) {
    .col-sm-4 {
      text-align: center;
      margin: 25px 0;
    }
  }
</style>