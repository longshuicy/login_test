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

const spotifyUserType = module.exports = new GraphQLObjectType({
	name:'spotifyUser',
	fields: ()=>({
		display_name:	{type:GraphQLString},
		external_urls:	{type:GraphQLString,
								resolve:({external_urls})=>{return JSON.stringify(external_urls)}},
		followers:		{type:spotifyFollowerType},
		href:			{type:GraphQLString},
		id:				{type:GraphQLString},
		images:			{type:new GraphQLList(spotifyImageType)},
		type:			{type:GraphQLString},
		uri:			{type:GraphQLString},
		/*-----------------------nested----------------------*/
		playlists:		{type:new GraphQLList(spotifyPlaylistType),
							resolve:({id},_,context) => spotifyAPI(context,resolveName = 'getUserPlaylists', id = id, args = {})},
	})
});

const spotifyFollowerType = require('./spotifyFollowerType');
const spotifyImageType = require('./spotifyImageType');
const spotifyPlaylistType = require('./spotifyPlaylistType');