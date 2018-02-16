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
	followerInfoType
} = require('./relationshipsSchema');

const fromType = followerInfoType;

const commentsDataType = new GraphQLObjectType({
	name: 'commentsData',
	description: 'json structure for comments Type',
	fields: () => ({
		created_time: {type: GraphQLString},
		text: {type: GraphQLString},
		from: {type: fromType},
		id: {type: GraphQLString}
	})
})

const commentsType = new GraphQLObjectType({
	name: 'comments',
	description: 'Media comments',
	fields: () => ({
		data: {type: new GraphQLList(commentsDataType)}
	})
})

module.exports = {
	commentsType
}
