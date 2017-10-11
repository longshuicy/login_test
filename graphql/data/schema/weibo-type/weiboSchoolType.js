var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');

const weiboSchoolType = module.exports = new GraphQLObjectType({
	name:'weiboSchool',
	fields: () =>({
		id:		{type:GraphQLString},
		name:	{type:GraphQLString},
	})
});