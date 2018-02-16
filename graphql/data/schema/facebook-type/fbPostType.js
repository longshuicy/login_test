var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat
} = require('graphql');
var facebookAPI = require('../../../API/fbAPI');

const fbPostType = module.exports = new GraphQLObjectType({
	name: 'fbPost',
	description: 'An individual entry in a profile\'s feed. The profile could be a user, page, app, or group.',
	fields: () => ({
		/*----------------------------fields----------------------------------*/
		id:				{type:GraphQLString},
		caption:		{type:GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'caption')},
		created_time:	{type:GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'created_time')},
		description:	{type:GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'description')},
		from:			{type:fbProfileType,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'from')},
		icon:			{type:GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'icon')},
		link:			{type:GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'link')},
		message:		{type:GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'message')},
		name:			{type:GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'name')},
		object_id:		{type:GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'object_id')},
		parent_id:		{type:GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'parent_id')},
		permalink_url:	{type:GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'permalink_url')},
		picture:		{type:GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'picture')},
		place:			{type:fbPlaceType,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'place')},
		share:			{type:GraphQLInt,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'share')},
		source:			{type:GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'source')},
		status_type:	{type:GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'status_type')},
		story:			{type:GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'story')},
		to:				{type:new GraphQLList(fbProfileType),
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'to')},
		type:			{type:GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'type')},
		updated_time:	{type:GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'updated_time')},
		with_tags:		{type:new GraphQLList(fbUserType),
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'with_tags')},
		/*------------------------------edges--------------------------------*/
		likes:			{ type: new GraphQLList(fbLikeType),
									resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'likes')},
		reactions:		{ type: new GraphQLList(fbReactionType),
								resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'reactions')},
		comments:		{ type: new GraphQLList(fbCommentType),
								resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'comments')},
		sharedposts:	{ type: new GraphQLList(fbPostType),
								resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'sharedposts')},
		attachments:	{ type: new GraphQLList(fbAttachmentType),
								resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'attachments')}
	})
});

const fbUserType = require('./fbUserType');
const fbPlaceType = require('./fbPlaceType');
const fbLikeType = require('./fbLikeType');
const fbReactionType = require('./fbReactionType');
const fbCommentType = require('./fbCommentType');
const fbAttachmentType = require('./fbAttachmentType');
const fbProfileType = require('./fbProfileType');
		