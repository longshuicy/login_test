var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');

const weiboCommentType = module.exports = new GraphQLObjectType({
	name:'weiboComment',
	fields: () => ({
		created_at:	{type:GraphQLString},
		id:			{type:GraphQLString},
		text:		{type:GraphQLString},
		source:		{type:GraphQLString},
		mid:		{type:GraphQLString},
		user:		{type:weiboUserType},
		status:		{type:weiboType},
	})
});

const weiboUserType = require('./weiboUserType');
const weiboType = require('./weiboType');