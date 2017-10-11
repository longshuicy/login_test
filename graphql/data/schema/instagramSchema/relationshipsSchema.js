var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLBoolean
} = require('graphql');

const followerInfoType = new GraphQLObjectType({
	name: "followerInfo",
	description: "json structure for follower info",
	fields: () => ({
		username: {type: GraphQLString},
		profile_picture: {type: GraphQLString},
		full_name: {type: GraphQLString},
		id: {type: GraphQLString},

	})
})

const relationshipType = new GraphQLObjectType({
	name: "relationship",
	description: "json structure for relationship",
	fields: () => ({
		outgoing_status: {
			type: GraphQLString,
			description: "Your relationship to the user",
		},
		incoming_status: {
			type: GraphQLString,
			description: "A user's relationship to you",
		}
	})
})

const usersSelfFollowsType = new GraphQLObjectType({
	name: "usersSelfFollows",
	description: "json structure for users self follows",
	fields: () => ({
		data: {type: new GraphQLList(followerInfoType)}
	})
})

const usersSelfFollowedByType = new GraphQLObjectType({
	name: "usersSelfFollowedBy",
	description: "json structure for users self followed by",
	fields: () => ({
		data: {type: new GraphQLList(followerInfoType)}
	})
})

const usersSelfRequestedByType = new GraphQLObjectType({
	name: "usersSelfRequestedBy",
	description: "json structure for users self requested by",
	fields: () => ({
		data: {type: new GraphQLList(followerInfoType)}
	})
})

const usersRelationshipType = new GraphQLObjectType({
	name: "usersRelationship",
	description: "json structure for users self requested by",
	fields: () => ({
		data: {type: relationshipType}
	})
})

module.exports = {
	usersSelfFollowsType,
	usersSelfFollowedByType,
	usersSelfRequestedByType,
	usersRelationshipType,
	followerInfoType,
}

