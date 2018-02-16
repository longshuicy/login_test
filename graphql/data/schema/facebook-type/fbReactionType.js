var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat
} = require('graphql');

const fbReactionType = module.exports = new GraphQLObjectType({
	name: 'fbReaction',
	description: 'type enum {NONE, LIKE, LOVE, WOW, HAHA, SAD, ANGRY, THANKFUL}.',
	fields: () => ({
		id: {type: GraphQLString},
		name: {type: GraphQLString},
		type: {type: GraphQLString},
		
		
		/* a list of profile node: User,Page,Group,Event,Application
		can be keep working on
		e.g. userType|pageType|groupType|eventType| */
	})
});