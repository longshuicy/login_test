var config = require('../config');
var Promise = require('promise');
var Weibo = require('nodeweibo');
Weibo.init({
	"appKey":config.weibo.app_key,
	"appSecret":config.weibo.app_secret,
	"redirectUrl":config.weibo.callback
});

function weiboAPI(resolveName, id, args){
	
	args["source"] = Weibo.appKey.appKey;
	args["access_token"] = config.weibo.access_token;
	//console.log(args);
	
	return new Promise((resolve,reject) =>{
		switch(resolveName){
			case 'public_timeline':
				Weibo.Statuses.public_timeline(args,function(data){
					//console.log(data.statuses);
					resolve(data.statuses);
				});
				break;
				
			case 'statuses_count':
				args['ids'] = id;
				Weibo.Statuses.count(args,function(data){
					//console.log(data);
					resolve(data);
				});
				break;
				
			case 'emotions':
				Weibo.Statuses.emotions(args,function(data){
					//console.log(data);
					resolve(data);
				});
				break;
				
			case 'comments':
				args['id'] =id;
				Weibo.Comments.show(args,function(data){
					//console.log(data.comments);
					resolve(data.comments);
				});
				break;
				
			/*case 'trend_hr':
				Weibo.Trends.hourly(args,function(data){
					console.log(data);
					resolve(data.trends);
				});
				break;*/
			
			/*case 'schools':
				Weibo.Account.profile_school_list(args,function(data){
					console.log(data);
					resolve(data);
				});
				break;*/
				
			/*case 'repost_timeline':
				args['id'] =id;
				Weibo.Statuses.repost_timeline(args,function(data){
					console.log(data);
					resolve(data.reposts);
				});
				break; only return the authenticated user's reposts, so empty list basically */
				
			/*case 'user_timeline':
				args['uid'] = id;
				console.log(args);
				Weibo.Statuses.user_timeline(args,function(data){
					console.log(data);
					resolve(data.statuses);
				});
				break; must be the current user's */
		
			default:
				console.log('sorry we can\'t find matching resolve type:' + resolveName);
				resolve(null);
		}
	});
}

module.exports = weiboAPI;