require('dotenv').config();
var Promise = require('promise');
var Flickr = require("node-flickr")
var keys = {
      "api_key": process.env.FLICKR_CONSUMER_KEY,
      "secret": process.env.FLICKR_CONSUMER_SECRET,
	  "user_id": process.env.FLICKR_USER_ID,
	  "access_token": process.env.FLICKR_ACCESS_TOKEN,
	  "access_token_secret": process.env.FLICKR_ACCESS_TOKEN_SECRET
	  };
var flickr = new Flickr(keys);

function flickrAPI(endpoint,addon,args,resolveName){
	Object.assign(args,addon);
	return new Promise((resolve,reject) =>{
		flickr.get(endpoint, args, function(err, result){
			if (err) {
				console.error(err);
				reject(err);
			}else{
				switch(resolveName){
					case 'searchPhotos':
					case 'recentPhotos':
					case 'interestingPhotos':
					case 'popular':
					case 'photo':
					case 'photoOf':
					case 'favoritePhotos':
						resolve(result.photos.photo);
						break;
						
					case 'searchGroups':
					case 'group':
						resolve(result.groups.group);
						break;
						
					case 'searchPlaces':
					case 'boundingBox':
					case 'topPlaces':
						resolve(result.places.place);
						break;
						
					case'searchUsers':
						resolve(result.user);
						break;
					
					case 'hotTags':
						resolve(result.hottags.tag);
						break;
						
					case 'photosInSet':
						resolve(result.photoset.photo);
						break;
						
					case 'photoset':
						resolve(result.photosets.photoset);
						break;
					
					case 'photosetComments':
					case 'comments':
						resolve(result.comments.comment);
						break;
						
					case 'photosInGallery':
					case 'gallery':
					case 'galleriesOf':
						//console.log(JSON.stringify(result));
						resolve(result.galleries.gallery);
						break;
						
					case 'groupInfo':
						resolve(result.group);
						break;
						
					case 'topics':
						resolve(result.topics.topic);
						break;
					
					case 'placeInfo':
						resolve(result.place);
						break;
						
					case 'tagClusters':
						resolve(result.clusters.cluster);
						break;
						
					case 'relatedTags':
						resolve(result.tags.tag);
						break;
					
					case 'profile':
						resolve(result.profile);
						break;
					
					case 'personInfo':
						//console.log(result.person);
						resolve(result.person);
						break;
					
					case 'tree':
						//console.log(JSON.stringify(result));
						resolve(result.collections.collection);
						break;
					
					case 'contact':
						resolve(result.contacts.contact);
						break;
					
					case 'tagList':
					case 'popularTags':
						resolve(result.who.tags.tag);
						break;
						
					case 'streamContext':
						resolve(result);
						break;
					
					case 'exif':
						resolve(result.photo.exif);
						break;
						
					case 'favoritePeople':
						//console.log(JSON.stringify(result));
						resolve(result.photo.person);
						break;
					
					case 'people':
						//console.log(JSON.stringify(result));
						resolve(result.people.person);
						break;
					
					case 'photoInfo':
						resolve(result.photo);
						break;
					
					case 'size':
						resolve(result.sizes.size);
						break;
					
					case 'locations':
						resolve(result.photo.location);
						break;
									
					default:
						console.log('sorry we can\'t find matching resolve type:' + resolveName);
						resolve(null);
						}						
			}
		});
	});		
}

module.exports = flickrAPI;