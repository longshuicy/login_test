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
						resolve:({_content})=>flickrAPI(endpoint="tags.getClusters",addon={"tag":_content},args={},resolveName='tagClusters')},
		
		relatedTags:	{type: new GraphQLList(flickrTagType),
						resolve:({_content})=>flickrAPI(endpoint="tags.getRelated",addon={"tag":_content},args={},resolveName='relatedTags')},
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