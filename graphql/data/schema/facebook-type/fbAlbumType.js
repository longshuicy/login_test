var {
	GraphQLList,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLFloat
} = require('graphql');
var getField = require('../../../API/fbAPI').getField;
var getEdge = require('../../../API/fbAPI').getEdge;

const fbAlbumType = module.exports = new GraphQLObjectType({
	name: 'fbAlbum',
	description: 'Return a facebook album.',
	fields: () => ({
		/*-------------------------- fields -----------------------------------*/
		id:				{ type: GraphQLString },
		name: 			{ type: GraphQLString },
		created_time:	{ type: GraphQLString },
		count: 			{ type: GraphQLInt,
							resolve: ({id}) => getField({id},'count')},
		
		description:	{ type: GraphQLString,
							resolve: ({id}) => getField({id},'description')},
		link:			{ type: GraphQLString,
							resolve: ({id}) => getField({id},'link')},
		location:		{ type: GraphQLString,
							resolve: ({id}) => getField({id},'location')},
		privacy:		{ type: GraphQLString,
							resolve: ({id}) => getField({id},'privacy')},
		type:			{ type: GraphQLString,
							resolve: ({id}) => getField({id},'type')},
		updated_time: 	{ type: GraphQLString,
							resolve: ({id}) => getField({id},'updated_time')},
		from:			{ type: fbProfileType,
							resolve: ({id}) => getField({id},'from')},
		place:			{ type: fbPageType,
							resolve: ({id}) => getField({id},'place')},
		cover_photo:	{ type: fbPhotoType,
							resolve: ({id}) => getField({id},'cover_photo')},
		event:			{ type: fbEventType,
							resolve: ({id}) => getField({id},'event')},
		/*-------------------------- edges ---------------------------------- */
		photos:			{ type: new GraphQLList(fbPhotoType),
							resolve: ({id}) => getEdge({id},'photos')},
		sharedposts:	{ type: new GraphQLList(fbPostType),
							resolve: ({id}) => getEdge({id},'sharedposts')},
		likes:			{ type: new GraphQLList(fbLikeType),
							resolve: ({id}) => getEdge({id},'likes')},
		reactions:		{ type: new GraphQLList(fbReactionType),
							resolve: ({id}) => getEdge({id},'reactions')},
		comments:		{ type: new GraphQLList(fbCommentType),
							resolve: ({id}) => getEdge({id},'comments')}
	})
});

const fbProfileType = require('./fbProfileType');
const fbUserType = require('./fbUserType');
const fbPageType = require('./fbPageType');
const fbPhotoType = require('./fbPhotoType');
const fbEventType = require('./fbEventType');
const fbCommentType = require('./fbCommentType');
const fbLikeType = require('./fbLikeType');
const fbReactionType = require('./fbReactionType');
const fbPostType = require('./fbPostType');
		