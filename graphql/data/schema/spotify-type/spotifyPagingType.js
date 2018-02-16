var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean,
	GraphQLUnionType
} = require('graphql');

const spotifyPagingType = module.exports = new GraphQLObjectType({
	name:'spotifyPaging',
	fields: ()=>({
		href:		{type:GraphQLString},
		limit:		{type:GraphQLString},
		next:		{type:GraphQLString},
		offset:		{type:GraphQLInt},
		previous:	{type:GraphQLString},
		total:		{type:GraphQLInt},
		items:		{type:new GraphQLList(spotifyItemType)},
	})
});

const spotifyTrackType = require('./spotifyTrackType');
const spotifyPlaylistTrackType = require('./spotifyPlaylistTrackType');
const resolveType = (data) => {
	if (data.added_at | data.added_by | data.is_local){
		return spotifyPlaylistTrackType;
	}else{
		return spotifyTrackType;
	}
};
const spotifyItemType = new GraphQLUnionType({
	name: 'spotifyItem',
	description: 'union type of track object and playlist track object',
	types: [spotifyTrackType, spotifyPlaylistTrackType],
	resolveType: resolveType
});