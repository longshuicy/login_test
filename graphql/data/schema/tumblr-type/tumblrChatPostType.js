var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');

const tumblrChatPostType = module.exports = new GraphQLObjectType({
	name:'tumblrChatPostType',
	description:'',
	fields: () => ({
		type:				{type:GraphQLString},
		blog_name:			{type:GraphQLString},
		id:					{type:GraphQLString},
		post_url:			{type:GraphQLString},
		date:				{type:GraphQLString},
		timestamp:			{type:GraphQLString},
		format:				{type:GraphQLString},
		reblog_key:			{type:GraphQLString},
		tags:				{type:new GraphQLList(GraphQLString)},
		bookmarklet:		{type:GraphQLBoolean},
		mobile:				{type:GraphQLBoolean},
		source_url:			{type:GraphQLString},
		source_title:		{type:GraphQLString},
		liked:				{type:GraphQLBoolean},
		state:				{type:GraphQLString},
		total_posts:		{type:GraphQLInt},
		note_count:			{type:GraphQLInt},
		
		title:				{type:GraphQLString},
		body:				{type:GraphQLString},
		dialogue:			{type:new GraphQLList(tumblrDialogueType)},
	})
});

const tumblrDialogueType = new GraphQLObjectType({
	name:'tumblrDialogue',
	fields: () =>({
		label:	{type:GraphQLString},
		name:	{type:GraphQLString},
		phrase:	{type:GraphQLString},
	})
});