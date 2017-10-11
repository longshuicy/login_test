var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');

const spotifyAudioAnalysisType = module.exports = new GraphQLObjectType({
	name:'spotifyAudioAnalysisType',
	fields: ()=>({
		bars:					{type:new GraphQLList(barsType)},
		beats:					{type:new GraphQLList(beatType)},
		meta:					{type:metaType},
		sections:				{type:new GraphQLList(sectionType)},
		segments:				{type:new GraphQLList(segmentType)},
		tatums:					{type:new GraphQLList(tatumType)},
		track:					{type: trackType},		
	})
});

const barsType = new GraphQLObjectType({
	name:'bar',
	fields:()=>({
		start:		{type:GraphQLFloat},
		duration:	{type:GraphQLFloat},
		confidence:	{type:GraphQLFloat},
	})
});

const beatType = new GraphQLObjectType({
	name:'beat',
	fields:()=>({
		start:		{type:GraphQLFloat},
		duration:	{type:GraphQLFloat},
		confidence:	{type:GraphQLFloat},
	})
});

const metaType = new GraphQLObjectType({
	name:'meta',
	fields:()=>({
		analyzer_version:	{type:GraphQLString},
		platform:			{type:GraphQLString},
		detailed_status:	{type:GraphQLString},
		status_code:		{type:GraphQLInt},
		timestamp:			{type:GraphQLFloat},
		analysis_time:		{type:GraphQLFloat},
		input_process:		{type:GraphQLString},
	})
});

const sectionType = new GraphQLObjectType({
	name:'section',
	fields: ()=>({
		start:						{type:GraphQLFloat},
		duration:					{type:GraphQLFloat},
		confidence:					{type:GraphQLFloat},
		loudness:					{type:GraphQLFloat},
		tempo:						{type:GraphQLFloat},
		tempo_confidence:			{type:GraphQLFloat},
		key:						{type:GraphQLInt},
		key_confidence:				{type:GraphQLFloat},
		mode:						{type:GraphQLInt},
		mode_confidence:			{type:GraphQLFloat},
		time_signature:				{type:GraphQLInt},
		time_signature_confidence:	{type:GraphQLInt},
	})
});

const segmentType = new GraphQLObjectType({
	name:'segment',
	fields: ()=>({
		start:						{type:GraphQLFloat},
		duration:					{type:GraphQLFloat},
		confidence:					{type:GraphQLFloat},
		loudness_start:				{type:GraphQLFloat},
		loudness_max_time:			{type:GraphQLFloat},
		loudness_max:				{type:GraphQLFloat},
		loudness_end:				{type:GraphQLFloat},
		pitches:					{type: new GraphQLList(GraphQLFloat)},
		timbre:						{type: new GraphQLList(GraphQLFloat)},
	})
});

const tatumType = new GraphQLObjectType({
	name:'tatumType',
	fields: ()=>({
		start:						{type:GraphQLFloat},
		duration:					{type:GraphQLFloat},
		confidence:					{type:GraphQLFloat},
	})
});

const trackType = new GraphQLObjectType({
	name:'trackType',
	fields:() =>({
	num_samples:				{type:GraphQLInt},
	duration:					{type:GraphQLFloat},
	sample_md5:					{type:GraphQLString},
	offset_seconds:				{type:GraphQLInt},
	window_seconds:				{type:GraphQLInt},
	analysis_sample_rate:		{type:GraphQLInt},
	analysis_channels:			{type:GraphQLInt},
	end_of_fade_in:				{type:GraphQLFloat},
	start_of_fade_out:			{type:GraphQLFloat},
	loudness:					{type:GraphQLFloat},
	tempo:						{type:GraphQLFloat},
	tempo_confidence:			{type:GraphQLFloat},
	time_signature:				{type:GraphQLFloat},
	time_signature_confidence:	{type:GraphQLFloat},
	key:						{type:GraphQLFloat},
	key_confidence:				{type:GraphQLFloat},
	mode:						{type:GraphQLInt},
	mode_confidence:			{type:GraphQLFloat},
	codestring:					{type:GraphQLString},
	code_version:				{type:GraphQLFloat},
	echoprintstring:			{type:GraphQLString},
	echoprint_version:			{type:GraphQLFloat},
	synchstring:				{type:GraphQLString},
	synch_version:				{type:GraphQLFloat},
	rhythmstring:				{type:GraphQLString},
	rhythm_version:				{type:GraphQLFloat},
	})
});