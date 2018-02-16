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

const pCountsType = new GraphQLObjectType({
	name: "PInterestCounts",
	description: "json structure for PInterest Counts Type",
	fields: ()=> ({
		pins: {type: GraphQLInt},
		following: {type: GraphQLInt},
		followers: {type: GraphQLInt},
		boards: {type: GraphQLInt},
		likes: {type: GraphQLInt},
	})
})

const pUserType = new GraphQLObjectType({
	name: "PInterestUser",
	description: "json structure for PInterest User Type",
	fields: ()=> ({
		username: {type: GraphQLString},
		bio: {type: GraphQLString},
		first_name: {type: GraphQLString},
		last_name: {type: GraphQLString},
		account_type: {type: GraphQLString},
		url: {type: GraphQLString},
		created: {type: GraphQLString},
		// image: {type: pImageType},
		counts: {type: pCountsType},
		id: {type: GraphQLString},
	})
})

const pDataType = new GraphQLObjectType({
	name: "PInterestData",
	description: "json structure for PInterest Data Type",
	fields: ()=> ({
		data: {type: pUserType}
	})
})

module.exports = {
	pDataType,
	pUserType
}


