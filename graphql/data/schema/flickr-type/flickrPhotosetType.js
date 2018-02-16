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

const flickrPhotosetType = module.exports = new GraphQLObjectType({
	name:'flickrPhotoset',
	description:'return a user\'s photosets',
	fields: ()=>({
		id:			{type:GraphQLString},
		primary:	{type:GraphQLString},
		secret:		{type:GraphQLString},
		server:		{type:GraphQLString},
		farm:		{type:GraphQLInt},
		photos:		{type:GraphQLInt},
		videos:		{type:GraphQLInt},
		title:		{type:GraphQLString,
						resolve:({title}) =>{return title._content}},
		description:	{type:GraphQLString,
							resolve:({description}) =>{return description._content}},
		count_views:	{type:GraphQLInt},
		count_comment:	{type:GraphQLInt},
		date_create:	{type:GraphQLString},
		date_update:	{type:GraphQLString},
		
		/*--------------------nested-------------------*/
		photos:			{type:new GraphQLList(flickrPhotoType),
							resolve:({id},_,context)=> flickrAPI(context,resolveName="photosInSet",addon={"photoset_id":id},args={})},
		comments:		{type:new GraphQLList(flickrCommentType),
							resolve:({id},_,context)=> flickrAPI(context,resolveName="photosetComments",addon={"photoset_id":id},args={})},
	})
});

const flickrPhotoType = require('./flickrPhotoType');
const flickrCommentType = require('./flickrCommentType');