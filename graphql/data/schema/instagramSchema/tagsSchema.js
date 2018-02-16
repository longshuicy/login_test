var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLUnionType,
	GraphQLFloat
} = require('graphql');

var {
	mediaType
} = require('./mediaSchema.js');

const tagDataType = new GraphQLObjectType({
	name: "tagData",
	description: "json structure for Tag Data Type",
	fields: ()=> ({
		media_count: {type: GraphQLInt},
		name: {type: GraphQLString}
	})
})

const tagNameType = new GraphQLObjectType({
	name: "tagName",
	description: "json structure for Tag Name Type",
	fields: ()=> ({
		data: {type: tagDataType}
	})
})

const tagMediaRecentType = new GraphQLObjectType({
	name: "mediaRecent",
	description: "json structure for Media Recent Type",
	fields: ()=> ({
		data: {type: new GraphQLList(mediaType)}
	})
})

const tagSearchType = new GraphQLObjectType({
	name: "tagSearch",
	description: "json structure for Tag Search Type",
	fields: ()=> ({
		data: {type: new GraphQLList(tagDataType)}
	})
})

module.exports = {
	tagNameType,
	tagMediaRecentType,
	tagSearchType
}
