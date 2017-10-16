var Promise = require('promise');
var FB = require('fb');
require('dotenv').config();


function facebookAPI(token, resolveName,args,type){
	
	FB.options({version:'v2.8'});
	FB.setAccessToken(token.fbaccesstoken); //token need to renew every 60 days!
	
	return new Promise((resolve,reject) =>{
		
		switch(resolveName){
			case 'search':
				FB.api('search?q=' + args['q'] + '&type=' + type,(fb)=>{
					if(!fb || fb.error) {
						reject(fb.error);
					}else{
						//console.log(fb.data);
						resolve(fb.data);
					}
				});
				break;
				
			case 'getField':
				FB.api(args['id'],{fields:type},(fb) =>{
					if(!fb || fb.error) {
						reject(fb.error);
					}else{
						resolve(fb[type]);
					}
				});
				break;
			
			case 'getEdge':
				FB.api(args['id'] + "/" + type ,(fb) =>{
					if(!fb || fb.error) {
						reject(fb.error);
					}else{
						resolve(fb.data);
					}
				});
				break;
		}
	});

}

module.exports = facebookAPI;