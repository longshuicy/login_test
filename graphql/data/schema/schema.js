//var mongoose = require('mongoose');

var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList
} = require('graphql');

const mediaWikiQueryType = require('./mediaWikiSchema');
const facebookQueryType = require('./fbSchema');
const flickrQueryType = require('./flickrSchema');
const instagramQueryType = require('./instagramSchema');
const pinterestQueryType = require('./pinterestSchema');
const redditQueryType = require('./redditSchema');
const spotifyQueryType = require('./spotifySchema');
const stackExchangeQueryType = require('./stackExchangeSchema');
const tumblrQueryType = require('./tumblrSchema');
const twitterQueryType = require('./twitterSchema');
const youtubeQueryType = require('./youtubeSchema');

function wrapper(){
	//console.log(headers);
	return {}
}

const Query = new GraphQLObjectType({
	name: "Query",
	description: 'all social media ',
	fields:() => ({
		twitter:{
			type:twitterQueryType,
			resolve: () => wrapper()
			},
		reddit:{
			type: redditQueryType,
			resolve:() => wrapper()
		},
		wikipedia:{
			type: mediaWikiQueryType,
			resolve: () => wrapper()
		},
		stackoverflow: {
			type: stackExchangeQueryType,
			resolve: () => wrapper()
		},
		spotify: {
			type: spotifyQueryType,
			resolve: () => wrapper()
		},
		flickr: {
			type: flickrQueryType,
			resolve: () => wrapper()
		},
		instagram: {
			type: instagramQueryType,
			resolve: () => wrapper()
		},
		tumblr: {
			type: tumblrQueryType,
			resolve: () => wrapper()
		},
		youtube: {
			type: youtubeQueryType,
			resolve: () => wrapper()
		},
		facebook: {
			type: facebookQueryType,
			resolve: () => wrapper()
		}
	})
});



module.exports = new GraphQLSchema({
	query:Query
})