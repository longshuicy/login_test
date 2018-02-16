var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');

const tumblrLinkPostType = module.exports = new GraphQLObjectType({
	name:'tumblrLinkPostType',
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
		url:				{type:GraphQLString},
		author:				{type:GraphQLString},
		excerpt:			{type:GraphQLString},
		publisher:			{type:GraphQLString},
		photos:				{type:new GraphQLList(tumblrPhotoType)},
		description:		{type:GraphQLString},
	})
});

const tumblrPhotoType = require('./tumblrPhotoType');