var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt
} = require('graphql');

const twtGeoType = module.exports = new GraphQLObjectType({
	name: 'twtGeo',
	description: `Search for places that can be attached to a statuses/update. 
	Given a latitude and a longitude pair, an IP address, or a name, this request 
	will return a list of all the valid places that can be used as the place_
	id when updating a status.`,
	fields : ()=> ({
		/*--------------------------basic------------------------*/
		TwitterGeoField_attributes: {type: GraphQLString,
						resolve:({attributes}) =>{ return attributes}},
		TwitterGeoField_country:	{type: GraphQLString,
						resolve:({country}) =>{ return country}},
		TwitterGeoField_country_code: {type: GraphQLString,
						resolve:({country_code}) =>{ return country_code}},
		TwitterGeoField_full_name:	{type: GraphQLString,
						resolve:({full_name}) =>{ return full_name}},
		TwitterGeoField_id: 		{type: GraphQLString,
						resolve:({id}) =>{ return id}},
		TwitterGeoField_name:		{type: GraphQLString,
						resolve:({name}) =>{ return name}},
		TwitterGeoField_place_type: {type: GraphQLString,
						resolve:({place_type}) =>{ return place_type}},
		TwitterGeoField_url: 		{type: GraphQLString,
						resolve:({url}) =>{ return url}},
		/*--------------------------nested------------------------*/
		TwitterGeoField_contained_within: {type: new GraphQLList(twtGeoType),
							resolve:({contained_within}) =>{ return contained_within}}
	})
});

