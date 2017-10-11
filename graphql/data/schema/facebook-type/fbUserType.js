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

const fbUserType = module.exports = new GraphQLObjectType({
	name: 'fbUser',
	description: 'Return a facebook user.',
	fields: () => ({
		/*-------------------------BASIC FIELDS------------------------*/
		id:					{ type: GraphQLString },
		name:				{ type: GraphQLString },
		about:				{ type: GraphQLString,
							resolve: ({id}) => getField({id},'about')},
		birthday:			{ type: GraphQLString,
							resolve: ({id}) => getField({id},'birthday')},
		email:				{ type: GraphQLString,
							resolve: ({id}) => getField({id},'email')		},
		first_name:			{ type: GraphQLString,
							resolve: ({id}) => getField({id},'first_name')},
		gender:				{ type: GraphQLString,
							resolve: ({id}) => getField({id},'gender')	},
		last_name:			{ type: GraphQLString,
							resolve: ({id}) => getField({id},'last_name')},
		link:				{ type: GraphQLString,
							resolve: ({id}) => getField({id},'link')},
		locale:				{ type: GraphQLString,
							resolve: ({id}) => getField({id},'locale')},
		middle_name:		{ type: GraphQLString,
							resolve: ({id}) => getField({id},'middle_name')},
		name_format:		{ type: GraphQLString,
							resolve: ({id}) => getField({id},'name_format')},
		political:			{ type: GraphQLString,
							resolve: ({id}) => getField({id},'political')},
		quotes:				{ type: GraphQLString,
							resolve: ({id}) => getField({id},'quotes')},
		relationship_status:{ 
							type: GraphQLString,
							resolve: ({id}) => getField({id},'relationship_status')},
		religion:			{ type: GraphQLString,
							resolve: ({id}) => getField({id},'religion')},
		updated_time:		{ type: GraphQLString,
							resolve: ({id}) => getField({id},'updated_time')},
		website:			{ type: GraphQLString,
							resolve: ({id}) => getField({id},'website')},	
							
		age_range:			{ type: fbAgeType,
							resolve: ({id}) => getField({id},'age_range')},
		cover: 				{ type: fbCoverPhotoType,
							resolve: ({id}) => getField({id},'cover')},
		currency: 			{ type: fbCurrencyType,
							resolve: ({id}) => getField({id},'currency')},
		devices:			{ type: new GraphQLList(fbDeviceType),
							resolve: ({id}) => getField({id},'devices')},
		education:			{ type: new GraphQLList(fbEducationExpType),
							resolve: ({id}) => getField({id},'education')},
		favorite_athletes:	{ 
							type: new GraphQLList(fbExperienceType),
							resolve: ({id}) => getField({id},'favorite_athletes')},
		favorite_teams:		{ type: new GraphQLList(fbExperienceType),
							resolve: ({id}) => getField({id},'favorite_teams')},
		hometown:			{ type: fbPageType,
							resolve: ({id}) => getField({id},'hometown')},
		inspirational_people:	{ 
							type: new GraphQLList(fbExperienceType),
							resolve: ({id}) => getField({id},'inspirational_people')},
		interested_in:		{ type: new GraphQLList(GraphQLString),
							resolve: ({id}) => getField({id},'interested_in')},
		languages:			{ type: new GraphQLList(fbExperienceType),
							resolve: ({id}) => getField({id},'languages')},
		location:			{ type: fbPageType,
							resolve: ({id}) => getField({id},'location')},
		meeting_for:		{ type: new GraphQLList(GraphQLString),
							resolve: ({id}) => getField({id},'meeting_for')},
		significant_other:	{ 
							type: fbUserType,
							resolve: ({id}) => getField({id},'significant_other')},
		sports:				{ type: new GraphQLList(fbExperienceType),
							resolve: ({id}) => getField({id},'sports')},
		work:				{ type: new GraphQLList(fbExperienceType),
							resolve: ({id}) => getField({id},'work')},
							
		/*------------------------------------EDGES---------------------------------*/
		albums:					{ type: new GraphQLList(fbAlbumType),
									resolve: ({id}) => getEdge({id},'albums')},
		photos:					{ type: new GraphQLList(fbPhotoType),
									resolve: ({id}) => getEdge({id},'photos')},
		events:					{ type: new GraphQLList(fbEventType),
									resolve: ({id}) => getEdge({id},'events')},
		locations:				{ type: new GraphQLList(fbLocationType),
									resolve: ({id}) => getEdge({id},'locations')},
		groups:					{ type: new GraphQLList(fbGroupType),
									resolve: ({id}) => getEdge({id},'groups')},	
		family:					{ type: new GraphQLList(fbUserType),
									resolve: ({id}) => getEdge({id},'family')},	
		friends:				{ type: new GraphQLList(fbUserType),
									resolve: ({id}) => getEdge({id},'friends')},
		likes:					{ type: new GraphQLList(fbLikeType),
									resolve: ({id}) => getEdge({id},'likes')},
		videos:					{ type: new GraphQLList(fbVideoType),
									resolve: ({id}) => getEdge({id},'videos')},
		feed:					{ type: new GraphQLList(fbPostType),
									resolve: ({id}) => getEdge({id},'feed')},
		picture:				{ type: fbProfilePictureType,
									resolve: ({id}) => getEdge({id},'picture')}
	})
});

const fbAgeType = new GraphQLObjectType({
	name: 'fbAge',
	description: 'Return a facebook user\'s age range.',
	fields: () => ({
		max:	{ type: GraphQLInt },
		min: 	{ type: GraphQLInt }
	})
});

const fbCurrencyType = new GraphQLObjectType({
	name: 'fbCurrency',
	description: 'Return a facebook user\'s local currency information.',
	fields: () => ({
		usd_exchange: { type: GraphQLFloat},
		usd_exchange_inverse: { type: GraphQLFloat},
		user_currency: { type: GraphQLString }
	})
});

const fbDeviceType = new GraphQLObjectType({
	name:'fbDevice',
	description: 'return a list of devices the person is using. thiw will return only IOS and Android devices',
	fields: ()=>({
		hardware: { type: GraphQLString },
		os: { type: GraphQLString }
	})
});

const fbEducationExpType = new GraphQLObjectType({
	name:'fbEducationExp',
	description:'the person\'s education',
	fields: ()=>({
		id: 	{ type: GraphQLString },
		classes: { type: new GraphQLList(fbExperienceType) },
		concentration:	{ type: new GraphQLList(fbPageType) },
		degree:	{ type: fbPageType },
		school:	{type: fbPageType },
		type:	{type: GraphQLString },
		with:	{ type: new GraphQLList(fbUserType) },
		year:	{ type: new GraphQLList(fbPageType) }		
	})
});

//write require at the bottom to solve the circular dependency problem
const fbExperienceType = require('./fbExpType');
const fbPageType = require('./fbPageType');
const fbAlbumType = require('./fbAlbumType');
const fbPhotoType = require('./fbPhotoType');
const fbEventType = require('./fbEventType');
const fbCoverPhotoType = require('./fbCoverPhotoType');
const fbLocationType = require('./fbLocationType');
const fbGroupType = require('./fbGroupType');
const fbLikeType = require('./fbLikeType');
const fbVideoType = require('./fbVideoType');
const fbPostType = require('./fbPostType');
const fbProfilePictureType = require('./fbProfilePicType');

