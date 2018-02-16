var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');

const flickrCommentType = module.exports = new GraphQLObjectType({
	name:'flickrComment',
	description:'return a list of comments for a photo',
	fields: ()=>({
		id:			{type:GraphQLString },
		author:		{type:GraphQLString },
		authorname:	{type:GraphQLString },
		iconserver:	{type:GraphQLString },
		iconfarm:	{type:GraphQLInt },
		datecreate:	{type:GraphQLString },
		permalink:	{type:GraphQLString },
		path_alias:	{type:GraphQLString },
		realname:	{type:GraphQLString },
		_content:	{type:GraphQLString },
	})
});