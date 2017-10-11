var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');
var youtubeAPI = require('../../API/youtubeAPI');
	
const youtubeQueryType = module.exports = new GraphQLObjectType({
	name:'youtubeQuery',
	description:`A search result contains information about a YouTube video, channel, 
or playlist that matches the search parameters specified in an API 
request. While a search result points to a uniquely identifiable resource, 
like a video, it does not have its own persistent data.`,
	fields: () => ({
		search:{
			type:new GraphQLList(youtubeListType),
			args:{	
				location:			{type:GraphQLString,
										description:'e.g.(37.42307,-122.08427)'},
				locationRadius:		{type:GraphQLString,
									description:`Valid measurement units are m, km, ft, 
									and mi. For example, valid parameter values include 
									1500m, 5km, 10000ft, and 0.75mi. The API does not support 
									locationRadius parameter values larger than 1000 kilometers.`},
				maxResults:			{type:GraphQLInt,
									defaultValue:5,
									description:'Acceptable values are 0 to 50, inclusive. The default value is 5.'},
				order:				{type:GraphQLString,
									defaultValue:'relevance',
									description:'date, rating, relevance, title, videoCount, viewCount'},
				publishedAfter:		{type:GraphQLString,
										defaultValue:'1970-01-01T00:00:00Z'},
				publishedBefore:	{type:GraphQLString,
										defaultValue:'1970-01-01T00:00:00Z'},
				q:					{type:GraphQLString,
									description:`The q parameter specifies the query term to search for.Your request can 
									also use the Boolean NOT (-) and OR (|) operators to exclude videos or to find 
									videos that are associated with one of several search terms.`},
				type:				{type:GraphQLString,
										defaultValue:'playlist',
										description:'channel, playlist,video'}
			},
			resolve:(_, args) => youtubeAPI(resolveName='search',id='', args=args)
		}
	})
});

const youtubeListType = require('./youtube-type/youtubeListType');