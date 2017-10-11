require('dotenv').config();
var Promise = require('promise');
var SpotifyWebApi = require('spotify-web-api-node');

function spotifyAPI(tokens,resolveName, id, args){
	
	var spotify = new SpotifyWebApi();
	spotify.setAccessToken(tokens.spotifyaccesstoken);
	
	
	return new Promise((resolve,reject) =>{
		switch(resolveName){
			case 'searchTracks':
				spotify.searchTracks(args['q'],args).then(function(data) {
					//console.log(JSON.stringify(data.body));
					resolve(data.body.tracks.items);
				});
				break;
			
			case 'searchArtists':
				spotify.searchArtists(args['q'],args).then(function(data) {
					//console.log(JSON.stringify(data.body.artists.items));
					resolve(data.body.artists.items);
				});
				break;
			
			case 'searchPlaylists':
				spotify.searchPlaylists(args['q'],args).then(function(data) {
					//console.log(JSON.stringify(data.body.playlists.items));
					resolve(data.body.playlists.items);
				});
				break;
			
			case 'searchAlbums':
				spotify.searchAlbums(args['q'],args).then(function(data) {
					//console.log(JSON.stringify(data.body.albums.items));
					resolve(data.body.albums.items);
				});
				break;
			
			case 'getUser':
				spotify.getUser(args['user_id']).then(function(data) {
					resolve(data.body);
				});
				break;
			
			case 'getUserPlaylists':
				spotify.getUserPlaylists(args).then(function(data) {
					resolve(data.body.items);
				});
				break;
				
			case 'getArtistAlbums':
				spotify.getArtistAlbums(id).then(function(data){
					resolve(data.body.items);
				});
				break;
			
			case 'getArtistTopTracks':
				//console.log(args)
				spotify.getArtistTopTracks(id,args['country']).then(function(data){
					resolve(data.body.tracks);
				});
				break;
				
			case 'getAlbumTracks':
				spotify.getAlbumTracks(id).then(function(data){
					resolve(data.body.items);
				});
				break;
				
			case 'getArtistRelatedArtists':
				spotify.getArtistRelatedArtists(id).then(function(data){
					resolve(data.body.artists);
				});
				break;
				
			case 'audioFeatures':
				spotify.getAudioFeaturesForTrack(id).then(function(data){
					resolve(data.body);
				});
				break;
				
			case 'audioAnalysis':
				spotify.getAudioAnalysisForTrack(id).then(function(data){
					resolve(data.body);
				});
				break;
				
			case 'browseFeaturedPlaylists':
				spotify.getFeaturedPlaylists(args).then(function(data){
					//console.log(data.body.playlists);
					resolve(data.body.playlists.items);
				});
				break;
			
			case 'browseNewReleases':
				spotify.getNewReleases(args).then(function(data){
					resolve(data.body.albums.items);
				});
				break;
			
			case 'browsweCategories':
				spotify.getCategories(args).then(function(data){
					resolve(data.body.categories.items);
				});
				break;
				
			case 'categoryPlaylists':
				spotify.getPlaylistsForCategory(id,args).then(function(data){
					//console.log(data.body);
					resolve(data.body.playlists.items);
				});
				break;
				
			case 'getAlbum':
				spotify.getAlbum(id).then(function(data){
					//console.log(data.body);
					resolve(data.body);
				});
				break;
				
			default:
				console.log('sorry we can\'t find matching resolve type:' + resolveName);
				resolve(null);
		}
	});
}

module.exports = spotifyAPI;