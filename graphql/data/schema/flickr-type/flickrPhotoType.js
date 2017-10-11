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

const flickrPhotoType = module.exports = new GraphQLObjectType({
	name:'flickrPhoto',
	description:'return a list of photos',
	fields: ()=>({
		id:			{type:GraphQLString },
		nsid:		{type:GraphQLString,
						resolve: ({owner})=>owner},
		secret:		{type:GraphQLString },
		server:		{type:GraphQLString },
		farm:		{type:GraphQLInt },
		title:		{type:GraphQLString },
		ispublic:	{type:GraphQLInt },
		isfriend:	{type:GraphQLInt },
		isfamily:	{type:GraphQLInt },
		/*------------------nested---------------------*/
		streamContext: 	{type:flickrContextType,
							resolve:({id}) => flickrAPI(endpoint="photos.getContext",addon={"photo_id": id},args={},resolveName="streamContext")},
		//setContext:	{type:flickrContextType,
		//				resolve:({id}) => flickrGeneric(endpoint="photosets.getContext", addon={"photo_id": id},args={})},
		Exif:		{type:new GraphQLList(flickrExifType),
						resolve:({id}) => flickrAPI(endpoint="photos.getExif",addon={"photo_id": id},args={},resolveName="exif")},
						
		favoritePeople:	{type:new GraphQLList(flickrPersonType),
						resolve:({id}) => flickrAPI(endpoint="photos.getFavorites",addon={"photo_id": id},args={},resolveName="favoritePeople")},
						
		people:		{type:new GraphQLList(flickrPersonType),
						resolve:({id}) => flickrAPI(endpoint="photos.people.getList",addon={"photo_id": id},args={},resolveName="people")},
						
		info:		{type:flickrPhotoInfoType,
						resolve: ({id})=> flickrAPI(endpoint="photos.getInfo",addon={"photo_id": id},args={},resolveName="photoInfo")},
						
		size:		{type:new GraphQLList(flickrSizeType),
						resolve: ({id}) => flickrAPI(endpoint="photos.getSizes",addon={"photo_id": id},args={},resolveName="size")},
						
		comments:	{type:new GraphQLList(flickrCommentType),
						args:{
							min_comment_date:{
								type:GraphQLString,
								description:'Minimum date that a a comment was added. The date should be in the form of a unix timestamp.'
								},
							max_comment_date:{
								type:GraphQLString,
								description:'Maximum date that a a comment was added. The date should be in the form of a unix timestamp.'
							}
						},
						resolve:({id},args) => flickrAPI(endpoint="photos.comments.getList", addon={"photo_id":id},args=args,resolveName="comments")},
						
		locations:	{type: flickrLocationType,
						resolve:({id}) => flickrAPI(endpoint="photos.geo.getLocation", addon={"photo_id":id},args={},resolveName="locations")},
						
		galleriesOf:		{type: new GraphQLList(flickrGalleryType),
							description:'Return the list of galleries to which a photo has been added. Galleries are returned sorted by date which the photo was added to the gallery.',
							args: {
							page: 		{type:GraphQLInt, defaultValue:1},
							per_page:	{type:GraphQLInt, defaultValue:10}},
						resolve: ({id},args) => flickrAPI(endpoint = "galleries.getListForPhoto", addon = {"photo_id":id}, args = args,resolveName='galleriesOf')},
	})
});

/*)---------------------the following types are about person----------------------------------*/
const flickrPersonType  = require('./flickrPersonType');

/*----------------------the following types are about photo---------------------------------*/
const flickrPhotoInfoType = new GraphQLObjectType({
	name:'flickrInfo',
	description:'',
	fields:()=>({
		id:				{type:GraphQLString},
		secret:			{type:GraphQLString},
		server:			{type:GraphQLString},
		farm:			{type:GraphQLString},
		dateuploaded:	{type:GraphQLString},
		isfavorite:		{type:GraphQLString},
		license:		{type:GraphQLString},
		safety_level:	{type:GraphQLString},
		rotation:		{type:GraphQLString},
		views:			{type:GraphQLString},
		media:			{type:GraphQLString},
		views:			{type:GraphQLString},
		media:			{type:GraphQLString},
		
		owner:			{type:flickrPersonType},
		title:			{type:GraphQLString,
							resolve: ({title})=>{return title._content}},
		description:	{type:GraphQLString,
							resolve: ({description})=>{return description._content}},
		dates:			{type:flickrDateType},
		comments:		{type:GraphQLString,
							resolve: ({comments})=>{return comments._content}},
		tagged:			{type:new GraphQLList(flickrTaggedType),
							resolve: ({tags})=>{return tags.tag}},
		urls:			{type:new GraphQLList(flickrUrlType),
							resolve: ({urls}) =>{return urls.url}}
	})
});
const flickrUrlType = new GraphQLObjectType({
	name:'flickrUrl',
	description:'return a URL',
	fields:() =>({
		type:		{type:GraphQLString},
		_content:	{type:GraphQLString},
	})
});
const flickrTaggedType = new GraphQLObjectType({
	name:'flickrTagged',
	description:'return a Tagged in photo',
	fields: () =>({
		id:			{type:GraphQLString},
		author:		{type:GraphQLString},
		authorname:	{type:GraphQLString},
		raw:		{type:GraphQLString},
		_content:	{type:GraphQLString},
		machine_tag:{type:GraphQLString}
	})
});
const flickrDateType = new GraphQLObjectType({
	name:'flickrDate',
	description:'return Date information',
	fields: ()=>({
		posted:				{type:GraphQLString},
		taken:				{type:GraphQLString},
		takengranularity:	{type:GraphQLString},
		takenunknown:		{type:GraphQLString},
		lastupdate:			{type:GraphQLString}
	})
});
const flickrSizeType = new GraphQLObjectType({
	name:'flickrSize',
	description:'Returns the available sizes for a photo. The calling user must have permission to view the photo.',
	fields:()=>({
		label:	{type:GraphQLString},
		width:	{type:GraphQLString},
		height:	{type:GraphQLString},
		source:	{type:GraphQLString},
		url:	{type:GraphQLString},
		media:	{type:GraphQLString}
	})
})
const flickrExifType = new GraphQLObjectType({
	name:'flickrExif',
	description:'Retrieves a list of EXIF/TIFF/GPS tags for a given photo. The calling user must have permission to view the photo.',
	fields: ()=>({
		tagspace:	{type:GraphQLString},
		tagspaceid:	{type:GraphQLInt},
		tag:		{type:GraphQLString},
		label:		{type:GraphQLString},
		raw: 		{type:GraphQLString,
						resolve:({raw}) => { return raw._content }}
	})
});
const flickrContextType = new GraphQLObjectType({
	name:'flickrContext',
	description:'Returns next and previous photos for a photo in a Photostream or Photoset.',
	fields: ()=>({
		prevphoto:	{type: flickrPhotoType},
		nextphoto:	{type: flickrPhotoType}
	})
});
const flickrLocationType = new GraphQLObjectType({
	name:'flickrLocation',
	description:'Get the geo data (latitude and longitude and the accuracy level) for a photo.',
	fields: ()=>({
		latitude:	{type:GraphQLFloat},
		longitude:	{type:GraphQLFloat},
		accuracy:	{type: GraphQLInt}
	})
});
const flickrCommentType = require('./flickrCommentType');
const flickrGalleryType = require('./flickrGalleryType');






