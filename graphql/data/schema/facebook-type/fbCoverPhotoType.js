var {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt
} = require('graphql');

const fbCoverPhotoType = module.exports = new GraphQLObjectType({
	name: 'fbCoverPhoto',
	description: 'Return a facebook user\'s cover photo.',
	fields: () => ({
		id:			{ type: GraphQLString },
		offset_y: 	{ type:GraphQLInt },
		source:		{ type: GraphQLString }
	})
});
