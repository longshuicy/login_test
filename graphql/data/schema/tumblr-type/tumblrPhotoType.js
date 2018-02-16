var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');

const tumblrPhotoType = module.exports = new GraphQLObjectType({
	name:'tumblrPhoto',
	fields: () =>({
		caption:		{type:GraphQLString},
		original_size:	{type:tempSizeType},
		alt_sizes:		{type:new GraphQLList(tempSizeType)},
	})
});

const tempSizeType = new GraphQLObjectType({
	name:'tempSize',
	fields:() =>({
		url:	{type:GraphQLString},
		width:	{type:GraphQLInt},
		height:	{type:GraphQLInt},
	})
});