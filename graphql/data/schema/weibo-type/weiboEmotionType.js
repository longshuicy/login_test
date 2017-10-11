var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');

const weiboEmotionType = module.exports = new GraphQLObjectType({
	name:'weiboEmotion',
	fields: () => ({
		category:	{type:GraphQLString},
		common:		{type:GraphQLBoolean},
		hot:		{type:GraphQLBoolean},
		icon:		{type:GraphQLString},
		phrase:		{type:GraphQLString},
		picid:		{type:GraphQLString},
		type:		{type:GraphQLString},
		url:		{type:GraphQLString},
		value:		{type:GraphQLString},
	})
});
	