var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');
var weiboAPI = require('../../../API/weiboAPI');

const weiboUserType = module.exports = new GraphQLObjectType({
	name:'weiboUser',
	fields: () => ({
		screen_name:		{type:GraphQLString},
		followers_count:	{type:GraphQLInt},
		//uid:				{type:GraphQLString},
		id:					{type:GraphQLString},
		idstr:				{type:GraphQLString},
		name:				{type:GraphQLString},
		province:			{type:GraphQLString},
		city:				{type:GraphQLString},
		location:			{type:GraphQLString},
		description:		{type:GraphQLString},
		url:				{type:GraphQLString},
		profile_image_url:	{type:GraphQLString},
		profile_url:		{type:GraphQLString},
		domain:				{type:GraphQLString},
		weihao:				{type:GraphQLString},
		gender:				{type:GraphQLString},
		friends_count:		{type:GraphQLInt},
		statuses_count:		{type:GraphQLInt},
		favourites_count:	{type:GraphQLInt},
		created_at:			{type:GraphQLString},
		following:			{type:GraphQLBoolean},
		allow_all_act_msg:	{type:GraphQLBoolean},
		geo_enabled:		{type:GraphQLBoolean},
		verified:			{type:GraphQLBoolean},
		verified_type:		{type:GraphQLInt},
		allow_all_comment:	{type:GraphQLBoolean},
		avatar_large:		{type:GraphQLString},
		verified_reason:	{type:GraphQLString},
		follow_me:			{type:GraphQLBoolean},
		online_status:		{type:GraphQLInt},
		bi_followers_count:	{type:GraphQLInt},
		//lang:				{type:GraphQLString},
		
		/*------------------------------nested---------------------------*/
		//timeline:			{type:new GraphQLList(weiboType),
		//						resolve:({id}) => weiboAPI(resolveName='user_timeline', id=id, args={})},
	})
});

const weiboType = require('./weiboType')