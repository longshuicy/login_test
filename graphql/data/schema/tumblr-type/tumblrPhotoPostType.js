var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');

const tumblrPhotoPostType = module.exports = new GraphQLObjectType({
	name:'tumblrPhotoPostType',
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
		photos:				{type:new GraphQLList(tumblrPhotoType)},
		caption:			{type:GraphQLString},
		width:				{type:GraphQLInt},
		height:				{type:GraphQLInt},
	})
});

const tumblrPhotoType = require('./tumblrPhotoType');