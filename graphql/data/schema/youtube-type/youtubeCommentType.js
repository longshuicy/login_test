var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');

const youtubeCommentType = module.exports = new GraphQLObjectType({
	name:'youtubeComment',
	description:'',
	fields:() => ({
		kind:		{type:GraphQLString},
		etag:		{type:GraphQLString},
		id:			{type:GraphQLString},
		snippet:	{type:commentSnippetType},
	})
});

const commentSnippetType = new GraphQLObjectType({
	name:'commentSnippetType',
	fields:() => ({
		authorDisplayName:		{type:GraphQLString},
		authorProfileImageUrl:	{type:GraphQLString},
		authorChannelUrl:		{type:GraphQLString},
		authorChannelId_value:	{type:GraphQLString,
									resolve: ({authorChannelId})=>{return authorChannelId.value}},
		channelId:				{type:GraphQLString},
		videoId:				{type:GraphQLString},
		textDisplay:			{type:GraphQLString},
		textOriginal:			{type:GraphQLString},
		parentId:				{type:GraphQLString},
		canRate:				{type:GraphQLBoolean},
		viewerRating:			{type:GraphQLString},
		likeCount:				{type:GraphQLInt},
		moderationStatus:		{type:GraphQLString},
		publishedAt:			{type:GraphQLString},
		updateAt:				{type:GraphQLString},
	})
});
		