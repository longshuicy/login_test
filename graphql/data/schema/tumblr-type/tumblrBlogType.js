var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');
var tumblrAPI = require('../../../API/tumblrAPI');

const tumblrBlogType = module.exports = new GraphQLObjectType({
	name:'tumblrBlog',
	description:'',
	fields: () => ({
		type:				{type:GraphQLString},
		blog_name:			{type:GraphQLString},
		id:					{type:GraphQLString},
		post_url:			{type:GraphQLString},
		slug:				{type:GraphQLString},
		date:				{type:GraphQLString},
		timestamp:			{type:GraphQLString},
		state:				{type:GraphQLString},
		format:				{type:GraphQLString},
		reblog_key:			{type:GraphQLString},
		tags:				{type:new GraphQLList(GraphQLString)},
		short_url:			{type:GraphQLString},
		summary:			{type:GraphQLString},
		recommended_source:	{type:GraphQLString},
		recommended_color:	{type:GraphQLString},
		note_count:			{type:GraphQLInt},
		caption:			{type:GraphQLString},
		reblog_tree_html:	{type:GraphQLString,
								resolve:({reblog}) => {return reblog.tree_html}},
		reblog_comment:		{type:GraphQLString,
								resolve:({reblog}) => {return reblog.comment}},
		can_like:			{type:GraphQLBoolean},
		can_reblog:			{type:GraphQLBoolean},
		can_send_in_message:{type:GraphQLBoolean},
		can_reply:			{type:GraphQLBoolean},
		display_avatar:		{type:GraphQLBoolean},
		trail:				{type:new GraphQLList(tumblrTrailType)},
		photoset_layout:	{type:GraphQLString},
		photos:				{type:new GraphQLList(tumblrPhotoType)},
		featured_in_tag:	{type:new GraphQLList(GraphQLString)},
		featured_timestamp:	{type:GraphQLString},
		
		liked_timestamp:	{type:GraphQLString},
		
		/*---------------------------------nested-----------------------------------*/
		info:				{type:tumblrBlogInfoType,
								resolve:({blog_name},_,context)=>tumblrAPI(context,resolveName='blogInfo',id=blog_name,args={})},
		// careful, some return API error 403
		likes:				{type:new GraphQLList(tumblrBlogType),
								description:'This method can be used to retrieve the publicly exposed likes from a blog.',
								args:{
									limit:	{type:GraphQLInt,
												defaultValue:5},
									offset:	{type:GraphQLInt,
												description:'Liked post number to start at',
												defaultValue:0 },
									before:	{type:GraphQLString,
												description:'Retrieve posts liked before the specified timestamp'},
									after:	{type:GraphQLString,
												description:'Retrieve posts liked after the specified timestamp'},
								},
								resolve: ({blog_name},args,context) =>tumblrAPI(context, resolveName='blogLikes',id=blog_name,args=args)},
		posts:				{type:new GraphQLList(tumblrPostType),
								description:'Retrieve published posts for a blog',
								args:{
									type:	{type:GraphQLString,
												description:'choose between text, quote, link, answer, video, audio, photo, chat'},
									id:		{type:GraphQLString},
									tag:	{type:GraphQLString},
									limit:	{type:GraphQLInt,
												defaultValue:5},
									offset:	{type:GraphQLInt,
												description:'Liked post number to start at',
												defaultValue:0 },
									reblog_info:	{type:GraphQLBoolean,
														defaultValue:false},
									notes_info:		{type:GraphQLBoolean,
														defaultValue:false},
									fliter:			{type:GraphQLString,
														description:'choose between text, html, text, raw'}
									},
								resolve:({blog_name},args,context) =>tumblrAPI(context,resolveName='blogPosts',id=blog_name,args=args)
							},
	})
});

const tumblrTrailType = new GraphQLObjectType({
	name:'tumblrTrail',
	fields: () => ({
		blog:				{type:tempBlogType},
		post_id:			{type:GraphQLString,
								resolve: ({post})=>{return post.id}},
		content_raw:		{type:GraphQLString},
		content:			{type:GraphQLString},
		is_current_item:	{type:GraphQLBoolean},
		is_root_item:		{type:GraphQLBoolean},
		
	})
});

const tempBlogType = new GraphQLObjectType({
	name:'tempBlog',
	fields: () =>({
		name:			{type:GraphQLString},
		active:			{type:GraphQLBoolean},
		theme:			{type:tempThemeType},
		share_likes:	{type:GraphQLBoolean},
		share_following:{type:GraphQLBoolean},
		can_be_followed:{type:GraphQLBoolean},
	})
});

const tempThemeType = new GraphQLObjectType({
	name:'tempTheme',
	fields: () =>({
		header_full_width:		{type:GraphQLInt},
		header_full_height:		{type:GraphQLInt},
		header_focus_width:		{type:GraphQLInt},
		header_focus_height:	{type:GraphQLInt},
		avatar_shape:			{type:GraphQLString},
		background_color:		{type:GraphQLString},
		body_font:				{type:GraphQLString},
		header_bounds:			{type:GraphQLString},
		header_image:			{type:GraphQLString},
		header_image_focused:	{type:GraphQLString},
		header_image_scaled:	{type:GraphQLString},
		header_stretch:			{type:GraphQLBoolean},
		link_color:				{type:GraphQLString},
		show_avatar:			{type:GraphQLBoolean},
		show_description:		{type:GraphQLBoolean},
		show_header_image:		{type:GraphQLBoolean},
		show_title:				{type:GraphQLBoolean},
		title_color:			{type:GraphQLString},
		title_font:				{type:GraphQLString},
		title_font_weight:		{type:GraphQLString},
	})
});

const tumblrBlogInfoType = require('./tumblrBlogInfoType');
const tumblrPhotoType = require('./tumblrPhotoType');
const tumblrPostType = require('./tumblrPostType');
		
		