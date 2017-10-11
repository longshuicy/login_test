var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');

const spotifyFollowerType = module.exports = new GraphQLObjectType({
	name:'spotifyFollower',
	fields: ()=>({
		href:	{type:GraphQLString},
		total:	{type:GraphQLInt},
	})
});