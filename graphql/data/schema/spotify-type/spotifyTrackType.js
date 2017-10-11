var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');
var spotifyAPI = require('../../../API/spotifyAPI');

const spotifyTrackType = module.exports = new GraphQLObjectType({
	name:'spotifyTrack',
	fields: () => ({
		album:			{type:spotifyAlbumType},
		artists:			{type:new GraphQLList(spotifyArtistType)},
		available_markets:	{type: new GraphQLList(GraphQLString)},
		disc_number:		{type:GraphQLInt},
		duration_ms:		{type:GraphQLInt},
		external_ids:		{type:GraphQLString,
								resolve:({external_ids})=>{return JSON.stringify(external_ids)}},
		external_urls:		{type:GraphQLString,
								resolve:({external_urls})=>{return JSON.stringify(external_urls)}},
		href:				{type:GraphQLString},
		id:					{type:GraphQLString},
		linked_from:		{type:spotifyLinkedTrackType},
		name:				{type:GraphQLString},
		popularity:			{type:GraphQLInt},
		preview_url:		{type:GraphQLString},
		track_number:		{type:GraphQLInt},
		type:				{type:GraphQLString},
		uri:				{type:GraphQLString},
		/*--------------------------nesting-----------------------------*/
		audioFeatures:		{type:spotifyAudioFeaturesType,
								resolve:({id},_,context) => spotifyAPI(context,resolveName = 'audioFeatures', id=id, args = {})},
		audioAnalysis:		{type:spotifyAudioAnalysisType,
								resolve:({id},_,context) => spotifyAPI(context,resolveName = 'audioAnalysis', id=id, args = {})},
	})
});

const spotifyLinkedTrackType = new GraphQLObjectType({
	name:'spotifyLinkedTrack',
	fields: ()=>({
		external_urls:	{type:GraphQLString,
							resolve:({external_urls})=>{return JSON.stringify(external_urls)}},
		href:	{type:GraphQLString},
		id:		{type:GraphQLString},
		type:	{type:GraphQLString},
		uri:	{type:GraphQLString},
	})
});

const spotifyAlbumType = require('./spotifyAlbumType');
const spotifyArtistType = require('./spotifyArtistType');
const spotifyAudioFeaturesType = require('./spotifyAudioFeaturesType');
const spotifyAudioAnalysisType = require('./spotifyAudioAnalysisType');