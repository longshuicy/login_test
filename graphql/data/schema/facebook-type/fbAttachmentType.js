var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat
} = require('graphql');

const fbAttachmentType = module.exports = new GraphQLObjectType({
	name: 'fbAttachment',
	description: 'Media content associated with a story or comment. Story attachments are accessed from the following endpoints:',
	fields: () => ({
		description:		{type: GraphQLString},
		description_tags:	{type: new GraphQLList(fbUserType)},
		media:				{type: GraphQLString},
		title:				{type: GraphQLString},
		type:				{type: GraphQLString},
		url:				{type: GraphQLString}
	})
});

const fbUserType = require('./fbUserType');