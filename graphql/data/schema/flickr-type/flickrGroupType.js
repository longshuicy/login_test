var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');

var flickrAPI = require('../../../API/flickrAPI');

const flickrGroupType = module.exports = new GraphQLObjectType({
	name:'flickrGroup',
	description:'Search for groups. 18+ groups will only be returned for authenticated calls where the authenticated user is over 18.',
	fields: ()=>({
		nsid:			{type:GraphQLString},
		name:			{type:GraphQLString},
		eighteenplus:	{type:GraphQLString},
		iconfarm:		{type:GraphQLInt},
		iconserver:		{type:GraphQLInt},
		admin:			{type:GraphQLInt},
		invitation_only:	{type:GraphQLString},
		members:			{type:GraphQLString},
		pool_count:			{type:GraphQLInt},
		
		groupInfo:			{type:flickrGroupInfoType,
								resolve:({nsid},_,context)=>flickrAPI(context,resolveName="groupInfo",addon={"group_id":nsid},args={})},
								
		topics:				{type: new GraphQLList(flickrTopicType),
								description:'Get a list of discussion topics in a group.',
									resolve:({nsid},_,context)=>flickrAPI(context,resolveName="topics",addon={"group_id":nsid},args={})},
		})
});

const flickrGroupInfoType = new GraphQLObjectType({
	name:'flickrGroupInfo',
	description:'Get information about a group.',
	fields: ()=>({
		id:					{type:GraphQLString},
		iconserver:			{type:GraphQLInt},
		iconfarm:			{type:GraphQLInt},
		lang:				{type:GraphQLString},
		ispoolmoderated:	{type:GraphQLInt},
		
		name:				{type:GraphQLString,
								resolve:({name})=>{return name._content}},
		description:		{type:GraphQLString,
								resolve:({description})=>{return description._content}},
		members:			{type:GraphQLInt,
								resolve:({members})=>{return members._content}},
		privacy:			{type:GraphQLInt,
								resolve:({privacy})=>{return privacy._content}},		
	})
});

const flickrTopicType = new GraphQLObjectType({
	name:'flickrTopic',
	description:'',
	fields: () =>({
		id:						{type:GraphQLString},
		subject:				{type:GraphQLString},
		author:					{type:GraphQLString},
		authorname:				{type:GraphQLString},
		author_path_alias:		{type:GraphQLString},
		author_is_deleted:		{type:GraphQLString},
		is_pro:					{type:GraphQLString},
		role:					{type:GraphQLString},
		iconserver:				{type:GraphQLString},
		iconfarm:				{type:GraphQLString},
		count_replies:			{type:GraphQLString},
		can_edit:				{type:GraphQLString},
		can_delete:				{type:GraphQLString},
		can_reply:				{type:GraphQLString},
		is_sticky:				{type:GraphQLString},
		is_locked:				{type:GraphQLString},
		datecreate:				{type:GraphQLString},
		datelastpost:			{type:GraphQLString},
		last_reply:				{type:GraphQLString},
		lastedit:				{type:GraphQLString},
		
		message:				{type:GraphQLString,
									resolve: ({message})=>{return message._content}},
	})
});
