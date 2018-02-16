var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLBoolean
} = require('graphql');

var {
	mediaWiki
} = require('./../../API/mediaWikiAPI');

const revisionsType = new GraphQLObjectType({
	name: "revisions",
	description: 'wikiPageContent revisions structure',
	fields: () => ({
		contentformat: {type: GraphQLString},
		contentmodel: {type: GraphQLString},
		html: {type: GraphQLString}
	})
})

const pageIDType = new GraphQLObjectType({
	name: "pageID",
	description: 'wikiPageContent page id structure',
	fields: () => ({
		pageid: {type: GraphQLInt},
		ns: {type: GraphQLInt},
		title: {type: GraphQLString},
		revisions: {type: new GraphQLList(revisionsType)}
	})
})

const pagesType = new GraphQLObjectType({
	name: "pages",
	description: 'wikiPageContent pages structure',
	fields: () => ({
		pageID: {type: pageIDType},
	})
})

const queryType = new GraphQLObjectType({
	name: "query",
	description: 'wikiPageContent query structure',
	fields: () => ({
		pages: {type: pagesType},
	})
})

const wikiPageContentType = new GraphQLObjectType({
	name: "wikiPageContent",
	description: 'wikiPageContent structure',
	fields: () => ({
		batchcomplete: {type: GraphQLString},
		query: {type: queryType}
	})
})

const mediaWikiQueryType = new GraphQLObjectType({
	name:'mediaWikiQuery',
	description: 'media wiki query',
	fields: () => ({
		wikiPageContent : {
			type: wikiPageContentType,
			args:{
				titles: {
					type: GraphQLString,
					description: "Title of the wiki page"
				},
			},
			resolve:(_, args) => mediaWiki(args, "wikiPageContent")
		},
	})
})

module.exports = mediaWikiQueryType

