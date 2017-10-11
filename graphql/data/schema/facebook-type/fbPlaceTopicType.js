var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat
} = require('graphql');
var getField = require('../../../API/fbAPI').getField;
var getEdge = require('../../../API/fbAPI').getEdge;

const fbPlaceTopicType = module.exports = new GraphQLObjectType({
	name: 'fbPlaceTopic',
	description: 'Reading the category of a place Page.',
	fields: () => ({
	/*------------------------------fields-------------------------------*/
		id:					{ type: GraphQLString },
		count: 				{ type: GraphQLInt,
								resolve: ({id}) => getField({id},'count')},
		icon_url:			{ type: GraphQLString,
								resolve: ({id}) => getField({id},'icon_url')},
		name:				{ type: GraphQLString },
		parent_ids:			{ type: new GraphQLList(GraphQLString),
								resolve: ({id}) => getField({id},'parent_ids')},
		plural_name:		{ type: GraphQLString,
								resolve: ({id}) => getField({id},'plural_name')},
		top_subtopic_names:	{ type: new GraphQLList(GraphQLString),
								resolve: ({id}) => getField({id},'top_subtopic_names')}
	/*------------------------------no edges-----------------------------*/
	})
});