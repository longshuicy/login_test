//var mongoose = require('mongoose');

var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList
} = require('graphql');

const twitterQueryType = require('./twitterSchema');
const redditQueryType = require('./redditSchema');

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
		}
	})
});



module.exports = new GraphQLSchema({
	query:Query
})