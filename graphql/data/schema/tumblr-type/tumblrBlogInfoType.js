var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');

const tumblrBlogInfoType = module.exports = new GraphQLObjectType({
	name:'tumblrBlogInfo',
	description:'',
	fields: () => ({
		ask:				{type:GraphQLBoolean},
		ask_anon:			{type:GraphQLBoolean},
		ask_page_title:		{type:GraphQLString},
		can_subscribe:		{type:GraphQLBoolean},
		description:		{type:GraphQLString},
		is_adult:			{type:GraphQLBoolean},
		is_nsfw:			{type:GraphQLBoolean},
		likes:				{type:GraphQLInt},
		name:				{type:GraphQLString},
		posts:				{type:GraphQLInt},
		reply_conditions:	{type:GraphQLString},
		share_likes:		{type:GraphQLBoolean},
		subscribed:			{type:GraphQLBoolean},
		title:				{type:GraphQLString},
		total_posts:		{type:GraphQLInt},
		updated:			{type:GraphQLInt},
		url:				{type:GraphQLString},
	})
});