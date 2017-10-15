<!-- src/components/Graphql.vue -->
<template>
  <div>
    <form class="form-signin" v-on:submit.prevent>
        <h2 class="form-signin-heading">Please hit "Submit"</h2><br>

        <button class="btn btn-lg btn-primary btn-block" type="submit" @click = "submitTwitter()">Submit for Twitter</button>
        <button class="btn btn-lg btn-primary btn-block" type="submit" @click = "submitReddit()">Submit for Reddit</button>
		<button class="btn btn-lg btn-primary btn-block" type="submit" @click = "submitSpotify()">Submit for Spotify</button>
		<button class="btn btn-lg btn-primary btn-block" type="submit" @click = "submitInstagram()">Submit for Instagram</button>
		<button class="btn btn-lg btn-primary btn-block" type="submit" @click = "submitFlickr()">Submit for Flickr</button>
		<button class="btn btn-lg btn-primary btn-block" type="submit" @click = "submitFacebook()">Submit for Facebook</button>
		<button class="btn btn-lg btn-primary btn-block" type="submit" @click = "submitYoutube()">Submit for Youtube</button>
		<button class="btn btn-lg btn-primary btn-block" type="submit" @click = "submitPinterest()">Submit for Pinterest</button>
		<button class="btn btn-lg btn-primary btn-block" type="submit" @click = "submitTumblr()">Submit for Tumblr</button>
		
    </form>
  </div>
</template>

<script>
import createjs from 'createjs-cmd';

export default {
    name: 'graphql',
    data () {
      return{
        stage: null,
        canvas: null,
         userContainer: null,
         tweetContainer: null,
         twtEntityContainer: null,
         retweetContainer: null,
         geoContainer: null,
         rects: null,
         labels: null,

         timeline: null,
         friends: null,
         followers: null,
        
         user: null,
         entities: null,
         retweet: null,
        
         user_mentions: null,
         retweeted_status: null,
         contained_within: null,
        
         currWidth: null,
         currHeight: null,
         txt: null,
         mid: null,
         media: null,
        
         statica: null,
        
         twtUserColor: null,
         tweetColor: null,
         twtGeoColor: null,
         queryUserParameters: null,
         queryTweetParameters: null,
         queryGeoParameters: null,
         count: null,
        
         main: null,
         para: null,
         s: null,
         str: null,

         query_string_twitter: `{twitter {queryUser(q: \"bill\", count: 4, pageNum: 1) {author_id, profile_image_url}}}`,
         query_string_reddit: `{reddit{searchSubredditNames(query:"uiuc")}}`,
		 query_string_spotify:`{spotify {searchArtists(q:"Jay-z",limit:1) {href,id,name,type,uri }}}`,
		 query_string_flickr: `{flickr{recentPhotos(extras:"0",per_page:10,page:1){id,title}}}`,
		 query_string_instagram:`{instagram{usersSelf{data{id, username, full_name, profile_picture}}}}`,
		 query_string_facebook:``,
		 query_string_pinterest:``,
		 query_string_youtube:`{youtube {search(q: "panda", maxResults: 5, type: "video") {snippet {title,description}}}}`,
		 query_string_tumblr:`{tumblr {searchPosts(tag: "science", limit: 5) {type,post_url,summary}}}`
      }
    },

    methods: {
        submitTwitter(){
            this.$http.post('http://localhost:3000/twitterQuery',{query: this.query_string_twitter}).then(response=>{
                if (response.body.status == 'OK'){
                    alert(response.body.answer);
                    console.log(response.body.answer);
                }
                else{
                    alert("Looks like there is something wrong, try again!");
                }
            });
        },

        submitReddit(){
            this.$http.post('http://localhost:3000/redditQuery',{query: this.query_string_reddit}).then(response=>{
                if (response.body.status == 'OK'){
                    alert(response.body.answer);
                    console.log(response.body.answer);       
                }
                else{
                    alert("Looks like there is something wrong, try again!");
                }
            });
        },

        submitSpotify(){
            this.$http.post('http://localhost:3000/spotifyQuery',{query: this.query_string_spotify}).then(response=>{
                if (response.body.status == 'OK'){
                    alert(response.body.answer);
                    console.log(response.body.answer);
                }
                else{
                    alert("Looks like there is something wrong, try again!");
                }
            });
        },
		submitFlickr(){
            this.$http.post('http://localhost:3000/flickrQuery',{query: this.query_string_flickr}).then(response=>{
                if (response.body.status == 'OK'){
                    alert(response.body.answer);
                    console.log(response.body.answer);
                }
                else{
                    alert("Looks like there is something wrong, try again!");
                }
            });
        },
		submitInstagram(){
			this.$http.post('http://localhost:3000/instagramQuery',{query: this.query_string_instagram}).then(response=>{
                if (response.body.status == 'OK'){
                    alert(response.body.answer);
                    console.log(response.body.answer);
                }
                else{
                    alert("Looks like there is something wrong, try again!");
                }
            });
        },
		submitFacebook(){
			this.$http.post('http://localhost:3000/facebookQuery',{ query: this.query_string_facebook}).then(response=>{
                if (response.body.status == 'OK'){
                    alert(response.body.answer);
                    console.log(response.body.answer);
                }
                else{
                    alert("Looks like there is something wrong, try again!");
                }
            });
        },
		submitPinterest(){
			this.$http.post('http://localhost:3000/pinterestQuery',{query: this.query_string_pinterest}).then(response=>{
                if (response.body.status == 'OK'){
                    alert(response.body.answer);
                    console.log(response.body.answer);
                }
                else{
                    alert("Looks like there is something wrong, try again!");
                }
            });
        },
		submitYoutube(){
			this.$http.post('http://localhost:3000/youtubeQuery',{query: this.query_string_youtube}).then(response=>{
                if (response.body.status == 'OK'){
                    alert(response.body.answer);
                    console.log(response.body.answer);
                }
                else{
                    alert("Looks like there is something wrong, try again!");
                }
            });
        },
		submitTumblr(){
			this.$http.post('http://localhost:3000/tumblrQuery',{query: this.query_string_tumblr}).then(response=>{
                if (response.body.status == 'OK'){
                    alert(response.body.answer);
                    console.log(response.body.answer);
                }
                else{
                    alert("Looks like there is something wrong, try again!");
                }
            });
        },

      handleMouseOver(event){
        event.target.alpha = ((event.type=="mouseover") ? 0.75 : 0.5);
      },

      handleClickQueryUser(){
        this.stage.removeAllChildren();
        this.stage.addChild(this.media, this.statica);

        var circle = new createjs.Shape();
        circle.graphics.beginFill(this.twtUserColor).drawCircle(0, 0, 65);
        circle.x = 250;
        circle.y = 180;
        circle.alpha = 0.5;
        circle.on("mouseover", this.handleMouseOver);
        circle.on("mouseout", this.handleMouseOver);
        circle.on("click", this.drawTwtUserFields);
        
        var label = new createjs.Text("queryUser", "20px Arial", "#000");
        label.x = circle.x - 50;
        label.y = circle.y - 35;
        
        this.txt = "{ twitter{ queryUser(q:&quot;&quot; count:3 page:5){ } } }";
        this.para.innerHTML = this.txt;
        
        this.stage.addChild(circle, label);
        this.stage.update();
        
        this.queryTweetParameters.style.display = "none";
        this.queryGeoParameters.style.display = "none";
        this.queryUserParameters.style.display = "inline";
      },

      handleClickQueryTweet(){
        this.stage.removeAllChildren();
        this.stage.addChild(this.media, this.statica);
        this.queryUserParameters.style.display = "none";
        
        var circle = new createjs.Shape();
        console.log(this.tweetColor); // => 'updated'
        circle.graphics.beginFill(this.tweetColor).drawCircle(0, 0, 65);
        circle.x = 250;
        circle.y = 180;
        circle.alpha = 0.5;
        circle.on("mouseover", this.handleMouseOver);
        circle.on("mouseout", this.handleMouseOver);
        circle.on("click", this.drawTweetFields);
        
        var label = new createjs.Text("queryTweet", "20px Arial", "#000");
        label.x = circle.x - 50;
        label.y = circle.y - 35;
        
        this.txt = "{ twitter{ queryTweet(q:&quot;&quot; count:3 result_type:&quot;mixed&quot; ){ } } }";
        this.para.innerHTML = this.txt;
        
        this.stage.addChild(circle, label);
        this.stage.update();
        
        this.queryUserParameters.style.display = "none";
        this.queryGeoParameters.style.display = "none";
        this.queryTweetParameters.style.display = "inline";
      },

      handleClickQueryGeo(){
        this.stage.removeAllChildren();
        this.stage.addChild(this.media, this.statica);
        var circle = new createjs.Shape();
        circle.graphics.beginFill(this.twtGeoColor).drawCircle(0, 0, 65);
        circle.x = 250;
        circle.y = 180;
        circle.alpha = 0.5;
        circle.on("mouseover", this.handleMouseOver);
        circle.on("mouseout", this.handleMouseOver);
        circle.on("click", this.drawTwtGeoFields);
        
        var label = new createjs.Text("queryGeo", "20px Arial", "#000");
        label.x = circle.x - 50;
        label.y = circle.y - 35;
        
        this.txt = "{\n  twitter{\n    queryGeo(){\n" + this.mid + "    }\n  }\n}";
        this.para.innerHTML = this.txt;
        
        this.stage.addChild(circle, label);
        this.stage.update();
        
        this.queryUserParameters.style.display = "none";
        this.queryTweetParameters.style.display = "none";
        this.queryGeoParameters.style.display = "inline";
      },

      addSmallCircle(x, y, name, container){
        var circle = new createjs.Shape();
        circle.graphics.beginFill("grey").drawCircle(0, 0, 15);
        circle.name = name;
        var label = new createjs.Text(name, "11px Arial", "#000");
        circle.x = label.x = x;
        circle.y = label.y = y;
        circle.alpha = 0.5;
        circle.on("click", this.changeQuery);
        container.addChild(circle, label);
      },

      changeQuery(event){
        event.target.alpha = 1.5 - event.target.alpha;
        var str = this.para.innerHTML;
        var field = event.target.name;
        if(event.target.alpha == 1){
            this.mid += field + " ";
        }
        else{
            var i = this.mid.indexOf(field);
            this.mid = this.mid.substring(0, i) + this.mid.substring(i+field.length);
        }
        
        var before = str.lastIndexOf("{");
        var after = str.indexOf("}");
        this.para.innerHTML = str.substring(0, before+2) + this.mid + str.substring(after);
        this.stage.update();
      },

      addBigCircle(x, y, name, color){
        
        if(x > this.currWidth - 55){
            this.resizeWidth();
        }
        if(y > this.currHeight){
            this.resizeHeight();
        }
        
        var circle = new createjs.Shape();
        circle.graphics.beginFill(color).drawCircle(0, 0, 65);
        circle.alpha = 0.5;
        circle.on("mouseover", this.handleMouseOver);
        circle.on("mouseout", this.handleMouseOver);
        
        var label = new createjs.Text(name, "20px Arial", "#000");
        
        circle.x = x;
        circle.y = y;
        label.x = x - 30;
        label.y = y - 30;
        
        switch(name){
            case "timeline":
                circle.on("click", this.handleClickTimeline);
                this.timeline = new createjs.Container();
                this.timeline.addChild(circle, label);
                this.stage.addChild(this.timeline);
                this.addParaCount(x,y,name);
                break;
            
            case "friends":
                circle.on("click", this.handleClickFriends);
                this.friends = new createjs.Container();
                this.friends.addChild(circle, label);
                this.stage.addChild(this.friends);
                this.addParaCount(x,y,name);
                break;
                
            case "followers":
                circle.on("click", this.handleClickFollowers);
                this.followers = new createjs.Container();
                this.followers.addChild(circle, label);
                this.stage.addChild(this.followers);
                this.addParaCount(x,y,name);
                break;
                
            case "user":
                circle.on("click", this.handleClickUser);
                this.user = new createjs.Container();
                this.user.addChild(circle, label);
                this.stage.addChild(this.user);
                break;
                
            case "entities":
                circle.on("click", this.handleClickEntities);
                this.entities = new createjs.Container();
                this.entities.addChild(circle, label);
                this.stage.addChild(this.entities);
                break;
                
            case "retweet":
                circle.on("click", this.handleClickRetweet);
                this.retweet = new createjs.Container();
                this.retweet.addChild(circle, label);
                this.stage.addChild(this.retweet);
                this.addParaCount(x,y,name);
                break;
                
            case "user_mentions":
                circle.on("click", this.handleClickUserMentions);
                this.user_mentions = new createjs.Container();
                this.user_mentions.addChild(circle, label);
                this.stage.addChild(this.user_mentions);
                break;
                
            case "retweeted_status":
                circle.on("click", handleClickRetweetedStatus);
                this.retweeted_status = new createjs.Container();
                this.retweeted_status.addChild(circle, label);
                this.stage.addChild(this.retweeted_status);
                break;
                
            case "contained_within":
                circle.on("click", handleClickContainedWithin);
                this.contained_within = new createjs.Container();
                label.x = x - 65;
                label.y = y - 10;
                this.contained_within.addChild(circle, label);
                this.stage.addChild(this.contained_within);
                break;
        }
      },

      addParaCount(x, y, name){
        var newele = this.queryUserParameters.cloneNode(false);
        newele.style.display = "inline";
        newele.style.left = ""+ (x-5) +"px";
        newele.style.top = ""+ (y+5) +"px";
        var cl = this.count.cloneNode(false);
        cl.id += name
        var txtNode = document.createTextNode("count:");
        var ipt = document.createElement("INPUT");
        ipt.setAttribute("type", "number");
        ipt.setAttribute("value", 3);
        ipt.setAttribute("min", 0);
        ipt.style.width = "25%";
        ipt.setAttribute("onchange", "getCount(this.value)");
        cl.appendChild(txtNode);
        cl.appendChild(ipt);
        newele.appendChild(cl);
        this.main.appendChild(newele);
      },

      addArrow(fromx, fromy, tox, toy, container){
        var lineShape = new createjs.Shape();
        lineShape.graphics.setStrokeStyle(1).beginStroke("black").moveTo(fromx, fromy).lineTo(tox, toy);
        container.addChild(lineShape);
        
      },

      drawTwtUserFields(event){
        
        var obj = event.target;
        
        this.addBigCircle(obj.x + 300, obj.y, "timeline", this.tweetColor);
        this.addArrow(obj.x + 65, obj.y, obj.x + 235, obj.y, this.timeline);
        
        this.addBigCircle(obj.x + 212, obj.y + 212, "friends", this.twtUserColor);
        this.addArrow(obj.x + 44, obj.y + 44, obj.x + 166, obj.y + 166, this.friends);
        
        this.addBigCircle(obj.x, obj.y + 300, "followers", "red");
        this.addArrow(obj.x, obj.y + 65, obj.x, obj.y + 235, this.followers);
        
        this.userContainer = new createjs.Container();
        
        // 16 basic fields
        this.addSmallCircle(obj.x, obj.y - 95, "id", this.userContainer);
        this.addSmallCircle(obj.x + 36, obj.y - 88, "id_str", this.userContainer);
        this.addSmallCircle(obj.x + 67, obj.y - 67, "name", this.userContainer);
        this.addSmallCircle(obj.x + 88, obj.y - 36, "screen_name", this.userContainer);
        this.addSmallCircle(obj.x + 95, obj.y, "description", this.userContainer);
        this.addSmallCircle(obj.x + 88, obj.y + 36, "created_at", this.userContainer);
        this.addSmallCircle(obj.x + 67, obj.y + 67, "profile_image_url", this.userContainer);
        this.addSmallCircle(obj.x + 36, obj.y + 88, "url", this.userContainer);
        this.addSmallCircle(obj.x, obj.y + 95, "location", this.userContainer);
        this.addSmallCircle(obj.x - 36, obj.y + 88, "tweets_count", this.userContainer);
        this.addSmallCircle(obj.x - 67, obj.y + 67, "followers_count", this.userContainer);
        this.addSmallCircle(obj.x - 88, obj.y + 36, "friends_count", this.userContainer);
        this.addSmallCircle(obj.x - 95, obj.y, "listed_count", this.userContainer);
        this.addSmallCircle(obj.x - 88, obj.y - 36, "favourites_count", this.userContainer);
        this.addSmallCircle(obj.x - 67, obj.y - 67, "statuses_count", this.userContainer);
        this.addSmallCircle(obj.x - 36, obj.y - 88, "time_zone", this.userContainer);
        
        this.stage.addChild(this.userContainer);
        this.stage.update();
      },

      drawTwtGeoFields(event){
        var obj = event.target;
        this.addBigCircle(obj.x + 300, obj.y, "contained_within", this.twtGeoColor);
        this.addArrow(obj.x + 65, obj.y, obj.x + 235, obj.y, this.contained_within);
        
        this.geoContainer = new createjs.Container();
        // 8 basic fields
        this.addSmallCircle(obj.x, obj.y - 95, "attributes", this.geoContainer);
        this.addSmallCircle(obj.x + 67, obj.y - 67, "country", this.geoContainer);
        this.addSmallCircle(obj.x + 95, obj.y, "country_code", this.geoContainer);
        this.addSmallCircle(obj.x + 67, obj.y + 67, "full_name", this.geoContainer);
        this.addSmallCircle(obj.x, obj.y + 95, "id", this.geoContainer);
        this.addSmallCircle(obj.x - 67, obj.y + 67, "name", this.geoContainer);
        this.addSmallCircle(obj.x - 95, obj.y, "place_type", this.geoContainer);
        this.addSmallCircle(obj.x - 67, obj.y - 67, "url", this.geoContainer);
        this.stage.addChild(this.geoContainer);
        this.stage.update();
        
      },

      addBigToQuery(field){
        this.mid = " ";
        var str = this.para.innerHTML;
        var i = str.indexOf("}");
        this.para.innerHTML = str.substring(0,i) + field + "{ }" + str.substring(i);
      },

      handleClickTimeline(event){
        this.stage.removeChild(this.userContainer);
        this.stage.removeChild(this.friends);
        this.stage.removeChild(this.followers);
        this.stage.update();
        
        this.addBigToQuery("timeline(count:3)");
        
        this.drawTweetFields(event);
      },

      handleClickFriends(event){
        this.stage.removeChild(this.userContainer);
        this.stage.removeChild(this.timeline);
        this.stage.removeChild(this.followers);
        this.stage.update();
        
        this.addBigToQuery("friends(count:3)");
        
        this.drawTwtUserFields(event);
      },

      handleClickFollowers(event){
        this.stage.removeChild(this.userContainer);
        this.stage.removeChild(this.timeline);
        this.stage.removeChild(this.friends);
        this.stage.update();
        
        this.addBigToQuery("followers(count:3)");
        this.drawTwtUserFields(event);
      },

      handleClickUser(event){
        this.stage.removeChild(this.tweetContainer);
        this.stage.removeChild(this.entities);
        this.stage.removeChild(this.retweet);
        this.stage.update();
        this.drawTwtUserFields(event);
      },

      handleClickEntities(event){
        this.stage.removeChild(this.tweetContainer);
        this.stage.removeChild(this.user);
        this.stage.removeChild(this.etweet);
        this.stage.update();
        this.addBigToQuery("entities");
        this.drawTwtEntityFields(event);
      },

      handleClickRetweet(event){
        this.stage.removeChild(this.tweetContainer);
        this.stage.removeChild(this.user);
        this.stage.removeChild(this.entities);
        this.stage.update();
        this.addBigToQuery("retweet(count:3)");
        this.drawRetweetFields(event);
      },

      handleClickUserMentions(event){
        this.stage.removeChild(this.twtEntityContainer);
        this.stage.update();
        this.addBigToQuery("user_mentions");
        this.drawTwtUserFields(event);
      },

      handleClickRetweetedStatus(event){
        this.stage.removeChild(this.retweetContainer);
        this.stage.removeChild(this.entities);
        this.stage.removeChild(this.user);
        this.stage.update();
        this.drawTweetFields(event);       
      },

      handleClickContainedWithin(event){
        this.stage.removeChild(this.geoContainer);
        this.stage.update();
        this.drawTwtGeoFields(event);
      },

      drawTweetFields(event){
        
        var obj = event.target;
        
        this.addBigCircle(obj.x + 300, obj.y, "user", "red");
        this.addArrow(obj.x + 65, obj.y, obj.x + 235, obj.y, this.user);
        
        this.addBigCircle(obj.x + 212, obj.y + 212, "entities", "yellow");
        this.addArrow(obj.x + 44, obj.y + 44, obj.x + 166, obj.y + 166, this.entities);
        
        this.addBigCircle(obj.x, obj.y + 300, "retweet", "green");
        this.addArrow(obj.x, obj.y + 65, obj.x, obj.y + 235, this.retweet);
        this.tweetContainer = new createjs.Container();
        
        // 8 basic fields
        this.addSmallCircle(obj.x, obj.y - 95, "id", this.tweetContainer);
        this.addSmallCircle(obj.x + 67, obj.y - 67, "id_str", this.tweetContainer);
        this.addSmallCircle(obj.x + 95, obj.y, "created_at", this.tweetContainer);
        this.addSmallCircle(obj.x + 67, obj.y + 67, "text", this.tweetContainer);
        this.addSmallCircle(obj.x, obj.y + 95, "retweet_count", this.tweetContainer);
        this.addSmallCircle(obj.x - 67, obj.y + 67, "in_reply_to_user_id_str", this.tweetContainer);
        this.addSmallCircle(obj.x - 95, obj.y, "in_reply_to_status_id_str", this.tweetContainer);
        this.addSmallCircle(obj.x - 67, obj.y - 67, "in_reply_to_screen_name", this.tweetContainer);
        
        this.stage.addChild(this.tweetContainer);
        this.stage.update();
      },

      drawTwtEntityFields(event){
        var obj = event.target;
        
        this.addBigCircle(obj.x + 300, obj.y, "user_mentions", "red");
        this.addArrow(obj.x + 65, obj.y, obj.x + 235, obj.y, this.user_mentions);
        
        this.twtEntityContainer = new createjs.Container();
        
        // 2 basic fields
        this.addSmallCircle(obj.x, obj.y - 95, "urls", this.twtEntityContainer);
        this.addSmallCircle(obj.x - 95, obj.y, "hashtags", this.twtEntityContainer);
        
        this.stage.addChild(this.twtEntityContainer);
        this.stage.update();
      },

      drawRetweetFields(event){
        var obj = event.target;
        
        this.addBigCircle(obj.x + 300, obj.y, "entities", "yellow");
        this.addArrow(obj.x + 65, obj.y, obj.x + 235, obj.y, this.entities);
        
        this.addBigCircle(obj.x + 212, obj.y + 212, "retweeted_status", "#1e90ff");
        this.addArrow(obj.x + 44, obj.y + 44, obj.x + 166, obj.y + 166, this.retweeted_status);
        
        this.addBigCircle(obj.x, obj.y + 300, "user", "red");
        this.addArrow(obj.x, obj.y + 65, obj.x, obj.y + 235, this.user);
        
        this.retweetContainer = new createjs.Container();
        
        // 9 basic fields
        this.addSmallCircle(obj.x, obj.y - 95, "id", this.retweetContainer);
        this.addSmallCircle(obj.x + 61, obj.y - 73, "id_str", this.retweetContainer);
        this.addSmallCircle(obj.x + 94, obj.y - 16, "text", this.retweetContainer);
        this.addSmallCircle(obj.x + 82, obj.y + 48, "created_at", this.retweetContainer);
        this.addSmallCircle(obj.x + 32, obj.y + 89, "in_reply_to_status_id_str", this.retweetContainer);
        this.addSmallCircle(obj.x - 32, obj.y + 89, "in_reply_to_user_id_str", this.retweetContainer);
        this.addSmallCircle(obj.x - 82, obj.y + 48, "in_reply_to_screen_name", this.retweetContainer);
        this.addSmallCircle(obj.x - 94, obj.y - 16, "favorite_count", this.retweetContainer);
        this.addSmallCircle(obj.x - 61, obj.y - 73, "retweet_count", this.retweetContainer);
        
        this.stage.addChild(this.retweetContainer);
        this.stage.update();
      },

      resizeWidth(){
        this.canvas = document.getElementById("myCanvas");
        this.canvas.width = 2 * this.canvas.width;
        this.currWidth = this.canvas.width;
        alert("width resize to " + this.currWidth);
      },

      resizeHeight(){
        this.canvas = document.getElementById("myCanvas");
        this.canvas.height = 2 * this.canvas.height;
        this.currHeight = this.canvas.height;
        alert("height resize to " + this.currHeight);
      },

      getKeyword(val){
        this.s = document.getElementById("string");
        this.str = this.s.innerHTML;
        var before = this.str.indexOf("q:");
        var after = this.str.indexOf(" count");
        this.s.innerHTML = this.str.substring(0, before+3) + val + this.str.substring(after-1);
      },

      getCount(val){
        // this.s = document.getElementById("string");
        // this.str = this.s.innerHTML;
        // var before = this.str.indexOf("count:");
        // var after = this.str.indexOf(" page:");
        // this.s.innerHTML = this.str.substring(0, before+6) + val + this.str.substring(after);
        alert("fuck!");
        alert(val);
      },

      getPage(val){
        this.s = document.getElementById("string");
        this.str = this.s.innerHTML;
        var before = this.str.indexOf("page:");
        var after = this.str.indexOf(")");
        this.s.innerHTML = this.str.substring(0, before+5) + val + this.str.substring(after);
      },

      getCountTweet(val){
        this.s = document.getElementById("string");
        this.str = this.s.innerHTML;
        var before = this.str.indexOf("count:");
        var after = this.str.indexOf(' ', before+6);
        this.s.innerHTML = this.str.substring(0, before+6) + val + this.str.substring(after);
      },

      getType(val){
        this.s = document.getElementById("string");
        this.str = this.s.innerHTML;
        var before = this.str.indexOf("type");
        var after = this.str.indexOf('"', before+6);
        this.s.innerHTML = this.str.substring(0, before+6) + val + this.str.substring(after);
      },

      getOptionalParas(key, val){
        this.s = document.getElementById("string");
        this.str = this.s.innerHTML;
        if(this.str.indexOf(key) == -1){
            var i = this.str.indexOf(")");
            this.s.innerHTML = this.str.substring(0, i) + key + "&quot;" + val + "&quot; " + this.str.substring(i);
        }
        else{
            var before = this.str.indexOf(key);
            var after = this.str.indexOf('"', before+key.length+1);
            this.s.innerHTML = this.str.substring(0, before+key.length+1) + val + this.str.substring(after);
        }
      },

    },

    // mounted: function(){
    //     this.currWidth = 1200;
    //     this.currHeight = 550;
    //     this.canvas = document.getElementById("myCanvas");
        
    //     this.count = document.getElementById("common");
        
    //     this.queryUserParameters = document.getElementById("user");
    //     this.queryTweetParameters = document.getElementById("tweet");
    //     this.queryGeoParameters = document.getElementById("geo");
        
    //     this.main = document.getElementById("main");
        
    //     this.stage = new createjs.Stage("myCanvas");
    //     this.stage.enableMouseOver(10);
        
    //     this.twtUserColor = "#ff1e90";
    //     this.tweetColor = "#1e90ff";
    //     this.twtGeoColor = "#ffff1e";
        
    //     var rect0 = new createjs.Shape();
    //     rect0.on("click", this.handleClickQueryUser);
    //     var rect1 = new createjs.Shape();
    //     rect1.on("click", this.handleClickQueryTweet);
    //     var rect2 = new createjs.Shape();
    //     rect2.on("click", this.handleClickQueryGeo);
        
    //     this.statica = new createjs.Container();
        
    //     this.rects = [rect0, rect1, rect2];
    //     for(var i = 0; i < this.rects.length; i++){
    //         this.rects[i].x = 160 + 150 * i;
    //         this.rects[i].y = 20;
    //         this.rects[i].graphics.beginFill("blue").drawRect(0, 0, 100, 50);
    //         this.rects[i].alpha = 0.4;
    //         this.statica.addChild(this.rects[i]);
    //     }
        
    //     var label0 = new createjs.Text("queryUser", "20px Arial", "black");
    //     var label1 = new createjs.Text("queryTweet", "19px Arial", "black");
    //     var label2 = new createjs.Text("queryGeo", "20px Arial", "black");
    //     this.labels = [label0, label1, label2];
    //     for(var i = 0; i < this.rects.length; i++){
    //         this.labels[i].x = this.rects[i].x;
    //         this.labels[i].y = this.rects[i].y + 10;
    //         this.statica.addChild(this.labels[i]);
    //     }
        
    //     this.stage.addChild(this.statica);
        
    //     this.txt = "{twitter{ }}";
    //     this.mid = " ";
        
    //     this.media = new createjs.Text("stackExchange\n\nmediaWiki\n\ninstagram\n\npinterest\n\ntwitter\n\nfacebook\n\nflickr\n\nspotify\n\nyoutube\n\nreddit\n\nweibo\n\ntumblr", "15px Arial", "black");
    //     this.media.x = 20;
    //     this.media.y = 120;
        
    //     // display query string below canvas
    //     this.para = document.getElementById("string");
    //     var txtNode = document.createTextNode(this.txt);
    //     this.para.appendChild(txtNode);
    //     this.main.appendChild(this.para);
            
    //     this.stage.addChild(this.media);
   
    //     this.stage.update();
    //     createjs.Ticker.addEventListener("tick", this.stage);
    //     // this.$nextTick(function () {
    //     //     console.log(this.twtUserColor) // => 'updated'
    //     // });
    //   },
  }
</script>

<style scoped>

canvas{
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    border: 5px solid #d3d3d3;
}

p{
    margin-top: 2px;
    margin-bottom: 2px;
}

#user{
    display: none;
    position: absolute;
    z-index: 1;
    left: 240px;
    top: 180px;
    width: 120px;
    height: 10px;
}

#tweet, #geo{
    display: none;
    position: absolute;
    z-index: 1;
    left: 240px;
    top: 180px;
    width: 120px;
    height: 60px;
    overflow: auto;
}
</style>
