var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');
var weiboAPI = require('./../../API/weiboAPI');

const weiboQueryType = module.exports = new GraphQLObjectType({
	name:'weiboQuery',
	description:'',
	fields: () => ({
		public_timeline:{
			type:new GraphQLList(weiboType),
			args:{
				count:		{type:GraphQLInt,defaultValue:10,description:'return weibo count'},
				page:		{type:GraphQLInt,defaultValue:1},
				base_app:	{type:GraphQLInt,defaultValue:0},
			},
			description:'return the newest public weibos',
			resolve: (_,args) => weiboAPI(resolveName='public_timeline',id='',args = args),
		},
		
		emotions:{
			type:new GraphQLList(weiboEmotionType),
			args:{
				type:		{type:GraphQLString, defaultValue:'face',description:'value should be chose beteen face, ani, and cartoon'},
				language:	{type:GraphQLString, defaultValue:'cnname',description:'cnname = simplified Chinese, twname = chinese'},
			},
			description:'return the detail information about the official emoticon of weibo',
			resolve: (_,args) => weiboAPI(resolveName='emotions', id='', args = args),
		},
		
		/*trends:{
			type: new GraphQLList(GraphQLString),
			description:'return the trend within 1 hours',
			resolve: () => weiboAPI(resolveName='trend_hr',id='',args={}),
		},Insufficient app permission*/
		/*schools:{
			type:new GraphQLList(weiboSchoolType),
			args:{
				province:	{type:GraphQLInt},
				city:		{type:GraphQLInt},
				area:		{type:GraphQLInt},
				type:		{type:GraphQLInt, defaultValue:1, description:'1:college,2:highschool,3:tradeschool,4:juniorhigh,5:primary'},
				capital:	{type:GraphQLString},
				keyword:	{type:GraphQLString},
				count:		{type:GraphQLInt,default:10},
			},
			description:'return a list of schools',
			resolve:(_,args) => weiboAPI(resolveName='schools',id='', args=args), Insufficient app permission 
		}*/
		
	})
});

const weiboSchoolType =require('./weibo-type/weiboSchoolType');
const weiboType = require('./weibo-type/weiboType');
const weiboEmotionType = require('./weibo-type/weiboEmotionType');