var {
	GraphQLList,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLFloat
} = require('graphql');
var getField = require('../../../API/fbAPI').getField;
var getEdge = require('../../../API/fbAPI').getEdge;

const fbGroupType = module.exports = new GraphQLObjectType({
	name: 'fbGroup',
	description:'Represents a Facebook group.',
	fields: ()=>({
		/*-------------------------------------fields------------------------------------*/
		id:						{ type: GraphQLString },
		cover: 					{ type: fbCoverPhotoType,
									resolve: ({id}) => getField({id},'cover')},
		description: 			{ type: GraphQLString,
									resolve: ({id}) => getField({id},'description')},
		email:					{ type: GraphQLString,
									resolve: ({id}) => getField({id},'email')},
		icon:					{ type: GraphQLString,
									resolve: ({id}) => getField({id},'icon')},
		member_request_count:	{ type: GraphQLInt,
									resolve: ({id}) => getField({id},'member_request_count')},
		name:					{ type: GraphQLString},
		owner: 					{ type: fbProfileType},
		parent: 				{ type: fbProfileType},
		privacy: 				{ type: GraphQLString,
									resolve: ({id}) => getField({id},'privacy')},
		updated_time:			{ type: GraphQLString,
									resolve: ({id}) => getField({id},'updated_time')},
		/*-------------------------------------edges------------------------------------*/
		admins:					{ type: new GraphQLList(fbUserType),
									resolve: ({id}) => getEdge({id},'admins')},
		albums:					{ type: new GraphQLList(fbAlbumType),
									resolve: ({id}) => getEdge({id},'albums')},
		events:					{ type: new GraphQLList(fbEventType),
									resolve: ({id}) => getEdge({id},'events')},				
		members:				{ type: new GraphQLList(fbUserType),
									resolve: ({id}) => getEdge({id},'members')},
		photos:					{ type: new GraphQLList(fbPhotoType),
									resolve: ({id}) => getEdge({id},'photos')},
		feed:					{ type: new GraphQLList(fbPostType),
									resolve: ({id}) => getEdge({id},'feed')},
		videos:					{ type: new GraphQLList(fbVideoType),
									resolve: ({id}) => getEdge({id},'videos')}
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