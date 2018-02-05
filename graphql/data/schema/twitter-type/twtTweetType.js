var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLFloat,
} = require('graphql');

var twitterAPI = require('../../../API/twitterAPI');

const tweetType = module.exports = new GraphQLObjectType({
	name: 'tweet',
	description: 'Return a tweet.',
	fields : ()=> ({
		/*--------------------------basic------------------------*/
		TwitterTweetField_id: 			{ type: GraphQLString,
							resolve:({id}) =>{ return id} },
		TwitterTweetField_id_str: 		{ type: GraphQLString,
							resolve:({id_str}) =>{ return id_str} },
		TwitterTweetField_created_at: 	{ type: GraphQLString,
							resolve:({created_at}) =>{ return created_at} },
		TwitterTweetField_text: 			{ type: GraphQLString,
							resolve:({text}) =>{ return text}},
		TwitterTweetField_retweet_count: 	{ type: GraphQLInt,
							resolve:({retweet_count}) =>{ return retweet_count}},
		TwitterTweetField_favorite_count:	{ type: GraphQLInt,
							resolve:({favorite_count}) =>{ return favorite_count}},  
		TwitterTweetField_retweeted:		{ type: GraphQLBoolean,
							resolve:({retweeted}) =>{ return retweeted}},
		TwitterTweetField_favorited:		{ type: GraphQLBoolean,
							resolve:({favorited}) =>{ return favorited}},
		TwitterTweetField_possibly_sensitive: { type: GraphQLBoolean,
								resolve:({possibly_sensitive}) =>{ return possibly_sensitive}},
		TwitterTweetField_truncated:		{ type: GraphQLBoolean,
							resolve:({truncated}) =>{ return truncated}},
		TwitterTweetField_lang:			{ type: GraphQLString,
							resolve:({lang}) =>{ return lang}},
		TwitterTweetField_in_reply_to_user_id_str:	{ type: GraphQLString,
										resolve:({in_reply_to_user_id_str}) =>{ return in_reply_to_user_id_str}},
		TwitterTweetField_in_reply_to_status_id_str: 	{ type: GraphQLString,
										resolve:({in_reply_to_status_id_str}) =>{ return in_reply_to_status_id_str}},
		TwitterTweetField_in_reply_to_screen_name:	{ type: GraphQLString,
										resolve:({in_reply_to_screen_name}) =>{ return in_reply_to_screen_name}},
		TwitterTweetField_timestamp_ms:				{ type: GraphQLString,
										resolve:({timestamp_ms}) =>{ return timestamp_ms}},
		TwitterTweetField_mentions:					{ type: new GraphQLList(GraphQLString),
										resolve:({mentions}) =>{ return mentions}},
		TwitterTweetField_hashtags:					{ type: new GraphQLList(GraphQLString),
										resolve:({hashtags}) =>{ return hashtags}},
		TwitterTweetField_urls:						{ type: GraphQLString,
										resolve:({urls}) =>{ return urls}},
		TwitterTweetField_is_quote_status:			{ type: GraphQLBoolean,
										resolve:({is_quote_status}) =>{ return is_quote_status}},
		TwitterTweetField_emoticons :					{ type: GraphQLString,
										resolve:({emoticons}) =>{ return emoticons}},
		TwitterTweetField_source :					{ type: GraphQLString,
										resolve:({source}) =>{ return source}},
		TwitterTweetField_sentiments:					{ type: GraphQLString,
										resolve:({sentiments}) =>{ return sentiments}},
		TwitterTweetField_filter_level:				{ type: GraphQLString,
										resolve:({filter_level}) =>{ return filter_level}},
		/*--------------------------nested------------------------*/
		TwitterTweetField_place:			{ type: twtPlaceType,
							resolve:({place}) =>{ return place}},
		TwitterTweetField_coordinates:	{ type: twtCoordinateType,
							resolve:({coordinates}) =>{ return coordinates}},
		TwitterTweetField_user_mentions:	{ type: twtUserMentionType,
							resolve:({user_mentions}) =>{ return user_mentions}},
		TwitterTweetField_user: 			{ type: twtUserType,
							resolve:({user}) =>{ return user}},
		TwitterTweetField_entities:		{ type: twtEntityType,
							resolve:({entities}) =>{ return entities}},
		TwitterTweetField_retweet: 		{
							type: new GraphQLList(retweetType),
							description: 'Get a list of retweets',
							args: {count:{type:GraphQLInt,defaultValue:3}},
							resolve: ({id_str},args,context) => twitterAPI(context,resolveName = 'fetchRetweet', id=id_str, args=args)
						}
	})
});

const twtPlaceType = new GraphQLObjectType({
	name: 'twtPlace',
	description: 'return a place type',
	fields: () => ({
		TwitterPlaceField_country_code:	{type: GraphQLString,
							resolve:({country_code}) =>{ return country_code}},
		TwitterPlaceField_full_name:		{type: GraphQLString,
							resolve:({full_name}) =>{ return full_name}},
		TwitterPlaceField_country:		{type: GraphQLString,
							resolve:({country}) =>{ return country}},
		TwitterPlaceField_id:				{type: GraphQLString,
							resolve:({id}) =>{ return id}},
		TwitterPlaceField_name:			{type: GraphQLString,
							resolve:({name}) =>{ return name}},
		TwitterPlaceField_url:			{type: GraphQLString,
							resolve:({url}) =>{ return url}},
		TwitterPlaceField_place_type: 	{type: GraphQLString,
							resolve:({place_type}) =>{ return place_type}},
		TwitterPlaceField_bounding_box_type:	{type: GraphQLString,
								resolve:({bounding_box}) =>{ return bounding_box.type} },
		TwitterPlaceField_bounding_box_coordinates: {type: GraphQLString,
								resolve:({bounding_box}) =>{ return bounding_box.coordinates} },
	})
});
		
const twtUserMentionType = new GraphQLObjectType({
	name:'twtUserMention',
	description: 'return a user mention type',
	fields: () => ({
		TwitterUserMentionField_id:			{type: new GraphQLList(GraphQLInt),
						resolve:({id}) =>{ return id}},
		TwitterUserMentionField_id_str:		{type:new GraphQLList(GraphQLString),
						resolve:({id_str}) =>{ return id_str}},
		TwitterUserMentionField_name:		{type:new GraphQLList(GraphQLString),
						resolve:({name}) =>{ return name}},
		TwitterUserMentionField_screen_name:{type:new GraphQLList(GraphQLString),
						resolve:({screen_name}) =>{ return screen_name}},
	})
});

const twtCoordinateType = new GraphQLObjectType({
	name:'twtCoordinateType',
	description:'return a coordinate',
	fields: () => ({
		TwitterCoordinateField_type:	{type:GraphQLString,
					resolve:({type}) =>{ return type}},
		TwitterCoordinateField_lon: 	{type:GraphQLFloat,
					resolve: ({coordinates}) => {return coordinates[0]; }},
		TwitterCoordinateField_lat:	{type:GraphQLFloat,
					resolve: ({coordinates}) => {return coordinates[1]; }},
	})
});

const twtUserType = require('./twtUserType');
const twtEntityType = require('./twtEntityType');
const retweetType = require('./twtRetweetType');
