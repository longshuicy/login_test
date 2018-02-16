var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat
} = require('graphql');

const fbLikeType = module.exports = new GraphQLObjectType({
	name:'fbLike',
	description:`this reference describes the /likes edge that is common 
	to multiple Graph API nodes. The structure and operations are the 
	same for each node.`,
	fields: ()=>({
		name: 	{ type: GraphQLString },
		id:		{ type: GraphQLString }
		
		/*An array of User or Page objects representing the 
		people or Pages that liked the object, 
		in addition to the following field:
		total_count: Total number of people who liked. 
		This is only returned when the flag summary=true is set.int32*/

	})
});