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

const likesType = new GraphQLObjectType({
	name: 'likesType',
	description: 'json structure for Likes Type',
	fields: ()=> ({
		data: {type: new GraphQLList(followerInfoType)}
	})
})

module.exports = {
	likesType
}
