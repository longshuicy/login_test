var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');
var spotifyAPI = require('../../../API/spotifyAPI');

const spotifyArtistType = module.exports = new GraphQLObjectType({
	name:'spotifyArtist',
	fields: () => ({
		external_urls:	{type:GraphQLString,
								resolve:({external_urls})=>{return JSON.stringify(external_urls)}},
		followers:		{type:spotifyFollowerType},
		genres:			{type:new GraphQLList(GraphQLString)},
		href:			{type:GraphQLString},
		id:				{type:GraphQLString},
		images:			{type:new GraphQLList(spotifyImageType)},
		name:			{type:GraphQLString},
		popularity:		{type:GraphQLInt},
		type:			{type:GraphQLString},
		uri:			{type:GraphQLString},
		/*--------------------------nested------------------------------*/
		albums:			{type:new GraphQLList(spotifyAlbumType),
							resolve:({id},_,context) => spotifyAPI(context,resolveName = 'getArtistAlbums', id=id, args = {})},
		topTracks:		{type:new GraphQLList(spotifyTrackType),
							args:{
								country:{type:GraphQLString,description:'country code',defaultValue:'US'}
								},
							resolve:({id},args,context) => spotifyAPI(context,resolveName = 'getArtistTopTracks',id = id, args = args)},
		relatedArtists:	{type:new GraphQLList(spotifyArtistType),
							description:`Get Spotify catalog information about artists similar to a given artist. Similarity 
							is based on analysis of the Spotify community’s listening history. Return up to 20 artists`,
							resolve:({id},_,context) => spotifyAPI(context,resolveName = 'getArtistRelatedArtists', id=id, args = {})},		
	})
});

const spotifyImageType = require('./spotifyImageType');
const spotifyFollowerType = require('./spotifyFollowerType');
const spotifyAlbumType = require('./spotifyAlbumType');
const spotifyTrackType = require('./spotifyTrackType');