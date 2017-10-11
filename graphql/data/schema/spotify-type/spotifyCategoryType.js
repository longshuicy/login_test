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

const spotifyCategoryType = module.exports = new GraphQLObjectType({
	name:'spotifyCategory',
	fields: ()=>({
		href:	{type:GraphQLString},
		icons:	{type:new GraphQLList(spotifyImageType)},
		id:		{type:GraphQLString},
		name:	{type:GraphQLString},
		/*------------------------nested----------------------------*/
		categoryPlaylists:	{type:new GraphQLList(spotifyPlaylistType),
								args:{
									country:	{type:GraphQLString,
													description:'Optional. A country: an ISO 3166-1 alpha-2 country code.',
													defaultValue:"US"},
									limit:		{type:GraphQLInt, defaultValue:20},
									offset:		{type:GraphQLInt, defaultValue:0},
								},
								resolve: ({id},args,context) => spotifyAPI(context,resolveName='categoryPlaylists',id=id,args = args)},
	})	
});

const spotifyImageType = require('./spotifyImageType');
const spotifyPlaylistType = require('./spotifyPlaylistType');