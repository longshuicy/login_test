var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat
} = require('graphql');
var getField = require('../../../API/fbAPI').getField;
var getEdge = require('../../../API/fbAPI').getEdge;

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
							resolve: ({id}) => getField({id},'attachment')},
		comment_count:	{ type: GraphQLInt,
							resolve: ({id}) => getField({id},'comment_count')},
		created_time:	{ type: GraphQLString,
							resolve: ({id}) => getField({id},'created_time')},
		from:			{ type: fbProfileType,
							resolve: ({id}) => getField({id},'from')},
		like_count:		{ type: GraphQLInt,
							resolve: ({id}) => getField({id},'like_count')},
		message:		{ type: GraphQLString,
							resolve: ({id}) => getField({id},'message')},
		parent:			{ type: fbCommentType,
							resolve: ({id}) => getField({id},'parent')},
		/*----------------------------------edges-------------------------------*/
		likes:			{ type: new GraphQLList(fbLikeType),	
								resolve: ({id}) => getEdge({id},'likes')},
		comments:		{ type: new GraphQLList(fbCommentType),
								resolve: ({id}) => getEdge({id},'comments')}
	})
});

const fbProfileType = require('./fbProfileType');
const fbEntityAtTextRangeType = require('./fbEntityAtTextRangeType');
const fbLikeType = require('./fbLikeType');
const fbAttachmentType = require('./fbAttachmentType');
