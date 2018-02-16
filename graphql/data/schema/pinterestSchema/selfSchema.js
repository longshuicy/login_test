var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLUnionType,
	GraphQLFloat
} = require('graphql');

var {
	pUserType
} = require('./userSchema.js')

const pCreatorType = new GraphQLObjectType({
	name: 'creator',
	description: 'json structure for PInterest Creator Type',
	fields: ()=> ({
		url: {type: GraphQLString},
		first_name: {type: GraphQLString},
		last_name: {type: GraphQLString},
		id: {type: GraphQLString},
	})
})

const pBoardsCountsType = new GraphQLObjectType({
	name: 'boardsCounts',
	description: 'json structure for PInterest Boards Counts Type',
	fields: ()=> ({
		pins: {type: GraphQLInt},
		collaborators: {type: GraphQLInt},
		followers: {type: GraphQLInt},
	})
})

const pMediaType = new GraphQLObjectType({
	name: 'pMedia',
	description: 'json structure for PInterest Media Type',
	fields: ()=> ({
		type: {type: GraphQLString}
	})
})

const pMetaDataType = new GraphQLObjectType({
	name: 'pMetaData',
	description: 'json structure for PInterest Meta Data Type',
	fields: ()=> ({
		link: {type: pLinkType}
	})
})

const pLinkType = new GraphQLObjectType({
	name: 'pLink',
	description: 'json structure for PInterest Link Type',
	fields: ()=> ({
		locale: {type: GraphQLString},
		title: {type: GraphQLString},
		site_name: {type: GraphQLString},
		description: {type: GraphQLString},
		favicon: {type: GraphQLString}
	})
})

const pAttributionType = new GraphQLObjectType({
	name: 'pAttribution',
	description: 'json structure for PInterest Attribution Type',
	fields: ()=> ({
		url: {type: GraphQLString},
		title: {type: GraphQLString},
		provider_icon_url: {type: GraphQLString},
		author_name: {type: GraphQLString},
		provider_favicon_url: {type: GraphQLString},
		author_url: {type: GraphQLString},
		provider_name: {type: GraphQLString},
	})
})

const pBoardsDataType = new GraphQLObjectType({
	name: 'boardsData',
	description: 'json structure for PInterest Boards Data Type',
	fields: ()=> ({
		name: {type: GraphQLString},
		creator: {type: pCreatorType},
		url: {type: GraphQLString},
		created_at: {type: GraphQLString},
		privacy: {type: GraphQLString},
		reason: {type: GraphQLString},
		// image: {type: }
		counts: {type: pBoardsCountsType},
		id: {type: GraphQLString},
		description: {type: GraphQLString}
	})
})

const pInterestsDataType = new GraphQLObjectType({
	name: 'pInterestsData',
	description: 'json structure for PInterest Self Interests Data Type',
	fields: ()=> ({
		id: {type: GraphQLString},
		name: {type: GraphQLString}
	})
})

const pLikesDataType = new GraphQLObjectType({
	name: 'pLikesData',
	description: 'json structure for PInterest Self Likes Data Type',
	fields: ()=> ({
		attribution: {type: pAttributionType},
		creator: {type: pCreatorType},
		url: {type: GraphQLString},
		media: {type: pMediaType},
		created_at: {type: GraphQLString},
		original_link: {type: GraphQLString},
		note: {type: GraphQLString},
		color: {type: GraphQLString},
		link: {type: GraphQLString},
		counts: {type: pBoardsCountsType},
		id: {type: GraphQLString},
		metadata: {type: pMetaDataType}
	})
})

const pBoardsType = new GraphQLObjectType({
	name: 'boards',
	description: 'json structure for PInterest Boards Type',
	fields: ()=> ({
		data: {type: new GraphQLList(pBoardsDataType)}
	})
})

var pSelfFollowerType = new GraphQLObjectType({
	name: 'pSelfFollower',
	description: 'json structure for PInterest Self Follower Type',
	fields: ()=> ({
		data: {type: new GraphQLList(pUserType)}
	})
})

var pSelfInterestsType = new GraphQLObjectType({
	name: 'pSelfInterests',
	description: 'json structure for PInterest Self Interests Type',
	fields: ()=> ({
		data: {type: new GraphQLList(pInterestsDataType)}
	})
})

var pSelfLikesType = new GraphQLObjectType({
	name: 'pSelfLikes',
	description: 'json structure for PInterest Self Likes Type',
	fields: ()=> ({
		data: {type: new GraphQLList(pLikesDataType)},
	})
})

var pSelfPinsType = new GraphQLObjectType({
	name: 'pSelfPins',
	description: 'json structure for PInterest Self Pins Type',
	fields: ()=> ({
		data: {type: new GraphQLList(pLikesDataType)},
	})
})

var pSearchBoardsType = new GraphQLObjectType({
	name: 'pSearchBoards',
	description: 'json structure for PInterest Search Boards Type',
	fields: ()=> ({
		data: {type: new GraphQLList(pBoardsDataType)}
	})
})

var pSearchPinsType = new GraphQLObjectType({
	name: 'pSearchPins',
	description: 'json structure for PInterest Search Pins Type',
	fields: ()=> ({
		data: {type: new GraphQLList(pLikesDataType)}
	})
})

module.exports = {
	pBoardsType,
	pSelfFollowerType,
	pSelfInterestsType,
	pSelfLikesType,
	pSelfPinsType,
	pSearchBoardsType,
	pSearchPinsType
}

