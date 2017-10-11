var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLBoolean
} = require('graphql');

const countsType = new GraphQLObjectType({
	name: 'counts',
	description: 'instagram counts json structure',
	fields: () => ({
		media: {type : GraphQLString},
        follows: {type : GraphQLString},
        followed_by: {type : GraphQLString},
	})
})

const insDataType = new GraphQLObjectType({
	name: 'insData',
	description: 'instagram data json structure',
	fields: () => ({
		id: {type : GraphQLString},
        username: {type : GraphQLString},
        full_name: {type : GraphQLString},
        profile_picture: {type : GraphQLString},
        bio: {type : GraphQLString},
        website: {type : GraphQLString},
        counts: {type : countsType}
	})
})

const usersType = new GraphQLObjectType({
	name: 'users',
	description: 'json structure for users type',
	fields: () => ({
		data: {type : insDataType}
	})
})

const userInfoType = new GraphQLObjectType({
	name: 'userInfo',
	description: 'json structure for users information',
	fields: () => ({
		username: {type: GraphQLString},
        first_name: {type: GraphQLString},
        profile_picture: {type: GraphQLString},
        id: {type: GraphQLString},
        last_name: {type: GraphQLString}
	})
})

const usersSearchType = new GraphQLObjectType({
	name: 'usersSearch',
	description: 'json structure for users search',
	fields: () =>({
		data: {type: new GraphQLList(userInfoType)}
	})
})

module.exports = {
	usersType,
	userInfoType,
	usersSearchType,
}
