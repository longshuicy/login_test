var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');

var { getPandaPhotos } = require('../../../API/flickrAPI');

const flickrPandaType = module.exports = new GraphQLObjectType({
	name:'flickrPanda',
	fields: ()=>({
		_content: 	{type: GraphQLString},
		photos: 	{type: new GraphQLList(flickrPhotoType),
						args:{
							page: 		{type:GraphQLInt, defaultValue:1},
							per_page:	{type:GraphQLInt, defaultValue:10}
						},
						resolve:({_content},args) => getPandaPhotos(_content,args)}
	})
});

const flickrPhotoType = require('./flickrPhotoType');