var Promise = require('promise');
require('dotenv').config();
var tumblr = require('tumblr.js');
var client = tumblr.createClient({
	credentials:{
		consumer_key:		process.env.TUMBLR_CONSUMER_KEY,
		consumer_secret:	process.env.TUMBLR_CONSUMER_SECRET,
		token:				process.env.TUMBLR_ACCESS_TOKEN,
		token_secret:		process.env.TUMBLR_ACCESS_TOKEN_SECRET
	},
	returnPromises:true,
});

function tumblrAPI(resolveName, id, args){
	return new Promise((resolve,reject) =>{
		switch(resolveName){
			case 'tagged':
				client.taggedPosts(args['tag'],args).then(function(resp){
					//console.log(resp)
					resolve(resp);
				})
				.catch(function(err){
					console.log(err);
					reject(err);
				});
				break;
				
			case 'blogInfo':
				client.blogInfo(id).then(function(resp){
					//console.log(resp.blog);
					resolve(resp.blog);
				})
				.catch(function(err){
					console.log(err);
					reject(err);
				});
				break;
			
			case 'blogLikes':
				client.blogLikes(id,args).then(function(resp){
					//console.log(resp.blog);
					resolve(resp.liked_posts);
				})
				.catch(function(err){
					console.log(err);
					reject(err);
				});
				break;
				
			case 'blogPosts':
				client.blogPosts(id,args).then(function(resp){
					//console.log(resp.blog);
					resolve(resp.posts);
				})
				.catch(function(err){
					console.log(err);
					reject(err);
				});
				break;
				
			default:
				console.log('sorry we can\'t find matching resolve type:' + resolveName);
				resolve(null);
		}
	});
}

module.exports = tumblrAPI;