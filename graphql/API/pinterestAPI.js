var request = require('request');
require('dotenv').config();

var access_token = process.env.PINTEREST_ACCESS_TOKEN;


function pinterest(args, fname){
    return new Promise((resolve, reject) =>{
        console.log("In PInterest API, switch functionality now");
        console.log(fname);
        var queryUrl = "https://api.pinterest.com/v1";
        switch(fname){
            case "pUserRoot":
                queryUrl = pUserRoot(args, queryUrl);
                break;
            case "pSelfBoards":
                queryUrl = pSelfBoards(args, queryUrl);
                break;
            case "pSelfBoardsSuggested":
                queryUrl = pSelfBoardsSuggested(args, queryUrl);
                break;
            case "pSelfFollower":
                queryUrl = pSelfFollower(args, queryUrl);
                break;
            case "pSelfFollowingBoards":
                queryUrl = pSelfFollowingBoards(args, queryUrl);
                break;
            case "pSelfInterests":
                queryUrl = pSelfInterests(args, queryUrl);
                break;
            case "pSelfFollowing":
                queryUrl = pSelfFollowing(args, queryUrl);
                break;
            case "pSelfLikes":
                queryUrl = pSelfLikes(args, queryUrl);
                break;
            case "pSelfPins":
                queryUrl = pSelfPins(args, queryUrl);
                break;
            case "pSearchBoards":
                queryUrl = pSearchBoards(args, queryUrl);
                break;
            case "pSearchPins":
                queryUrl = pSearchPins(args, queryUrl);
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
}

function selfEncode(args){
	var ret = ''

	for(var key in args){
		if(args[key] && key != 'query')
			ret += key + '%2C';
	}

	return ret.substring(0, ret.length-3);
}

function queryEncode(query){
	var ret = 'query=';
	query = query.split(' ');
	for(i = 0; i < query.length; i++){
		ret += query[i] + '+';
	}

	return ret.substring(0, ret.length-1);
}

function pUserRoot(args, queryUrl){
    queryUrl += ('/me/?access_token=' + access_token );
    var para = selfEncode(args);
    if(para != ''){
    	queryUrl += '&fields='
    	queryUrl += para
    }
    console.log(queryUrl);
    return queryUrl
}

function pSelfBoards(args, queryUrl){
    queryUrl += ('/me/boards/?access_token=' + access_token );
    var para = selfEncode(args);
    if(para != ''){
    	queryUrl += '&fields='
    	queryUrl += para
    }
    console.log(queryUrl);
    return queryUrl
}

function pSelfBoardsSuggested(args, queryUrl){
    queryUrl += ('/me/boards/suggested/?access_token=' + access_token );
    var para = selfEncode(args);
    if(para != ''){
    	queryUrl += '&fields='
    	queryUrl += para
    }
    console.log(queryUrl);
    return queryUrl
}

function pSelfFollower(args, queryUrl){
    queryUrl += ('/me/followers/?access_token=' + access_token );
    var para = selfEncode(args);
    if(para != ''){
    	queryUrl += '&fields='
    	queryUrl += para
    }
    console.log(queryUrl);
    return queryUrl
}

function pSelfFollowingBoards(args, queryUrl){
    queryUrl += ('/me/following/boards/?access_token=' + access_token );
    var para = selfEncode(args);
    if(para != ''){
    	queryUrl += '&fields='
    	queryUrl += para
    }
    console.log(queryUrl);
    return queryUrl
}

function pSelfInterests(args, queryUrl){
    queryUrl += ('/me/following/interests/?access_token=' + access_token );
    var para = selfEncode(args);
    if(para != ''){
    	queryUrl += '&fields='
    	queryUrl += para
    }
    console.log(queryUrl);
    return queryUrl
}

function pSelfFollowing(args, queryUrl){
    queryUrl += ('/me/following/users/?access_token=' + access_token );
    var para = selfEncode(args);
    if(para != ''){
    	queryUrl += '&fields='
    	queryUrl += para
    }
    console.log(queryUrl);
    return queryUrl
}

function pSelfLikes(args, queryUrl){
    queryUrl += ('/me/likes/?access_token=' + access_token );
    var para = selfEncode(args);
    if(para != ''){
    	queryUrl += '&fields='
    	queryUrl += para
    }
    console.log(queryUrl);
    return queryUrl
}

function pSelfPins(args, queryUrl){
    queryUrl += ('/me/pins/?access_token=' + access_token );
    var para = selfEncode(args);
    if(para != ''){
    	queryUrl += '&fields='
    	queryUrl += para
    }
    console.log(queryUrl);
    return queryUrl
}

function pSearchBoards(args, queryUrl){
    queryUrl += ('/me/search/boards/?access_token=' + access_token );
    var para = selfEncode(args);
    if(para != ''){
    	queryUrl += '&fields='
    	queryUrl += para
    }
    query = queryEncode(args.query);
    queryUrl += '&' + query;
    console.log(queryUrl);
    return queryUrl
}

function pSearchPins(args, queryUrl){
    queryUrl += ('/me/search/pins/?access_token=' + access_token );
    var para = selfEncode(args);
    if(para != ''){
    	queryUrl += '&fields='
    	queryUrl += para
    }
    query = queryEncode(args.query);
    queryUrl += '&' + query;
    console.log(queryUrl);
    return queryUrl
}

module.exports = {
	pinterest
}