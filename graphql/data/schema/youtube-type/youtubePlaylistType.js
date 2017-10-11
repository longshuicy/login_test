var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');
	
const youtubePlaylistType = module.exports = new GraphQLObjectType({
	name:'youtubePlaylist',
	description:'',
	fields:() => ({
		kind:			{type:GraphQLString},
		etag:			{type:GraphQLString},
		id:				{type:GraphQLString},
		snippet:		{type:playlistSnippetType},
		status:			{type:GraphQLString,
							resolve:({status}) => {return (status.privacyStatus)}},
		contentDetails:	{type:GraphQLString,
							resolve:({contentDetails}) => {return (contentDetails.itemCount)}},
		player:			{type:GraphQLString,
							resolve:({player}) => {return (player.embedHtml)}},
		//localizations:	{type:GraphQLString,
		//					resolve:({localizations})=>{console.log(localizations)}},
	})
});

const playlistSnippetType = new GraphQLObjectType({
	name:'playlistSnippet',
	fields:() => ({
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
		tags:					{type:new GraphQLList(GraphQLString)},
		defaultLanguage:		{type:GraphQLString},
		localized_title:		{type:GraphQLString,
									resolve:({localized})=>{return localized.title}},
		localized_description:	{type:GraphQLString,
									resolve:({localized})=>{return localized.description}},
	})
});

const youtubeThumbnailType = require('./youtubeThumbnailType');