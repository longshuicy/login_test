var {
	GraphQLList,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLFloat
} = require('graphql');
var facebookAPI = require('../../../API/fbAPI');

const fbEventType = module.exports = new GraphQLObjectType({
	name: 'fbEvent',
	description: 'Return a facebook event.',
	fields: ()=>({
		/*---------------------------fields----------------------*/
		id:					{ type:GraphQLString },
		name:				{ type:GraphQLString},
		description: 		{ type:GraphQLString,
								resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'description')},
		end_time:			{ type:GraphQLString,
								resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'end_time')},
		attending_count:	{ type:GraphQLInt,
								resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'attending_count')},
		category:			{ type:GraphQLString,
								resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'category')},
		declined_count:		{ type:GraphQLInt,
								resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'declined_count')},
		interested_count:	{ type:GraphQLInt,
								resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'interested_count')},
		maybe_count:		{ type:GraphQLInt,
								resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'maybe_count')},
		noreply_count:		{ type:GraphQLInt,
								resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'noreply_count')},
		start_time:			{ type: GraphQLString,
								resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'start_time')},
		ticket_uri:			{ type: GraphQLString,
								resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'ticket_uri')},
		timezone:			{ type: GraphQLString,
								resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'timezone')},
		type:				{ type: GraphQLString,
								resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'type')},
		updated_time:		{ type: GraphQLString,
								resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'updated_time')},
		cover:				{ type: fbCoverPhotoType,
								resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'cover')},
		place:				{ type: fbPlaceType,
								resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'place')},
		parent_group:		{ type: fbGroupType,
								resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'parent_group')},
								
		/*-----------------------------edges-----------------------------*/
		admins:				{ type: new GraphQLList(fbUserType),
								resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'admins')},
		attending:			{ type: new GraphQLList(fbUserType),
								resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'attending')},
		comments:			{ type: new GraphQLList(fbCommentType),
								resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'comments')},
		declined:			{ type: new GraphQLList(fbUserType),
								resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'declined')},
		interested:			{ type: new GraphQLList(fbUserType),
								resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'interested')},
		maybe:				{ type: new GraphQLList(fbUserType),
								resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'maybe')},
		noreply:			{ type: new GraphQLList(fbUserType),
								resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'noreply')},
		photos:				{ type: new GraphQLList(fbPhotoType),
								resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'photos')},
		picture:			{ type: fbProfilePictureType,
									resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'picture')},
		videos:				{ type: new GraphQLList(fbVideoType),
								resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'videos')},
		feed:				{ type: new GraphQLList(fbPostType),
								resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'feed')}		
	})
});

const fbCoverPhotoType = require('./fbCoverPhotoType');
const fbPlaceType = require('./fbPlaceType');
const fbGroupType = require('./fbGroupType');
const fbUserType = require('./fbUserType');
const fbPhotoType = require('./fbPhotoType');
const fbCommentType = require('./fbCommentType');
const fbVideoType = require('./fbVideoType');
const fbPostType = require('./fbPostType');
const fbProfilePictureType = require('./fbProfilePicType');