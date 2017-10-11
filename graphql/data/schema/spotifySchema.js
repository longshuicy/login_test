var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');
var spotifyAPI = require('./../../API/spotifyAPI');
	
const spotifyQueryType = module.exports = new GraphQLObjectType({
	name:'spotifyQuery',
	description:'Query spotify albums, tracks, artists or playlist by keywords or other criteria',
	fields: () => ({
		searchTracks:{
			type: 	new GraphQLList(spotifyTrackType),
			args:	{q:		{
							type:GraphQLString,
							description:`The search query\'s keywords (and optional field filters and operators), 
							for example: q=roadhouse%20blues; q= q="roadhouse&20blues"; q=roadhouse%20NOT%20blues;
							q=roadhouse%20OR%20blues; q=album:gold%20artist:abba&type=album; 
							q=lil%20genre:%22southern%20hip%20hop%22&type=artist`
							},
					limit:	{
							type:GraphQLInt,
							defaultValue:20,
							description:'Optional. The maximum number of results to return. Default: 20. Minimum: 1. Maximum: 50. ',
							}, 
					offset: {
							type:GraphQLInt,
							defaultValue:0,
							description:`Optional. The index of the first result to return. Default: 0 (i.e., the first result).
							Maximum offset: 100.000. Use with limit to get the next page of search results.`
							}
					},
			resolve:(_,args,context) =>spotifyAPI( context,resolveName='searchTracks',id='', args = args)},
			
		searchArtists:{
			type: new GraphQLList(spotifyArtistType),
			args:	{q:		{
							type:GraphQLString,
							description:`The search query\'s keywords (and optional field filters and operators), 
							for example: q=roadhouse%20blues; q= q="roadhouse&20blues"; q=roadhouse%20NOT%20blues;
							q=roadhouse%20OR%20blues; q=album:gold%20artist:abba&type=album; 
							q=lil%20genre:%22southern%20hip%20hop%22&type=artist`
							},
					limit:	{
							type:GraphQLInt,
							defaultValue:20,
							description:'Optional. The maximum number of results to return. Default: 20. Minimum: 1. Maximum: 50. ',
							}, 
					offset: {
							type:GraphQLInt,
							defaultValue:0,
							description:`Optional. The index of the first result to return. Default: 0 (i.e., the first result).
							Maximum offset: 100.000. Use with limit to get the next page of search results.`
							}
					},
			resolve:(_,args,context) =>spotifyAPI(context,resolveName='searchArtists',id='',args = args)},
			
		searchPlaylists:{
			type: new GraphQLList(spotifyPlaylistType),
			args:	{q:		{
							type:GraphQLString,
							description:`The search query\'s keywords (and optional field filters and operators), 
							for example: q=roadhouse%20blues; q= q="roadhouse&20blues"; q=roadhouse%20NOT%20blues;
							q=roadhouse%20OR%20blues; q=album:gold%20artist:abba&type=album; 
							q=lil%20genre:%22southern%20hip%20hop%22&type=artist`
							},
					limit:	{
							type:GraphQLInt,
							defaultValue:20,
							description:'Optional. The maximum number of results to return. Default: 20. Minimum: 1. Maximum: 50. ',
							}, 
					offset: {
							type:GraphQLInt,
							defaultValue:0,
							description:`Optional. The index of the first result to return. Default: 0 (i.e., the first result).
							Maximum offset: 100.000. Use with limit to get the next page of search results.`
							}
					},
			resolve:(_,args,context) =>spotifyAPI( context,resolveName='searchPlaylists',id='', args = args)},
			
		searchAlbums:{
			type: new GraphQLList(spotifyAlbumType),
			args:	{q:		{
							type:GraphQLString,
							description:`The search query\'s keywords (and optional field filters and operators), 
							for example: q=roadhouse%20blues; q= q="roadhouse&20blues"; q=roadhouse%20NOT%20blues;
							q=roadhouse%20OR%20blues; q=album:gold%20artist:abba&type=album; 
							q=lil%20genre:%22southern%20hip%20hop%22&type=artist`
							},
					limit:	{
							type:GraphQLInt,
							defaultValue:20,
							description:'Optional. The maximum number of results to return. Default: 20. Minimum: 1. Maximum: 50. ',
							}, 
					offset: {
							type:GraphQLInt,
							defaultValue:0,
							description:`Optional. The index of the first result to return. Default: 0 (i.e., the first result).
							Maximum offset: 100.000. Use with limit to get the next page of search results.`
							}
					},
			resolve:(_,args,context) =>spotifyAPI(context,resolveName='searchAlbums',id='', args = args)},
		
		getUser:{
			type:spotifyUserType,
			args:	{user_id: {type:GraphQLString}},
			resolve: (_,args,context) =>spotifyAPI(context,resolveName='getUser',id='',args = args)},
		
		browseFeaturedPlaylists:{
			type:new GraphQLList(spotifyPlaylistType),
			args: {
				locale:		{type:GraphQLString,
								description:`The desired language, consisting of a lowercase 
								ISO 639 language code and an uppercase ISO 3166-1 alpha-2 country code, 
								joined by an underscore. For example: es_MX, meaning "Spanish (Mexico)".`,
								defaultValue:"en_US"},
				country:	{type:GraphQLString,
								description:'Optional. A country: an ISO 3166-1 alpha-2 country code.',
								defaultValue:"US"},
				timestamp:	{type:GraphQLString},
				limit:		{type:GraphQLInt, defaultValue:20},
				offset:		{type:GraphQLInt, defaultValue:0},
			},
			resolve:(_,args,context) => spotifyAPI(context,resolveName = 'browseFeaturedPlaylists', id='',args=args)},
		
		browseNewReleases:{
			type:new GraphQLList(spotifyAlbumType),
			args: {	country:	{type:GraphQLString,
								description:'Optional. A country: an ISO 3166-1 alpha-2 country code.',
								defaultValue:"US"},
					limit:		{type:GraphQLInt, defaultValue:20},
					offset:		{type:GraphQLInt, defaultValue:0},
				},
			resolve:(_,args,context) => spotifyAPI(context, resolveName = 'browseNewReleases', id='',args=args)},
			
		browseCategories:{
			type:new GraphQLList(spotifyCategoryType),
			args:	{
				locale:		{type:GraphQLString,
								description:`The desired language, consisting of a lowercase 
								ISO 639 language code and an uppercase ISO 3166-1 alpha-2 country code, 
								joined by an underscore. For example: es_MX, meaning "Spanish (Mexico)".`,
								defaultValue:"en_US"},
				country:	{type:GraphQLString,
								description:'Optional. A country: an ISO 3166-1 alpha-2 country code.',
								defaultValue:"US"},
				limit:		{type:GraphQLInt, defaultValue:20},
				offset:		{type:GraphQLInt, defaultValue:0},
			},
			resolve: (_,args,context) => spotifyAPI(context,resolveName = 'browsweCategories',id='',args = args)},
	})
});

const spotifyTrackType = require('./spotify-type/spotifyTrackType');
const spotifyArtistType = require('./spotify-type/spotifyArtistType');
const spotifyPlaylistType = require('./spotify-type/spotifyPlaylistType');
const spotifyAlbumType = require('./spotify-type/spotifyAlbumType');
const spotifyUserType = require('./spotify-type/spotifyUserType');
const spotifyCategoryType = require('./spotify-type/spotifyCategoryType');