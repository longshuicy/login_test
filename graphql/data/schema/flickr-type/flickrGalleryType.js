var {GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');

var flickrAPI = require('../../../API/flickrAPI');

const flickrGalleryType = module.exports = new GraphQLObjectType({
	name:'flickrGallery',
	//description:'Return the list of galleries created by a user. Sorted from newest to oldest.',
	fields:()=>({
		id:						{type:GraphQLString},
		url:					{type:GraphQLString},
		owner:					{type:GraphQLString},
		date_created:			{type:GraphQLString},
		date_update:			{type:GraphQLString},
		primary_photo_id:		{type:GraphQLString},
		primary_photo_server:	{type:GraphQLInt},
		primary_photo_farm:		{type:GraphQLInt},
		primary_photo_secret:	{type:GraphQLInt},
		count_photos:			{type:GraphQLInt},
		count_videos:			{type:GraphQLInt},
		
		title:					{type:GraphQLString,
									resolve:({title})=>{return title._content}},
		description:			{type:GraphQLString,
									resolve:({description})=>{return description._content}},
		photosInGallery:		{type: new GraphQLList(flickrPhotoType),
									args: {
											page: 		{type:GraphQLInt, defaultvalue:1},
											per_page:	{type:GraphQLInt, defaultvalue:10}},
									resolve: ({id},args,context) => flickrAPI(context,resolveName="photosInGallery", addon ={"gallery_id":id},args=args)},
		})
});

const flickrPhotoType = require('./flickrPhotoType');
		
		