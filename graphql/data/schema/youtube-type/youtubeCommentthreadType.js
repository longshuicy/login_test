var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');

const youtubeCommentthreadType = module.exports = new GraphQLObjectType({
	name:'youtubeCommentthread',
	description:'',
	fields:() => ({
		kind:		{type:GraphQLString},
		etag:		{type:GraphQLString},
		id:			{type:GraphQLString},
		snippet:	{type:commentthreadSnippetType},
		//comments:	{type:new GraphQLList(youtubeCommentType),
		//				resolve: ({replies}) => {return replies.comments}},
	})
});

const commentthreadSnippetType = new GraphQLObjectType({
	name:'commentthreadSnippet',
	fields:()=>({
		channelId:			{type:GraphQLString},
		videoId:			{type:GraphQLString},
		topLevelComment:	{type:youtubeCommentType},
		canReply:			{type:GraphQLBoolean},
		totalReplyCount:	{type:GraphQLInt},
		isPublic:			{type:GraphQLBoolean},
	})
});

const youtubeCommentType = require('./youtubeCommentType');