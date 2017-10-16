var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat
} = require('graphql');
var facebookAPI = require('../../../API/fbAPI');

const fbCommentType = module.exports = new GraphQLObjectType({
	name:'fbComment',
	description:`A comment can be made on various types of content
	on Facebook. Most Graph API nodes have a /comments edge that 
	lists all the comments on that object. The /{comment-id} node
	returns a single comment.`,
	fields: ()=>({
		/*-----------------------------------fields------------------------------*/
		id:				{ type: GraphQLString},
		attachment:		{ type: fbAttachmentType,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'attachment')},
		comment_count:	{ type: GraphQLInt,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'comment_count')},
		created_time:	{ type: GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'created_time')},
		from:			{ type: fbProfileType,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'from')},
		like_count:		{ type: GraphQLInt,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'like_count')},
		message:		{ type: GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'message')},
		parent:			{ type: fbCommentType,
							resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'parent')},
		/*----------------------------------edges-------------------------------*/
		likes:			{ type: new GraphQLList(fbLikeType),	
								resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'likes')},
		comments:		{ type: new GraphQLList(fbCommentType),
								resolve: ({id},_,context) => facebookAPI(context,'getEdge',{id},'comments')}
	})
});

const fbProfileType = require('./fbProfileType');
const fbEntityAtTextRangeType = require('./fbEntityAtTextRangeType');
const fbLikeType = require('./fbLikeType');
const fbAttachmentType = require('./fbAttachmentType');
