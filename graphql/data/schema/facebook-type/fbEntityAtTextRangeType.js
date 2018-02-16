var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat
} = require('graphql');

const fbEntityAtTextRangeType = module.exports = new GraphQLObjectType({
	name:'fbEntityAtTextRange',
	description:`An array containing an array of objects mentioned in the 
	name field which contain the id, name, and type of each object as well 
	as the offset and length which can be used to match it up with its 
corresponding string in the name field`,
	fields: ()=>({
		id:		{ type:	GraphQLString },
		length:	{ type: GraphQLInt },
		name:	{ type: GraphQLString },
		offset:	{ type: GraphQLInt },
		type: 	{ type: GraphQLString }
	})
});