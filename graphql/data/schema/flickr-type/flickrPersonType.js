var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');

var flickrAPI = require('../../../API/flickrAPI');

const flickrPersonType = module.exports = new GraphQLObjectType({
	name:'flickrPerson',
	description:'return a Owner information',
	fields:()=>({
		nsid:		{type:GraphQLString},
		favedata:		{type:GraphQLString},
		iconserver:	{type:GraphQLString},
		iconfarm:	{type:GraphQLInt},
		popular:	{type:new GraphQLList(flickrPhotoType),
						description:'Returns a list of popular photos of a given user',
						args: {
							page: 		{type:GraphQLInt, defaultValue:1},
							per_page:	{type:GraphQLInt, defaultValue:10},
							sort: 		{type:GraphQLString, defaultValue:"interesting"}},
						resolve:({nsid},args,context) => flickrAPI(context,resolveName='popular',addon={"user_id":nsid},args=args)},
						
		photoset:	{type:new GraphQLList(flickrPhotosetType),
						description:'Returns the photosets belonging to the specified user.',
						args: {
							page: 		{type:GraphQLInt, defaultValue:1},
							per_page:	{type:GraphQLInt, defaultValue:10}},
						resolve: ({nsid},args,context) => flickrAPI(context,resolveName='photoset',addon={"user_id":nsid},args=args)},
						
		profile:	{type: flickrProfileType,
						resolve: ({nsid},_,context) => flickrAPI(context,resolveName='profile',addon={"user_id":nsid},args={})},
						
		groups:		{type: new GraphQLList(flickrGroupType),
						description:'Returns the list of public groups a user is a member of.',
						resolve:({nsid},_,context)=>flickrAPI(context,resolveName='group',addon={"user_id":nsid},args={})},
						
		personInfo:	{type: flickrPersonInfoType,
						resolve: ({nsid},_,context)=>flickrAPI(context,resolveName='personInfo',addon={"user_id":nsid},args={})},
						
		photos:		{type:new GraphQLList(flickrPhotoType),
						description:'Get a list of public photos for the given user.',
						args: {
							page: 		{type:GraphQLInt, defaultValue:1},
							per_page:	{type:GraphQLInt, defaultValue:10}},
						resolve: ({nsid},args,context) => flickrAPI(context,resolveName='photo', addon={"user_id":nsid},args=args)},

		photosOf:	{type:new GraphQLList(flickrPhotoType),
						description:'Returns a list of photos containing a particular Flickr member.',
						args: {
							page: 		{type:GraphQLInt, defaultValue:1},
							per_page:	{type:GraphQLInt, defaultValue:10}},
						resolve: ({nsid},args,context) => flickrAPI(context,resolveName='photoOf',addon={"user_id":nsid},args=args)},
						
		collectionTree:	{type: new GraphQLList(flickrSetType),
							description:'Returns a tree (or sub tree) of collections belonging to a given user.',
							resolve:({nsid},_,context)=>flickrAPI(context,resolveName='tree',addon={"user_id":nsid},args={})},
							
		contacts:		{type: new GraphQLList(flickrPersonType),
							args: {
							page: 		{type:GraphQLInt, defaultValue:1},
							per_page:	{type:GraphQLInt, defaultValue:10}},
							resolve: ({nsid},args,context) => flickrAPI(context,resolveName='contact',addon={"user_id":nsid},args=args)},
						
		favoritePhotos:	{type: new GraphQLList(flickrPhotoType),
							args: {
							page: 		{type:GraphQLInt, defaultValue:1},
							per_page:	{type:GraphQLInt, defaultValue:10}},
							resolve: ({nsid},args,context) => flickrAPI(context,resolveName='favoritePhotos',addon={"user_id":nsid},args=args)},						
						
		gallaries:		{type: new GraphQLList(flickrGalleryType),
							description:'Return the list of galleries created by a user. Sorted from newest to oldest.',
							args: {
							page: 		{type:GraphQLInt, defaultValue:1},
							per_page:	{type:GraphQLInt, defaultValue:10}},
							resolve: ({nsid},args,context) => flickrAPI(context,resolveName='gallery',addon={"user_id":nsid},args=args)},			
						
		tags:			{type: new GraphQLList(flickrTagType),
							description:'Get the tag list for a given user (or the currently logged in user).',
							resolve:({nsid},_,context)=>flickrAPI(context,resolveName='tagList',addon={"user_id":nsid},args={})},	
						
		popularTags:	{type: new GraphQLList(flickrTagType),
							description:'Get the popular tags for a given user (or the currently logged in user).',
							args:{count:{type:GraphQLInt}},
							resolve:({nsid},args,context)=>flickrAPI(context,resolveName='popularTags',addon={"user_id":nsid},args=args)},	
													
	})
});

const flickrPersonInfoType = new GraphQLObjectType({
	name:'flickrPersonInfo',
	description:'Get information about a user.',
	fields: ()=>({
		ispro:			{type:GraphQLString},
		can_buy_pro:	{type:GraphQLString},
		path_alias:		{type:GraphQLString},
		expire:			{type:GraphQLString},
		username:		{type:GraphQLString,
							resolve:({username})=>{return username._content}},
		realname:		{type:GraphQLString,
							resolve:({realname})=>{return realname._content}},
		mbox_sha1sum:	{type:GraphQLString,
							resolve:({mbox_sha1sum})=>{return mbox_sha1sum._content}},
		location:		{type:GraphQLString,
							resolve:({location})=>{return location._content}},
		timezone:		{type:GraphQLString,
							resolve:({timezone})=>{return timezone._label}},
		description:	{type:GraphQLString,
							resolve:({description})=>{return description._content}},
		photosurl:		{type:GraphQLString,
							resolve:({photosurl})=>{return photosurl._content}},
		profileurl:		{type:GraphQLString,
							resolve:({profileurl})=>{return profileurl._content}},
		mobileurl:		{type:GraphQLString,
							resolve:({mobileurl})=>{return mobileurl._content}},
		photos_count:	{type:GraphQLString,
							resolve:({photos})=>{return photos.count._content}},
		firstdatetaken: {type:GraphQLString,
							resolve:({photos})=>{return photos.firstdatetaken._content}},
		firstdate:		{type:GraphQLString,
							resolve:({photos})=>{return photos.firstdate._content}},
	})
	
})

const flickrSetType = new GraphQLObjectType({
	name:'flckrSetType',
	fields: () => ({
		id:				{type:GraphQLString},
		title:			{type:GraphQLString},
		description:	{type:GraphQLString}
	})
});

const flickrPhotosetType = require('./flickrPhotosetType');
const flickrPhotoType = require('./flickrPhotoType');
const flickrProfileType = require('./flickrProfileType');
const flickrGroupType = require('./flickrGroupType');
const flickrGalleryType = require('./flickrGalleryType');
const flickrTagType = require('./flickrTagType');