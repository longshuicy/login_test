require('dotenv').config();
var Promise = require('promise');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  process.env.CALLBACK_URL
);

oauth2Client.setCredentials({
  access_token: process.env.YOUTUBE_ACCESS_TOKEN,
  refresh_token: process.env.YOUTUBE_REFRESH_TOKEN
});

var youtube = google.youtube({
	version: 'v3',
	auth:oauth2Client
});

function youtubeAPI(resolveName, id, args){
	return new Promise((resolve,reject) =>{
		
		switch(resolveName){
			case 'search':
				console.log(args)
				youtube.search.list({
					part: 				'id,snippet',
					key: 				config.youtube.api_key,
					maxResults:			args['maxResults'],
					order:				args['order'],
					publishedAfter:		args['publishedAfter'],
					publishedBefore:	args['publishedBefore'],
					q: 					args['q'],
					type:				args['type'],
				  }, (error, data) => {
					if (error){
						console.log(error);
						reject(error);
					}else{
						//console.log(data);
						resolve(data.items);
					}
				  });
				break;

			case 'playlist':
				youtube.playlists.list({
					part: 'contentDetails,id,player,snippet,status',
					id: id
				}, function (err, data) {
					if (err){
						console.log(err);
						reject(err);
					}else{
						//console.log(data.items);
						resolve(data.items);
					}
				});
				break;
				
			case 'channel':
				youtube.channels.list({
					part: 'invideoPromotion,brandingSettings,contentDetails,contentOwnerDetails,id,snippet,statistics,status,topicDetails',
					id: id
				}, function (err, data) {
					if (err){
						console.log(err);
						reject(err);
					}else{
						//console.log(data.items);
						resolve(data.items);
					}
				});
				break;
				
			case 'video':
				youtube.videos.list({
					part: `contentDetails,id,liveStreamingDetails,player,
					recordingDetails,snippet,statistics,status,topicDetails`,
					id: id
				}, function (err, data) {
					if (err){
						console.log(err);
						reject(err);
					}else{
						//console.log(data.items);
						resolve(data.items);
					}
				});
				break;
				
			case 'videoCommentthread':
				//console.log(args);
				youtube.commentThreads.list({
					part:'id,snippet',
					videoId: id,
					maxResults: args['maxResults'],
					searchTerms:args['searchTerms']
				}, function(err,data){
				if (err){
						console.log(err);
						reject(err);
					}else{
						//console.log(data.items);
						resolve(data.items);
					}
				});
				break;
				
			case 'channelCommentthread':
				console.log(args);
				youtube.commentThreads.list({
					part:'id,snippet',
					channelId: id,
					maxResults: args['maxResults'],
					searchTerms:args['searchTerms']
				}, function(err,data){
				if (err){
						console.log(err);
						reject(err);
					}else{
						console.log(data.items);
						resolve(data.items);
					}
				});
				break;
		}
	})
}

module.exports = youtubeAPI;