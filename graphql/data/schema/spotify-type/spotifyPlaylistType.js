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

const spotifyPlaylistType = module.exports = new GraphQLObjectType({
	name:'spotifyPlaylist',
	fields: () => ({
		/*----------------------------simplified----------------------*/
		collaborative:	{type:GraphQLBoolean},
		external_urls:	{type:GraphQLString,
								resolve:({external_urls})=>{return JSON.stringify(external_urls)}},
		href:			{type:GraphQLString},
		id:				{type:GraphQLString},
		images:			{type:new GraphQLList(spotifyImageType)},
		name:			{type:GraphQLString},
		owner:			{type:spotifyUserType},
		public:			{type:GraphQLBoolean},
		snapshot_id:	{type:GraphQLString},
		
		type:			{type:GraphQLString},
		uri:			{type:GraphQLString},
		/*-----------------------------full------------------------*/
		description:	{type:GraphQLString},
		followers:		{type:spotifyFollowerType},
		/*----------------------------nested-----------------------*/
		tracks:			{type:spotifyPagingType},
	})
});

const spotifyUserType = require('./spotifyUserType');
const spotifyFollowerType = require('./spotifyFollowerType');
const spotifyImageType = require('./spotifyImageType');
const spotifyPagingType = require('./spotifyPagingType');

