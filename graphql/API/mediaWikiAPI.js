var Promise = require('promise');
var request = require('request');

function mediaWiki(args, fname){
    return new Promise((resolve, reject) =>{
        console.log("In MediaWiki API, switch functionality now");
        console.log(fname);
        var queryUrl = 'https://en.wikipedia.org/w/api.php?';
        switch(fname){
            case "wikiPageContent":
                queryUrl = wikiPageContent(args, queryUrl);
                break;
        }     
        console.log(queryUrl);

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

function wikiPageContent(args, queryUrl){
    queryUrl += "action=query&prop=revisions&rvprop=content&format=json";
    for(var key in args){
        queryUrl += '&' + key + '=' + encodeURIComponent(args[key]);
    }
    console.log(queryUrl);
    return queryUrl
}

module.exports = {
  mediaWiki
}

