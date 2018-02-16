<!-- src/components/Home.vue -->
<template>
  <div class="container-fluid">
    <div class = "row">
      <div class="panel panel-default">
        <div class="panel-heading">Instruction</div>
        <div class="panel-body">
			<p>1. To use our platform, users need to log in social platforms with their own accounts and give us permission to access their account information.</p>
			<p>2. Click on social platforms, which you want use, in the Unauthorized panel and log in with your own account.</p>
			<p>3. Once you successfully logged in, the corresponding social media logo will disappear from the Unauthorized panel and appear in the Authorized panel.</p>
			<p>4. Once you successfully logged in, you can submit request for data on that specific social media platform in the Retreive Social Media Data panel.</p>
		</div>
      </div>
    </div>
    <div class = "row">
      <div class="col-sm-4 pull-left">
        <div >
          <h2> Unauthorized Panel</h2>
        </div>
        <div class="row">
          <div @click = "twClick()" v-if = "!loginArray['twitter']" class="col-sm-4">
            <icon name="twitter-square" scale = '5' color = "#4099FF"></icon>
            <h4>TWITTER</h4>
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
          <div v-if="loginArray['twitter']" class="col-sm-4">
            <icon name="twitter-square" scale = '5' color = "#4099FF"></icon>
            <h4>TWITTER</h4>
          </div>
          <div v-if="loginArray['flickr']" class="col-sm-4">
            <icon name="flickr" scale = '5' color = "#ff0084"></icon>
            <h4>Flickr</h4>
          </div>
          <div v-if="loginArray['spotify']" class="col-sm-4">
            <icon name="spotify" scale = '5' color = "#00e461"></icon>
            <h4>Spotify</h4>
          </div>
          <div v-if="loginArray['reddit']" class="col-sm-4">
            <icon name="reddit-square" scale = '5' color = "#ff4500"></icon>
            <h4>Reddit</h4>
          </div>
          <div v-if="loginArray['youtube']" class="col-sm-4">
            <icon name="youtube-square" scale = '5' color = "#bb0000"></icon>
            <h4>Youtube</h4>
          </div>
          <div v-if="loginArray['tumblr']" class="col-sm-4">
            <icon name="tumblr-square" scale = '5' color = "#32506d"></icon>
            <h4>Tumblr</h4>
          </div>
        </div>
      </div>
    </div>
	
	<div class="row">
		<form class="form-signin" v-on:submit.prevent>
			<h2 class="form-signin-heading">Retreive Social Media Data</h2><br>
			<div style="margin:20px 20px;">
				<button class="btn btn-primary" v-if="loginArray['twitter']" type="submit" @click="submitQuery(query_string_twitter, 'twitter')">Download Twitter Data</button>
				<button class="btn btn-success" v-if="loginArray['twitter']" type="submit" @click="postToDatabase(query_string_twitter, 'twitter')">Ingest Twitter Data</button>
			</div>
			<div style="margin:20px 20px;">
				<button class="btn btn-primary" v-if="loginArray['reddit']" type="submit" @click="submitQuery(query_string_reddit, 'reddit')">Download Reddi Data</button>
				<button class="btn btn-success" v-if="loginArray['reddit']" type="submit" @click="postToDatabase(query_string_reddit, 'reddit')">Ingest Reddi Data</button>
			</div>
			<div style="margin:20px 20px;">
				<button class="btn btn-primary" v-if="loginArray['spotify']" type="submit" @click="submitQuery(query_string_spotify, 'spotify')">Download Spotify Data</button>
				<button class="btn btn-success" v-if="loginArray['spotify']" type="submit" @click="postToDatabase(query_string_spotify, 'spotify')">Ingest Spotify Data</button>
			</div>
			<div style="margin:20px 20px;">
				<button class="btn btn-primary" v-if="loginArray['flickr']" type="submit" @click="submitQuery(query_string_flickr, 'flickr')">Download Flickr Data</button>
				<button class="btn btn-success" v-if="loginArray['flickr']" type="submit" @click="postToDatabase(query_string_flickr, 'flickr')">Ingest Flickr Data</button>
			</div>
			<div style="margin:20px 20px;">
				<button class="btn btn-primary" v-if="loginArray['youtube']" type="submit" @click="submitQuery(query_string_youtube, 'youtube')"">Download Youtube Data</button>
				<button class="btn btn-success" v-if="loginArray['youtube']" type="submit" @click="postToDatabase(query_string_youtube, 'youtube')"">Ingest Youtube Data</button>
			</div>
			<div style="margin:20px 20px;">
				<button class="btn btn-primary" v-if="loginArray['tumblr']" type="submit" @click="submitQuery(query_string_tumblr, 'tumblr')">Download Tumblr Data</button>
				<button class="btn btn-success" v-if="loginArray['tumblr']" type="submit" @click="postToDatabase(query_string_tumblr, 'tumblr')">Ingest Tumblr Data</button>
			</div>
		</form>
	  </div>
	
  </div>
</template>

<script>
  import { mapState } from 'vuex';


  export default {
    name: 'dashboard',
    data () {
      return{
        loginArray: {
		'twitter': false, 
		'flickr': false, 
		'spotify': false, 
		'reddit': false, 
		'youtube': false, 
		'tumblr': false},
		
		query_string_twitter: `{twitter {queryTweet(q: \"uiuc\", count: 100, pages: 1) 
    {
      id, 
      text,
      user{
        author_id,
        name,
        screen_name
      },
      retweet(count: 10) {
            id, 
            text, 
            user{
                author_id,
                name,
                screen_name
            }
      }}}}`,

        query_string_reddit: `{reddit{searchSubredditNames(query:"uiuc")}}`,
		query_string_spotify:`{spotify {searchArtists(q:"Jay-z",limit:1) {href,id,name,type,uri }}}`,
		query_string_flickr: `{flickr{recentPhotos(extras:"0",per_page:10,page:1){id,title}}}`,
		query_string_youtube:`{youtube {search(q: "panda", maxResults: 5, type: "video") {snippet {title,description}}}}`,
		query_string_tumblr:`{tumblr {searchPosts(tag: "science", limit: 5) {type,post_url,summary}}}`
		
      }
    },
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
      twClick() {
        this.mainClick('twitter');
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
      tumblrClick() {
        this.mainClick('tumblr');
      },
	  
		//Create a Blob and invoke a event to download it
		downloadData(answer,platform){
			const data = answer;
			const blob = new Blob([data], {type: 'text/json'})
			const e = document.createEvent('MouseEvents'),
			a = document.createElement('a');
			a.download = platform + ".json";
			a.href = window.URL.createObjectURL(blob);
			a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
			e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			a.dispatchEvent(e);
		},

		submitQuery(query, platform){
			this.$http.post('http://localhost:3000/' + platform +'Query',{query: query}).then(response=>{
				if (response.body.status == 'OK'){
					this.downloadData(response.body.answer, platform);
				}
				else{
					alert("Looks like there is something wrong, try again!");
				}
			});
		},
		
		postToDatabase(query,platform){
			// in the backend server:
			// I will post the json object, username, password-hash (as identifier) to your endpoint
			// you should enable cross-origin
			
			this.$http.post('http://localhost:3000/' + platform +'Ingest',
			{query: query, platform:platform}).then(response=>{
				if (response.body.status == 'OK'){
					// alert('Successfully ingest the data to the database');
                    window.location.href = response.body.url;
				}
				else{
					alert("Looks like there is something wrong, try again!");
				}
			});			
		}
		
    },

    created: function(){
		// check login status
		var logginStatus;
		var username;
		this.$http.get('http://localhost:3000/isloggedIn').then(response => {
			if (response.body.status == 'OK' && response.body.username){
				this.$store.commit('switchLoggin', true);
				this.$store.commit('changeUsername', response.body.username); 
			}else{
				this.$store.commit('switchLoggin', false);
				this.$store.commit('changeUsername', null);
				this.$store.commit('switchView', 'ls');
				this.$router.push('/login');
			}
		});
		
		// check social media platform status
		this.$http.get('http://localhost:3000/checkstatus').then(response=>{
			this.loginArray = response.body.authProviders;
		  })
		}
  }
</script>

<style scoped scoped>
  .container-fluid {
    font-size: 18px;
  }
</style>