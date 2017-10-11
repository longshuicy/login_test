var {
	GraphQLList,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLFloat
} = require('graphql');

const fbLocationType = module.exports = new GraphQLObjectType({
	name:'fbLocation',
	description:'Location of Place',
	fields: () =>({
		city:			{ type: GraphQLString },
		country:		{ type: GraphQLString },
		latitude:		{ type: GraphQLFloat},
		longitude:		{ type: GraphQLFloat},
		state:			{ type: GraphQLString },
		street:			{ type: GraphQLString },
		zip:			{ type: GraphQLString }
	})
});