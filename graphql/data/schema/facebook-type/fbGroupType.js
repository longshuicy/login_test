var {
	GraphQLList,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLFloat
} = require('graphql');
var facebookAPI = require('../../../API/fbAPI');

const fbGroupType = module.exports = new GraphQLObjectType({
	name: 'fbGroup',
	description:'Represents a Facebook group.',
	fields: ()=>({
		/*-------------------------------------fields------------------------------------*/
		id:						{ type: GraphQLString },
		cover: 					{ type: fbCoverPhotoType,
									resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'cover')},
		description: 			{ type: GraphQLString,
									resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'description')},
		email:					{ type: GraphQLString,
									resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'email')},
		icon:					{ type: GraphQLString,
									resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'icon')},
		member_request_count:	{ type: GraphQLInt,
									resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'member_request_count')},
		name:					{ type: GraphQLString},
		owner: 					{ type: fbProfileType},
		parent: 				{ type: fbProfileType},
		privacy: 				{ type: GraphQLString,
									resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'privacy')},
		updated_time:			{ type: GraphQLString,
									resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'updated_time')},
		/*-------------------------------------edges------------------------------------*/
		admins:					{ type: new GraphQLList(fbUserType),
									resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'admins')},
		albums:					{ type: new GraphQLList(fbAlbumType),
									resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'albums')},
		events:					{ type: new GraphQLList(fbEventType),
									resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'events')},				
		members:				{ type: new GraphQLList(fbUserType),
									resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'members')},
		photos:					{ type: new GraphQLList(fbPhotoType),
									resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'photos')},
		feed:					{ type: new GraphQLList(fbPostType),
									resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'feed')},
		videos:					{ type: new GraphQLList(fbVideoType),
									resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'videos')}
	})
});

const fbCoverPhotoType = require('./fbCoverPhotoType');
const fbUserType = require('./fbUserType');
const fbPageType = require('./fbPageType');
const fbPhotoType = require('./fbPhotoType');
const fbAlbumType = require('./fbAlbumType');
const fbEventType = require('./fbEventType');
const fbPostType = require('./fbPostType');
const fbVideoType = require('./fbVideoType');
const fbProfileType = require('./fbProfileType');