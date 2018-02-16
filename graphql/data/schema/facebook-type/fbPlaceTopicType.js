var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat
} = require('graphql');
var facebookAPI = require('../../../API/fbAPI');

const fbPlaceTopicType = module.exports = new GraphQLObjectType({
	name: 'fbPlaceTopic',
	description: 'Reading the category of a place Page.',
	fields: () => ({
	/*------------------------------fields-------------------------------*/
		id:					{ type: GraphQLString },
		count: 				{ type: GraphQLInt,
								resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'count')},
		icon_url:			{ type: GraphQLString,
								resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'icon_url')},
		name:				{ type: GraphQLString },
		parent_ids:			{ type: new GraphQLList(GraphQLString),
								resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'parent_ids')},
		plural_name:		{ type: GraphQLString,
								resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'plural_name')},
		top_subtopic_names:	{ type: new GraphQLList(GraphQLString),
								resolve: ({id},_,context) => facebookAPI(context,'getField',{id},'top_subtopic_names')}
	/*------------------------------no edges-----------------------------*/
	})
});