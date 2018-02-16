require('dotenv').config();
var Promise = require('promise');
var Flickr = require("flickr-sdk")

function flickrAPI(token, resolveName,addon,args){
	
	var oauth = new Flickr.OAuth(
		process.env.FLICKR_CONSUMER_KEY,
		process.env.FLICKR_CONSUMER_SECRET
	);
	var flickr = new Flickr(oauth.plugin(
		token.flickraccesstokenkey,
		token.flickraccesstokensecret
	));
	
	Object.assign(args,addon);
	return new Promise((resolve,reject) =>{
		
		switch(resolveName){
			case 'searchPhotos':
				flickr.photos.search(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['photos']['photo']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
			
			case 'recentPhotos':
				//console.log(args);
				flickr.photos.getRecent(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['photos']['photo']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
			
			case 'popular':
				flickr.photos.getPopular(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['photos']['photo']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
				
			case 'favoritePhotos':
				flickr.favorites.getPublicList(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['photos']['photo']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
				
			case 'searchGroups':
				flickr.groups.search(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['groups']['group']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
				
			case 'searchPlaces':
				flickr.places.find(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['places']['place']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
				
			case 'boundingBox':
				flickr.places.placesForBoundingBox(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['places']['place']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
				
			case 'topPlaces':	
				flickr.places.getTopPlacesList(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['places']['place']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
			
			case'searchUsers':
				flickr.people.findByUsername(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['user']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
				
			case 'hotTags':
				flickr.tags.getHotList(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['hottags']['tag']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
				
			case 'photosInSet':
				flickr.photosets.getPhotos(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['photoset']['photo']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
				
			case 'photoset':
				flickr.photosets.getList(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['photosets']['photoset']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
				
			case 'photosetComments':
				flickr.photosets.comments.getList(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['comments']['comment']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
				
			case 'comments':
				flickr.photos.comments.getList(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['comments']['comment']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
				
			case 'photosInGallery':
				flickr.galleries.getPhotos(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['galleries']['gallery']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
			
			case 'photo':
				flickr.people.getPublicPhotos(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['photos']['photo']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;s
			
			case 'photoOf':
				flickr.people.getPhotosOf(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['photos']['photo']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
				
			case 'groupInfo':
				flickr.groups.getInfo(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['group']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
			
			case 'topics':
				flickr.groups.discuss.topics.getList(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['topics']['topic']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
					
			case 'profile':
				flickr.profile.getProfile(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['profile']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
				
			case 'group':
				flickr.people.getPublicGroups(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['groups']['group']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
			
			case 'personInfo':
				flickr.people.getInfo(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['person']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
						
			case 'tree':
				flickr.collections.getTree(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['collections']['collection']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
			
			case 'contact':
				flickr.contacts.getPublicList(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['contacts']['contact']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
			
			case 'gallery':		
				flickr.galleries.getList(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['galleries']['gallery']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
				
			case 'tagList':
				flickr.tags.getListUser(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['who']['tags']['tag']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
				
			case 'popularTags':
				flickr.tags.getListUserPopular(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['who']['tags']['tag']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
				
			case 'streamContext':
				flickr.photos.getContext(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
				
			case 'exif':
				flickr.photos.getExif(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['photo']['exif']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
				
			case 'favoritePeople':
				flickr.photos.getFavorites(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['photo']['person']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
										
				
			case 'people':
				flickr.photos.people.getList(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['people']['person']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
			
				
			case 'photoInfo':
				flickr.photos.getInfo(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['photo']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
			
			
			case 'size':
				flickr.photos.getSizes(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['sizes']['size']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
									
			case 'locations':
				flickr.photos.geo.getLocation(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['photo']['location']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
			
			case 'galleriesOf':
				flickr.galleries.getListForPhoto(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['galleries']['gallery']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
				
			case 'placeInfo':
				flickr.places.getInfo(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['place']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
				
			case 'tagClusters':
				flickr.tags.getClusters(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['clusters']['cluster']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
				
			case 'relatedTags':
				flickr.tags.getRelated(args).then(function(response){
					return response.text;
				}).then(function(responseBody){
					var responseJson = JSON.parse(responseBody);
					resolve(responseJson['tags']['tag']);
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
				break;
								
									
			}
		});	
}

module.exports = flickrAPI;