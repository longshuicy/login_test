var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLUnionType
} = require('graphql');


const fbUserType = require('./fbUserType');
const fbPageType = require('./fbPageType');

const resolveType = (data) => {
	if (data.first_name){
		return fbUserType;
	}else{
		return fbPageType;
	}
};

const fbProfileType = module.exports = new GraphQLUnionType({
	name: 'fbProfile',
	description: `a list of profile node: User,Page,Group,Event,Application
		can be keep working on e.g. userType|pageType|groupType|eventType|`,
	types: [fbUserType, fbPageType],
	resolveType: resolveType
});





