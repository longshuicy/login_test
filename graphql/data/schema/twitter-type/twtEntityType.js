var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt
} = require('graphql');

const twtEntityType = module.exports = new GraphQLObjectType({
	name        : 'twtEntity',
	description : 'entity of a tweet or user',
	fields      : () => ({
		/*--------------------------basic------------------------*/
		TwitterEntityField_urls:				{	type: new GraphQLList(GraphQLString),
								resolve: ({urls}) => { 
														var url_list = new Array();
														urls.forEach(function(url){
															url_list.push(url['url']);
														});
														return url_list
													}
							},
		TwitterEntityField_hashtags:			{ 	type: new GraphQLList(GraphQLString),
								resolve: ({hashtags}) => { 
															var tag_list = new Array();
															hashtags.forEach(function(hashtag){
																tag_list.push(hashtag['text']);
															});
															return tag_list 
														}
							},
		TwitterEntityField_user_mentions:		{ type: new GraphQLList(twtUserType),
								resolve:({user_mentions}) =>{ return user_mentions}},
	  })
});

const twtUserType = require('./twtUserType');