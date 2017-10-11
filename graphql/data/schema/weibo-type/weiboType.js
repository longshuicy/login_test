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

const weiboType = module.exports = new GraphQLObjectType({
	name:'weibo',
	fields: () => ({
		created_at:				{type:GraphQLString},
		id:						{type:GraphQLString},
		text:					{type:GraphQLString},
		source:					{type:GraphQLString},
		favorited:				{type:GraphQLBoolean},
		truncated:				{type:GraphQLBoolean},
		in_reply_to_status_id:	{type:GraphQLString},
		in_reply_to_user_id:	{type:GraphQLString},
		in_reply_to_screen_name:{type:GraphQLString},
		geo:					{type:GraphQLString},
		mid:					{type:GraphQLString},
		reposts_count:			{type:GraphQLInt},
		comments_count:			{type:GraphQLInt},
		annotations:			{type:new GraphQLList(weiboAnnotationType)},
		user:					{type:weiboUserType},
		
		/*------------------------nested----------------------*/
		count:					{type:new GraphQLList(weiboCountType),
									resolve:({id}) => weiboAPI(resolveName='statuses_count',id=id,args={})},
		comments:				{type:new GraphQLList(weiboCommentType),
									args:{
											count:				{type:GraphQLInt,defaultValue:10,description:'return weibo count'},
											page:				{type:GraphQLInt,defaultValue:1},
											filter_by_author:	{type:GraphQLInt,defaultValue:0,description:'0:all, 1:my follower, 2:stranger'},
									},
									resolve:({id}) => weiboAPI(resolveName='comments', id=id, args ={})},
		//reposts:				{type:new GraphQLList(GraphQLString),
		//							resolve:({id}) => weiboAPI(resolveName='repost_timeline', id=id, args={})},
		
		})
});

const weiboAnnotationType = new GraphQLObjectType({
	name:'weiboAnnotation',
	fields:() => ({
		shooting:		{type:GraphQLInt},
		client_mblogid:	{type:GraphQLString},
		mpi_request:	{type:GraphQLBoolean},
	})
});

const weiboCountType = new GraphQLObjectType({
	name:'weiboCount',
	fields: () =>({
		id:			{type:GraphQLString},
		comments:	{type:GraphQLInt},
		reposts:	{type:GraphQLInt},
		attitudes:	{type:GraphQLInt},
	})
})

const weiboCommentType = require('./weiboCommentType');
const weiboUserType = require('./weiboUserType');