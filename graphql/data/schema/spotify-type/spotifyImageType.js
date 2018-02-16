var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');

const spotifyImageType = module.exports = new GraphQLObjectType({
	name:'spotifyImage',
	fields: () => ({
		height:	{type:GraphQLInt},	
		url:	{type:GraphQLString},
		width:	{type:GraphQLInt}
	})
});