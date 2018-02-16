var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLBoolean
} = require('graphql');

var {
	stackExchange
} = require('./../../API/stackExchangeAPI');

const ownerType = new GraphQLObjectType({
	name: 'owner',
	description: 'owner structure return from StackExchange API',
	fields: () => ({
		reputation: {type: GraphQLInt} ,
        user_id: {type: GraphQLInt},
        user_type: {type: GraphQLString},
        profile_image: {type: GraphQLString},
        display_name: {type: GraphQLString},
        link: {type: GraphQLString}
	})
})

const itemType = new GraphQLObjectType({
	name: 'item',
	description: 'item structure return from StackExchange API',
	fields: () => ({
		tags: {type: new GraphQLList(GraphQLString)},
		owner: {type: ownerType},
		is_answered: {type: GraphQLBoolean},
		view_count: {type: GraphQLInt},
		answer_count: {type: GraphQLInt},
		score: {type: GraphQLInt},
		last_activity_date: {type: GraphQLInt},
		creation_date: {type: GraphQLInt},
		last_edit_date: {type: GraphQLInt},
		question_id: {type: GraphQLInt},
		link: {type: GraphQLString},
		title: {type: GraphQLString}  
	})
})

const advancedSearchType = new GraphQLObjectType({
	name: "advancedSearch",
	description: 'advanced search which returns a list of answers',
	fields: () => ({
		items: { type: new GraphQLList(itemType) },
		has_more: {type: GraphQLBoolean},
		quota_max: {type: GraphQLInt},
		quota_remaining: {type: GraphQLInt}
	})
})

const questionIDType = new GraphQLObjectType({
	name: "questionID",
	description: 'search for a question by its ID',
	fields: () => ({
		items: { type: new GraphQLList(itemType) },
		has_more: {type: GraphQLBoolean},
		quota_max: {type: GraphQLInt},
		quota_remaining: {type: GraphQLInt}
	})
})

const stackExchangeQueryType = new GraphQLObjectType({
	name:'stackExchangeQuery',
	description: 'advanced search result json',
	fields: () => ({
		advancedSearch : {
			type: advancedSearchType,
			args:{
				q: {
					type: GraphQLString,
					description: "The question to search"
				},
				sort:{
					type: GraphQLString,
					description: "How to sort the result",
					defaultValue: "activity"
				},
				order:{
					type: GraphQLString,
					description: "Order of the result",
					defaultValue: "desc"
				},
			},
			resolve:(_, args) => stackExchange(args, "advancedSearch")
		},
		questionID : {
			type: questionIDType,
			args:{
				ids: {
					type: GraphQLInt,
					description: "question ID"
				},
				sort:{
					type: GraphQLString,
					description: "How to sort the result",
					defaultValue: "activity"
				},
				order:{
					type: GraphQLString,
					description: "Order of the result",
					defaultValue: "desc"
				},
			},
			resolve:(_, args) => stackExchange(args, "questionID")
		}
	})
})

module.exports = stackExchangeQueryType

