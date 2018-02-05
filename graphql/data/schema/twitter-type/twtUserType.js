var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLBoolean,
} = require('graphql');

var twitterAPI = require('../../../API/twitterAPI');

const twtUserType = module.exports = new GraphQLObjectType({
	name: 'twtUser',
	description: 'Return a twitter user.',
	fields: () => ({
		/*--------------------------basic------------------------*/
		TwitterUserField_id:		{ type: GraphQLString,
										resolve:({id}) =>{ return id} },
		TwitterUserField_id_str: 	{ type: GraphQLString,
										resolve:({id_str}) =>{ return id_str} },
		TwitterUserField_name:		{ type: GraphQLString,
										resolve:({name}) =>{ return name}},
		TwitterUserField_screen_name:	{ type: GraphQLString,
											resolve:({screen_name}) =>{ return screen_name}},
		TwitterUserField_description: 	{ type: GraphQLString,
											resolve:({description}) =>{ return description}},
		TwitterUserField_created_at:	{ type: GraphQLString,
											resolve:({created_at}) =>{ return created_at} },
		TwitterUserField_profile_image_url:		{ type: GraphQLString,
													resolve:({profile_image_url}) =>{ return profile_image_url}},
		TwitterUserField_profile_banner_url:	{ type: GraphQLString,
													resolve:({profile_banner_url}) =>{ return profile_banner_url}},
		TwitterUserField_url:		{ type: GraphQLString,
										resolve:({url}) =>{ return url}},
		TwitterUserField_location: 	{ type: GraphQLString,
										resolve:({location}) =>{ return location}},
		TwitterUserField_statuses_count: { type: GraphQLInt,
											resolve: ({statuses_count}) => {return statuses_count}	},
		TwitterUserField_followers_count : 	{ type: GraphQLInt,
												resolve:({followers_count}) =>{ return followers_count}},
		TwitterUserField_friends_count :	{ type: GraphQLInt,
												resolve:({friends_count}) =>{ return friends_count}},
		TwitterUserField_listed_count: 		{ type: GraphQLInt,
												resolve:({listed_count}) =>{ return listed_count}},
		TwitterUserField_favourites_count: 	{ type: GraphQLInt,
												resolve:({favourites_count}) =>{ return favourites_count}},
		TwitterUserField_statuses_count	: 	{ type: GraphQLInt,
												resolve:({statuses_count}) =>{ return statuses_count}},
		TwitterUserField_time_zone:			{ type: GraphQLString,
												resolve:({time_zone}) =>{ return time_zone}},
		TwitterUserField_protected:			{ type: GraphQLBoolean,
												resolve:({protected}) =>{ return protected}},
		TwitterUserField_verified:			{ type: GraphQLBoolean,
												resolve:({verified}) =>{ return verified}},
		TwitterUserField_is_translator:		{ type: GraphQLBoolean,
												resolve:({is_translator}) =>{ return is_translator}},
		TwitterUserField_contributors_enabled:	{ type: GraphQLBoolean,
													resolve:({contributors_enabled}) =>{ return contributors_enabled}},
		TwitterUserField_geo_enabled:			{ type: GraphQLBoolean,
													resolve:({geo_enabled}) =>{ return geo_enabled}},
		TwitterUserField_lang:					{ type: GraphQLString,
													resolve:({lang}) =>{ return lang}},
		/*--------------------------nested------------------------*/
		TwitterUserField_timeline:	{
						type: new GraphQLList(tweetType),
						args:{count:{type:GraphQLInt,defaultValue:10}},
						description: 'Get the timeline of current User',
						resolve:({id_str},args,context) =>twitterAPI(context,resolveName = 'fetchTimeline', id=id_str,args=args)
					},
		TwitterUserField_friends:	{
						type: new GraphQLList(twtUserType),
						args:{count:{type:GraphQLInt,defaultValue:3}},
						description: 'Get a list of followees of current User',
						resolve:({id_str},args,context) => twitterAPI(context,resolveName = 'fetchFriend', id=id_str,args=args)
					},
		TwitterUserField_followers:	{	
						type: new GraphQLList(twtUserType),
						args:{count:{type:GraphQLInt,defaultValue:3}},
						description: 'Get a list of followers of current User',
						resolve:({id_str},args,context) => twitterAPI(context,resolveName = 'fetchFollower', id=id_str,args=args)
					}
	})
});

const tweetType = require('./twtTweetType');