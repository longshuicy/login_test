var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');

const tumblrAudioPostType = module.exports = new GraphQLObjectType({
	name:'tumblrAudioPostType',
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
		
		caption:			{type:GraphQLString},
		player:				{type:GraphQLString},
		plays:				{type:GraphQLInt},
		album_art:			{type:GraphQLString},
		artist:				{type:GraphQLString},
		album:				{type:GraphQLString},
		track_name:			{type:GraphQLString},
		track_number:		{type:GraphQLInt},
		year:				{type:GraphQLInt},
	})
});