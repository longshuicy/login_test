var request = require('request');

function instagram(token, args, fname){
	
	var access_token = token.instagramaccesstoken;
	
    return new Promise((resolve, reject) =>{
        console.log(fname);
        var queryUrl = "https://api.instagram.com/v1";
        switch(fname){
            case "usersSelf":
                queryUrl = usersSelf(queryUrl);
                break;
            case "users":
                queryUrl = users(args, queryUrl);
                break;
            case "usersSearch":
                queryUrl = usersSearch(args, queryUrl);
                break;
            case "usersSelfFollows":
                queryUrl = usersSelfFollows(queryUrl);
                break;
            case "usersSelfFollowedBy":
                queryUrl = usersSelfFollowedBy(ueryUrl);
                break;
            case "usersSelfRequestedBy":
                queryUrl = usersSelfRequestedBy(queryUrl);
                break;
            case "usersRelationship":
                queryUrl = usersRelationship(args, queryUrl);
                break;
            case "mediaID":
                queryUrl = mediaID(args, queryUrl);
                break;
            case "mediaShortCode":
                queryUrl = mediaShortCode(args, queryUrl);
                break;
            case "mediaSearch":
                queryUrl = mediaSearch(args, queryUrl);
                break;
            case "comments":
                queryUrl = comments(args, queryUrl);
                break;
            case "likes":
                queryUrl = likes(args, queryUrl);
                break;
            case "tagName":
                queryUrl = tagName(args, queryUrl);
                break;
            case "tagMediaRecent":
                queryUrl = tagMediaRecent(args, queryUrl);
                break;
            case "tagSearch":
                queryUrl = tagSearch(args, queryUrl);
                break;
            case "locationID":
                queryUrl = locationID(args, queryUrl);
                break;
            case "locationMediaRecent":
                queryUrl = locationMediaRecent(args, queryUrl);
                break;
            case "locationSearch":
                queryUrl = locationSearch(args, queryUrl);
                break;
        }     

        var options = {
            method: 'GET',
            uri: queryUrl,
        };

        request(options, function(error, response){
            if(error) {
                console.log("Reuqest error")
                reject(error);
            }
            
            if(response) {
                console.log("send response data back")
                resolve(JSON.parse(response.body)); 
            }
        });
    });


	function usersSelf(queryUrl){
		queryUrl += ('/users/self/?access_token=' + access_token);
		console.log(queryUrl);
		return queryUrl
	}

	function users(args, queryUrl){
		queryUrl += '/users/' + args.user_id + '/?access_token=' + access_token;
		console.log(queryUrl);
		return queryUrl
	}

	function usersSearch(args, queryUrl){
		queryUrl += '/users/search?access_token=' + access_token;
		for(var key in args){
			queryUrl += '&' + key + '=' + encodeURIComponent(args[key]);
		}
		console.log(queryUrl);
		return queryUrl
	}

	function usersSelfFollows(queryUrl){
		queryUrl += ('/users/self/follows?access_token=' + access_token);
		console.log(queryUrl);
		return queryUrl
	}

	function usersSelfFollowedBy(queryUrl){
		queryUrl += ('/users/self/followed-by?access_token=' + access_token);
		console.log(queryUrl);
		return queryUrl
	}

	function usersSelfRequestedBy(queryUrl){
		queryUrl += ('/users/self/requested-by?access_token=' + access_token);
		console.log(queryUrl);
		return queryUrl
	}

	function usersRelationship(args, queryUrl){
		queryUrl += ('/users/' + args.user_id + "/relationship?access_token=" + access_token);
		console.log(queryUrl);
		return queryUrl
	}

	function mediaID(args, queryUrl){
		queryUrl += ('/media/' + args.media_id + "?access_token=" + access_token);
		console.log(queryUrl);
		return queryUrl
	}

	function mediaShortCode(args, queryUrl){
		queryUrl += ('/media/' + args.shortcode + "/D?access_token=" + access_token);
		console.log(queryUrl);
		return queryUrl
	}

	function mediaSearch(args, queryUrl){
		queryUrl += ('/media/search?lat=' + args.lat + "&lng=" + args.lng + "&access_token=" + access_token);
		console.log(queryUrl);
		return queryUrl
	}

	function comments(args, queryUrl){
		queryUrl += ('/media/' + args.media_id + "/comments?access_token=" + access_token);
		console.log(queryUrl);
		return queryUrl
	}

	function likes(args, queryUrl){
		queryUrl += ('/media/' + args.media_id + "/likes?access_token=" + access_token);
		console.log(queryUrl);
		return queryUrl
	}

	function tagName(args, queryUrl){
		queryUrl += ('/tags/' + args.tag_name  + '?access_token=' + access_token);
		console.log(queryUrl);
		return queryUrl
	}

	function tagMediaRecent(args, queryUrl){
		queryUrl += ('/tags/' + args.tag_name  + '/media/recent?access_token=' + access_token);
		console.log(queryUrl);
		return queryUrl
	}

	function tagSearch(args, queryUrl){
		queryUrl += ('/tags/search?q=' + args.q + '&access_token=' + access_token);
		console.log(queryUrl);
		return queryUrl
	}

	function locationID(args, queryUrl){
		queryUrl += ('/locations/' + args.location_id + '?access_token=' + access_token);
		console.log(queryUrl);
		return queryUrl
	}

	function locationMediaRecent(args, queryUrl){
		queryUrl += ('/locations/' + args.location_id + '/media/recent?access_token=' + access_token);
		console.log(queryUrl);
		return queryUrl
	}

	function locationSearch(args, queryUrl){
		queryUrl += ('/locations/search?access_token=' + access_token);
		for(var key in args){
			queryUrl += '&' + key + '=' + encodeURIComponent(args[key]);
		}
		console.log(queryUrl);
		return queryUrl
	}
}

module.exports = {
  instagram
}
