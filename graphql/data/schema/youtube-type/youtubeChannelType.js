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
	
const youtubeChannelType = module.exports = new GraphQLObjectType({
	name:'youtubeChannel',
	description:'',
	fields:() => ({
		kind:			{type:GraphQLString},
		etag:			{type:GraphQLString},
		id:				{type:GraphQLString},
		snippet:		{type:channelSnippetType},
		contentDetails:	{type:channelContentType,
							resolve: ({contentDetails})=>{return contentDetails.relatedPlaylists}},
		statistics:		{type:channelStatisticsType},
		topicDetails:	{type:channelTopicType},
		status:			{type:channelStatusType},
		brandingSettings:	{type:channelBrandingType},
		invideoPromotion:	{type:new GraphQLList(channelPromotionType),
								resolve: ({invideoPromotion}) => {return invideoPromotion.items}},
		//auditDetails:		{type:channelAuditType},
		contentOwnerDetails:{type:channelOwnerType},
		/*--------------------------nested-----------------------------*/
		commentThread:			{type:new GraphQLList(youtubeCommentthreadType),
									args:{
										maxResults:{type:GraphQLInt,defaultValue:5},
										searchTerms:{	type:GraphQLString,
														description:'show the comments matching this text pattern',
														defaultValue:''},
									},
									resolve:({id},args,context)=>youtubeAPI(context,resolveName='channelCommentthread',id=id, args=args)},
	})
});

const channelSnippetType = new GraphQLObjectType({
	name:'channelSnippet',
	fields:() =>({
		title:					{type:GraphQLString},
		description:			{type:GraphQLString},
		customUrl:				{type:GraphQLString},
		publishedAt:			{type:GraphQLString},
		default_thumbnails:		{type:youtubeThumbnailType,
									resolve:({thumbnails})=>{return thumbnails.default}},
		medium_thumbnails:		{type:youtubeThumbnailType,
									resolve:({thumbnails})=>{return thumbnails.medium}},
		high_thumbnails:		{type:youtubeThumbnailType,
									resolve:({thumbnails})=>{return thumbnails.high}},
		defaultLanguage:		{type:GraphQLString},
		localized_title:		{type:GraphQLString,
									resolve:({localized})=>{return localized.title}},
		localized_description:	{type:GraphQLString,
									resolve:({localized})=>{return localized.description}},
		country:				{type:GraphQLString},
	})
});

const channelContentType = new GraphQLObjectType({
	name:'channelContent',
	fields:() =>({
		likes:			{type:GraphQLString},
		favorites:		{type:GraphQLString},
		uploads:		{type:GraphQLString},
		watchHistory:	{type:GraphQLString},
		watchLater:		{type:GraphQLString},
	})
});

const channelStatisticsType = new GraphQLObjectType({
	name:'channelStatistics',
	fields:() =>({
		viewCount:				{type:GraphQLInt},
		commentCount:			{type:GraphQLInt},
		subscriberCount:		{type:GraphQLInt},
		hiddenSubscriberCount:	{type:GraphQLBoolean},
		videoCount:				{type:GraphQLInt},
	})
});

const channelTopicType = new GraphQLObjectType({
	name:'channelTopic',
	fields:() =>({	
		topicIds:			{type:new GraphQLList(GraphQLString)},
		topicCategories:	{type:new GraphQLList(GraphQLString)},
	})
});

const channelStatusType = new GraphQLObjectType({
	name:'channelStatus',
	fields: () =>({
		privacyStatus:		{type:GraphQLString},
		isLinked:			{type:GraphQLBoolean},
		longUploadsStatus:	{type:GraphQLString},
	})
});

const channelBrandingType = new GraphQLObjectType({
	name:'channelBranding',
	fields: () =>({
		channel_title:						{type:GraphQLString,
												resolve:({channel}) => {return channel.title}},
		channel_description:				{type:GraphQLString,
												resolve:({channel}) => {return channel.description}},
		channel_keywords:					{type:GraphQLString,
												resolve:({channel}) => {return channel.keywords}},
		channel_defaultTab:					{type:GraphQLString,
												resolve:({channel}) => {return channel.defaultTab}},
		channel_trackingAnalyticsAccountId:	{type:GraphQLString,
												resolve:({channel}) => {return channel.trackingAnalyticsAccountId}},
		channel_moderateComments:			{type:GraphQLBoolean,
												resolve:({channel}) => {return channel.moderateComments}},
		channel_showRelatedChannels:		{type:GraphQLBoolean,
												resolve:({channel}) => {return channel.showRelatedChannels}},
		channel_showBrowseView:				{type:GraphQLBoolean,
												resolve:({channel}) => {return channel.showBrowseView}},
		channel_featuredChannelsTitle:		{type:GraphQLString,
												resolve:({channel}) => {return channel.featuredChannelsTitle}},
		channel_featuredChannelsUrls:		{type:new GraphQLList(GraphQLString),
												resolve:({channel}) => {return channel.featuredChannelsUrls}},
		channel_unsubscribedTrailer:		{type:GraphQLString,
												resolve:({channel}) => {return channel.unsubscribedTrailer}},
		channel_profileColor:				{type:GraphQLString,
												resolve:({channel}) => {return channel.profileColor}},
		channel_defaultLanguage:			{type:GraphQLString,
												resolve:({channel}) => {return channel.defaultLanguage}},
		channel_country:					{type:GraphQLString,
												resolve:({channel}) => {return channel.country}},
		watch_textColor:					{type:GraphQLString,
												resolve:({watch}) => {return watch.textColor}},
		watch_backgroundColor:				{type:GraphQLString,
												resolve:({watch}) => {return watch.backgroundColor}},
		watch_featuredPlaylistId:			{type:GraphQLString,
												resolve:({watch}) => {return watch.featuredPlaylistId}},
		image_bannerImageUrl:				{type:GraphQLString,
												resolve:({image}) => {return image.bannerImageUrl}},
		image_bannerMobileImageUrl:			{type:GraphQLString,
												resolve:({image}) => {return image.bannerMobileImageUrl}},
		image_watchIconImageUrl:			{type:GraphQLString,
												resolve:({image}) => {return image.watchIconImageUrl}},
		image_trackingImageUrl:				{type:GraphQLString,
												resolve:({image}) => {return image.trackingImageUrl}},
		image_bannerTabletLowImageUrl:		{type:GraphQLString,
												resolve:({image}) => {return image.bannerTabletLowImageUrl}},
		image_bannerTabletImageUrl:			{type:GraphQLString,
												resolve:({image}) => {return image.bannerTabletImageUrl}},
		image_bannerTabletHdImageUrl:		{type:GraphQLString,
												resolve:({image}) => {return image.bannerTabletHdImageUrl}},
		image_bannerTabletExtraHdImageUrl:	{type:GraphQLString,
												resolve:({image}) => {return image.bannerTabletExtraHdImageUrl}},
		image_bannerMobileLowImageUrl:		{type:GraphQLString,
												resolve:({image}) => {return image.bannerMobileLowImageUrl}},
		image_bannerMobileMediumHdImageUrl:	{type:GraphQLString,
												resolve:({image}) => {return image.bannerMobileMediumHdImageUrl}},
		image_bannerMobileHdImageUrl:		{type:GraphQLString,
												resolve:({image}) => {return image.bannerMobileHdImageUrl}},
		image_bannerMobileExtraHdImageUrl:	{type:GraphQLString,
												resolve:({image}) => {return image.bannerMobileExtraHdImageUrl}},
		image_bannerTvImageUrl:				{type:GraphQLString,
												resolve:({image}) => {return image.bannerTvImageUrl}},
		image_bannerTvLowImageUrl:			{type:GraphQLString,
												resolve:({image}) => {return image.bannerTvLowImageUrl}},
		image_bannerTvMediumImageUrl:		{type:GraphQLString,
												resolve:({image}) => {return image.bannerTvMediumImageUrl}},
		image_bannerTvHighImageUrl:			{type:GraphQLString,
												resolve:({image}) => {return image.bannerTvHighImageUrl}},
		image_bannerExternalUrl:			{type:GraphQLString,
												resolve:({image}) => {return image.bannerExternalUrl}},
		hints:								{type:new GraphQLList(hintType)},
	})
});

const hintType = new GraphQLObjectType({
	name:'hint',
	fields: ()=>({
		property:	{type:GraphQLString},
		value:		{type:GraphQLString},
	})
});

const channelPromotionType = new GraphQLObjectType({
	name:'channelPromotion',
	fields: () => ({
		id_type:				{type:GraphQLString,
									resolve:({id}) => {return id.type}},
		id_videoId:				{type:GraphQLString,
									resolve:({id}) => {return id.videoId}},
		id_websiteUrl:			{type:GraphQLString,
									resolve:({id}) => {return id.websiteUrl}},
		id_recentlyUploadedBy:	{type:GraphQLString,
									resolve:({id}) => {return id.recentlyUploadedBy}},
		timing_type:			{type:GraphQLString,
									resolve:({timing}) => {return timing.type}},
		timing_offsetMs:		{type:GraphQLInt,
									resolve:({timing}) => {return timing.offsetMs}},
		timing_durationMs:		{type:GraphQLInt,
									resolve:({timing}) => {return timing.durationMs}},
		customMessage:			{type:GraphQLString},
		promotedByContentOwner:	{type:GraphQLBoolean},
	})
});

/*const channelAuditType = new GraphQLObjectType({
	name:'channelAudit',
	fields: () => ({
		overallGoodStanding:				{type:GraphQLBoolean},
		communityGuidelinesGoodStanding:	{type:GraphQLBoolean},
		copyrightStrikesGoodStanding:		{type:GraphQLBoolean},
		contentIdClaimsGoodStanding:		{type:GraphQLBoolean},
	})
});*/

const channelOwnerType = new GraphQLObjectType({
	name:'channelOwner',
	fields:() => ({
		contentOwner:	{type:GraphQLString},
		timeLinked:		{type:GraphQLString},
	})
});

const youtubeThumbnailType = require('./youtubeThumbnailType');
const youtubeCommentthreadType = require('./youtubeCommentthreadType');