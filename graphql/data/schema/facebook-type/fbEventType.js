var {
	GraphQLList,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLFloat
} = require('graphql');
var getField = require('../../../API/fbAPI').getField;
var getEdge = require('../../../API/fbAPI').getEdge;

const fbEventType = module.exports = new GraphQLObjectType({
	name: 'fbEvent',
	description: 'Return a facebook event.',
	fields: ()=>({
		/*---------------------------fields----------------------*/
		id:					{ type:GraphQLString },
		name:				{ type:GraphQLString},
		description: 		{ type:GraphQLString,
								resolve: ({id}) => getField({id},'description')},
		end_time:			{ type:GraphQLString,
								resolve: ({id}) => getField({id},'end_time')},
		attending_count:	{ type:GraphQLInt,
								resolve: ({id}) => getField({id},'attending_count')},
		category:			{ type:GraphQLString,
								resolve: ({id}) => getField({id},'category')},
		declined_count:		{ type:GraphQLInt,
								resolve: ({id}) => getField({id},'declined_count')},
		interested_count:	{ type:GraphQLInt,
								resolve: ({id}) => getField({id},'interested_count')},
		maybe_count:		{ type:GraphQLInt,
								resolve: ({id}) => getField({id},'maybe_count')},
		noreply_count:		{ type:GraphQLInt,
								resolve: ({id}) => getField({id},'noreply_count')},
		start_time:			{ type: GraphQLString,
								resolve: ({id}) => getField({id},'start_time')},
		ticket_uri:			{ type: GraphQLString,
								resolve: ({id}) => getField({id},'ticket_uri')},
		timezone:			{ type: GraphQLString,
								resolve: ({id}) => getField({id},'timezone')},
		type:				{ type: GraphQLString,
								resolve: ({id}) => getField({id},'type')},
		updated_time:		{ type: GraphQLString,
								resolve: ({id}) => getField({id},'updated_time')},
		cover:				{ type: fbCoverPhotoType,
								resolve: ({id}) => getField({id},'cover')},
		place:				{ type: fbPlaceType,
								resolve: ({id}) => getField({id},'place')},
		parent_group:		{ type: fbGroupType,
								resolve: ({id}) => getField({id},'parent_group')},
								
		/*-----------------------------edges-----------------------------*/
		admins:				{ type: new GraphQLList(fbUserType),
								resolve: ({id}) => getEdge({id},'admins')},
		attending:			{ type: new GraphQLList(fbUserType),
								resolve: ({id}) => getEdge({id},'attending')},
		comments:			{ type: new GraphQLList(fbCommentType),
								resolve: ({id}) => getEdge({id},'comments')},
		declined:			{ type: new GraphQLList(fbUserType),
								resolve: ({id}) => getEdge({id},'declined')},
		interested:			{ type: new GraphQLList(fbUserType),
								resolve: ({id}) => getEdge({id},'interested')},
		maybe:				{ type: new GraphQLList(fbUserType),
								resolve: ({id}) => getEdge({id},'maybe')},
		noreply:			{ type: new GraphQLList(fbUserType),
								resolve: ({id}) => getEdge({id},'noreply')},
		photos:				{ type: new GraphQLList(fbPhotoType),
								resolve: ({id}) => getEdge({id},'photos')},
		picture:			{ type: fbProfilePictureType,
									resolve: ({id}) => getEdge({id},'picture')},
		videos:				{ type: new GraphQLList(fbVideoType),
								resolve: ({id}) => getEdge({id},'videos')},
		feed:				{ type: new GraphQLList(fbPostType),
								resolve: ({id}) => getEdge({id},'feed')}		
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