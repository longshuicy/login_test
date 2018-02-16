var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');
var youtubeAPI = require('../../../API/youtubeAPI');

const youtubeListType = module.exports = new GraphQLObjectType({
	name:'youtubeList',
	description:'',
	fields:() => ({
		kind:		{type:GraphQLString},
		etag:		{type:GraphQLString},
		info:		{type:youtubeInfoType,
						resolve: ({id})=>{return id}},
		snippet:	{type:youtubeSnippetType},
	})
});

const youtubeInfoType = new GraphQLObjectType({
	name:'youtubeId',
	fields:() =>({
		kind:		{type:GraphQLString},
		videoId:	{type:GraphQLString},
		channelId:	{type:GraphQLString},
		playlistId:	{type:GraphQLString},
		/*---------------nested--------------*/
		videoInfo:		{type:new GraphQLList(youtubeVideoType),
							resolve:({videoId},_,context) => youtubeAPI(context, resolveName='video',id=videoId, args={})},
		channelInfo:	{type:new GraphQLList(youtubeChannelType),
							resolve:({channelId},_,context) => youtubeAPI(context,resolveName='channel',id=channelId, args={})},
		playlistInfo:	{type:new GraphQLList(youtubePlaylistType),
							resolve: ({playlistId},_,context) => youtubeAPI(context,resolveName='playlist',id=playlistId, args={})},	
	})
});

const youtubeSnippetType = new GraphQLObjectType({
	name:'youtubeSnippet',
	fields: ()=> ({
		publishedAt:			{type:GraphQLString},
		channelId:				{type:GraphQLString},
		title:					{type:GraphQLString},
		description:			{type:GraphQLString},
		default_thumbnails:		{type:youtubeThumbnailType,
									resolve:({thumbnails})=>{return thumbnails.default}},
		medium_thumbnails:		{type:youtubeThumbnailType,
									resolve:({thumbnails})=>{return thumbnails.medium}},
		high_thumbnails:		{type:youtubeThumbnailType,
									resolve:({thumbnails})=>{return thumbnails.high}},
		channelTitle:			{type:GraphQLString},
		liveBroadcastContent:	{type:GraphQLString},
	})
});

const youtubeThumbnailType = require('./youtubeThumbnailType');
const youtubePlaylistType = require('./youtubePlaylistType');
const youtubeChannelType = require('./youtubeChannelType');
const youtubeVideoType = require('./youtubeVideoType');