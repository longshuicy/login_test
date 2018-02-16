var {
	GraphQLList,
	GraphQLObjectType,
	GraphQLString
} = require('graphql');

const fbExperienceType = module.exports = new GraphQLObjectType({
	name:'fbExperience',
	description: 'experience',
	fields: ()=>({
		id: { type: GraphQLString },
		description: { type: GraphQLString },
		from: { type: fbPageType },
		name: { type: GraphQLString },
		with: { type: new GraphQLList(fbUserType) }		
	})
});

const fbUserType = require('./fbUserType');
const fbPageType = require('./fbPageType');
//const profileType = require('./fbProfileType');