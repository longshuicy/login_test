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

const locationDataType = new GraphQLObjectType({
	name: "locationData",
	description: "json structure for Location Data Type",
	fields: ()=> ({
		id: {type: GraphQLString},
		name: {type: GraphQLString},
		latitude: {type: GraphQLFloat},
		longitude: {type: GraphQLFloat}
	})
})

const locationIDType = new GraphQLObjectType({
	name: "locationID",
	description: "json structure for Location ID Type",
	fields: ()=> ({
		data: {type: locationDataType}
	})
})

const locationMediaRecentType = new GraphQLObjectType({
	name: "locationMediaRecent",
	description: "json structure for Location Media Recent Type",
	fields: ()=> ({
		data: {type: new GraphQLList(mediaType)}
	})
})

const locationSearchType = new GraphQLObjectType({
	name: "locationSearch",
	description: "json structure for Location Search Type",
	fields: ()=> ({
		data: {type: new GraphQLList(locationDataType)}
	})
})

module.exports = {
	locationIDType,
	locationMediaRecentType,
	locationSearchType
}
