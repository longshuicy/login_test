var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');

const spotifyPlaylistTrackType = module.exports = new GraphQLObjectType({
	name:'spotifyPLaylistTrack',
	fields: () => ({
		added_at:	{type:GraphQLString},	
		added_by:	{type:spotifyUserType},
		is_local:	{type:GraphQLBoolean},	
		track:		{type:spotifyTrackType},
	})
});

const spotifyUserType = require('./spotifyUserType');
const spotifyTrackType = require('./spotifyTrackType');