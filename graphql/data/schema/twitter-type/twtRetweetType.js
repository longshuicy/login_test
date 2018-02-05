var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt
} = require('graphql');

const retweetType = module.exports = new GraphQLObjectType({
	name        : 'retweet',
	description : 'Retweet of a tweet',
	fields      : () => ({
		/*--------------------------basic------------------------*/
		TwitterRetweetField_id:		{ type: GraphQLString,
									resolve:({id}) =>{ return id}},
		TwitterRetweetField_id_str: { type: GraphQLString,
									resolve:({id_str}) =>{ return id_str}},
		TwitterRetweetField_text:	{ type: GraphQLString,
									resolve:({text}) =>{ return text}},
		TwitterRetweetField_created_at: { type: GraphQLString,
									resolve:({created_at}) =>{ return created_at}},
		TwitterRetweetField_in_reply_to_status_id_str: 	{ type: GraphQLString,
										resolve:({in_reply_to_status_id_str}) =>{ return in_reply_to_status_id_str}},
		TwitterRetweetField_in_reply_to_user_id_str: 	{ type: GraphQLString,
										resolve:({in_reply_to_user_id_str}) =>{ return in_reply_to_user_id_str}},
		TwitterRetweetField_in_reply_to_screen_name: 	{ type: GraphQLString,
										resolve:({in_reply_to_screen_name}) =>{ return in_reply_to_screen_name}},
		TwitterRetweetField_favorite_count: { type: GraphQLInt,
										resolve:({favorite_count}) =>{ return favorite_count}},
		TwitterRetweetField_retweet_count: 	{ type: GraphQLInt,
										resolve:({retweet_count}) =>{ return retweet_count}},
		/*--------------------------nested------------------------*/
		TwitterRetweetField_entities:{ type: twtEntityType,
										resolve:({entities}) =>{ return entities}},
		TwitterRetweetField_retweeted_status: { type: tweetType,
										resolve:({retweeted_status}) =>{ return retweeted_status}},
		TwitterRetweetField_user: 	{ type: twtUserType,
										resolve:({user}) =>{ return user}}
	  })
});

const twtUserType = require('./twtUserType');
const twtEntityType = require('./twtEntityType');
const tweetType = require('./twtTweetType');