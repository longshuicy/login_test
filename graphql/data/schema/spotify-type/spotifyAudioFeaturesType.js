var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');

const spotifyAudioFeaturesType = module.exports = new GraphQLObjectType({
	name:'spotifyAudioFeaturesType',
	fields: ()=>({
		acousticness: 		{type:GraphQLFloat},
		analysis_url:		{type:GraphQLString},
		danceability:		{type:GraphQLFloat},
		duration_ms:		{type:GraphQLInt},
		energy:				{type:GraphQLFloat},
		id:					{type:GraphQLString},
		instrumentalness:	{type:GraphQLFloat},
		key:				{type:GraphQLInt},
		liveness:			{type:GraphQLFloat},
		loudness:			{type:GraphQLFloat},
		mode:				{type:GraphQLInt},
		speechiness:		{type:GraphQLFloat},
		tempo:				{type:GraphQLFloat},
		time_signature:		{type:GraphQLInt},
		track_href:			{type:GraphQLString},
		type:				{type:GraphQLString},
		uri:				{type:GraphQLString},
		valence:			{type:GraphQLFloat},
	})
});