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

const flickrTagType = module.exports = new GraphQLObjectType({
	name:'flickrTag',
	description:'',
	fields: ()=>({
		count:		{type:GraphQLString},
		score:		{type:GraphQLString},
		_content:	{type:GraphQLString},
		tagClusters:	{type:new GraphQLList(flickrClusterType),
						resolve:({_content},_,context)=>flickrAPI(context,resolveName='tagClusters',addon={"tag":_content},args={})},
		
		relatedTags:	{type: new GraphQLList(flickrTagType),
						resolve:({_content},_,context)=>flickrAPI(context,resolveName='relatedTags',addon={"tag":_content},args={})},
	})
});

const flickrClusterType = new GraphQLObjectType({
	name:'flickrCluster',
	description:'Gives you a list of tag clusters for the given tag.',
	fields: () =>({
		total: {type:GraphQLString},
		tag:	{type:new GraphQLList(flickrTagType)}
	})
});