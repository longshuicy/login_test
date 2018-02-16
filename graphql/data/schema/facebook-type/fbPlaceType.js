var {
	GraphQLList,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLFloat
} = require('graphql');
var getField = require('../../../API/fbAPI').getField;
var getEdge = require('../../../API/fbAPI').getEdge;

const fbPlaceType = module.exports = new GraphQLObjectType({
	name:'fbPlace',
	description:'return a Facebook place',
	fields: ()=>({
		/*---------------------------fields----------------------*/
		id:				{ type: GraphQLString },
		name:			{ type: GraphQLString },
		location: 		{ type: fbLocationType,
							resolve: ({id}) => getField({id},'location')}
		/*---------------------------no edges---------------------*/
	})
});

const fbLocationType = require('./fbLocationType');
