var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');

const flickrProfileType = module.exports = new GraphQLObjectType({
	name:'flickrProfile',
	description:'Returns specified user\'s profile info, respecting profile privacy settings',
	fields: ()=>({
		id:				{type:GraphQLString},
		nsid:			{type:GraphQLString},
		showcase_set:	{type:GraphQLString},
		first_name:		{type:GraphQLString},
		last_name:		{type:GraphQLString},
		description:	{type:GraphQLString},
		website:		{type:GraphQLString},
		occupation:		{type:GraphQLString},
		hometown:		{type:GraphQLString},
		city:			{type:GraphQLString},
		country:		{type:GraphQLString},
	})
});