var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat
} = require('graphql');
var facebookAPI = require('../../../API/fbAPI');

const fbUserType = module.exports = new GraphQLObjectType({
	name: 'fbUser',
	description: 'Return a facebook user.',
	fields: () => ({
		/*-------------------------BASIC FIELDS------------------------*/
		id:					{ type: GraphQLString },
		name:				{ type: GraphQLString },
		about:				{ type: GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'about')},
		birthday:			{ type: GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'birthday')},
		email:				{ type: GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'email')		},
		first_name:			{ type: GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'first_name')},
		gender:				{ type: GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'gender')	},
		last_name:			{ type: GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'last_name')},
		link:				{ type: GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'link')},
		locale:				{ type: GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'locale')},
		middle_name:		{ type: GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'middle_name')},
		name_format:		{ type: GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'name_format')},
		political:			{ type: GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'political')},
		quotes:				{ type: GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'quotes')},
		relationship_status:{ 
							type: GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'relationship_status')},
		religion:			{ type: GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'religion')},
		updated_time:		{ type: GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'updated_time')},
		website:			{ type: GraphQLString,
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'website')},	
							
		age_range:			{ type: fbAgeType,
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'age_range')},
		cover: 				{ type: fbCoverPhotoType,
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'cover')},
		currency: 			{ type: fbCurrencyType,
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'currency')},
		devices:			{ type: new GraphQLList(fbDeviceType),
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'devices')},
		education:			{ type: new GraphQLList(fbEducationExpType),
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'education')},
		favorite_athletes:	{ 
							type: new GraphQLList(fbExperienceType),
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'favorite_athletes')},
		favorite_teams:		{ type: new GraphQLList(fbExperienceType),
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'favorite_teams')},
		hometown:			{ type: fbPageType,
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'hometown')},
		inspirational_people:	{ 
							type: new GraphQLList(fbExperienceType),
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'inspirational_people')},
		interested_in:		{ type: new GraphQLList(GraphQLString),
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'interested_in')},
		languages:			{ type: new GraphQLList(fbExperienceType),
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'languages')},
		location:			{ type: fbPageType,
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'location')},
		meeting_for:		{ type: new GraphQLList(GraphQLString),
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'meeting_for')},
		significant_other:	{ 
							type: fbUserType,
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'significant_other')},
		sports:				{ type: new GraphQLList(fbExperienceType),
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'sports')},
		work:				{ type: new GraphQLList(fbExperienceType),
							resolve: ({id},_,context) => facebookAPI(context,'getField', {id},'work')},
							
		/*------------------------------------EDGES---------------------------------*/
		albums:					{ type: new GraphQLList(fbAlbumType),
									resolve: ({id},_,context) => facebookAPI(context,'getEdge', {id},'albums')},
		photos:					{ type: new GraphQLList(fbPhotoType),
									resolve: ({id},_,context) => facebookAPI(context,'getEdge', {id},'photos')},
		events:					{ type: new GraphQLList(fbEventType),
									resolve: ({id},_,context) => facebookAPI(context,'getEdge', {id},'events')},
		locations:				{ type: new GraphQLList(fbLocationType),
									resolve: ({id},_,context) => facebookAPI(context,'getEdge', {id},'locations')},
		groups:					{ type: new GraphQLList(fbGroupType),
									resolve: ({id},_,context) => facebookAPI(context,'getEdge', {id},'groups')},	
		family:					{ type: new GraphQLList(fbUserType),
									resolve: ({id},_,context) => facebookAPI(context,'getEdge', {id},'family')},	
		friends:				{ type: new GraphQLList(fbUserType),
									resolve: ({id},_,context) => facebookAPI(context,'getEdge', {id},'friends')},
		likes:					{ type: new GraphQLList(fbLikeType),
									resolve: ({id},_,context) => facebookAPI(context,'getEdge', {id},'likes')},
		videos:					{ type: new GraphQLList(fbVideoType),
									resolve: ({id},_,context) => facebookAPI(context,'getEdge', {id},'videos')},
		feed:					{ type: new GraphQLList(fbPostType),
									resolve: ({id},_,context) => facebookAPI(context,'getEdge', {id},'feed')},
		picture:				{ type: fbProfilePictureType,
									resolve: ({id},_,context) => facebookAPI(context,'getEdge', {id},'picture')}
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

