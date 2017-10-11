var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLFloat
} = require('graphql');

var {
	pinterest
} = require('./../../API/pinterestAPI');

var {
	pDataType
} = require('./pinterestSchema/userSchema');

var {
	pBoardsType,
	pSelfFollowerType,
	pSelfInterestsType,
	pSelfLikesType,
	pSelfPinsType,
	pSearchBoardsType,
	pSearchPinsType
} = require('./pinterestSchema/selfSchema');

var pUserArgs = {
	account_type: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	bio: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	counts: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	created_at: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	first_name: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	last_name: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	id: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	url: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	username: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
};

var pBoardsArgs = {
	creator: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	description: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	counts: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	created_at: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	name: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	privacy: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	id: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	url: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	reason: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
};

var pLikesArgs = {
	attribution: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	board: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	color: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	created_at: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	creator: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	id: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	link: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	media: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	metadata: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	note: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	original_link: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	url: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
};

var pPinsArgs = pLikesArgs;

var pSearchBoardsArgs = {
	creator: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	description: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	counts: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	created_at: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	name: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	privacy: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	id: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	url: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	reason: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	query: {
		type: GraphQLString,
	}
};

var pSearchPinsArgs = {
	attribution: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	board: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	color: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	created_at: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	creator: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	id: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	link: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	media: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	metadata: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	note: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	original_link: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	url: {
		type: GraphQLBoolean,
		defaultValue: true,
	},
	query: {
		type: GraphQLString,
	}
};

const pinterestQueryType = new GraphQLObjectType({
	name: 'pinterestQuery',
	description: 'pinterest api call',
	fields: () => ({
		pUserRoot : {
			type: pDataType,
			args: pUserArgs,
			resolve:(_, args) => pinterest(args, "pUserRoot")
		},
		pSelfBoards : {
			type: pBoardsType,
			args: pBoardsArgs,
			resolve:(_, args) => pinterest(args, "pSelfBoards")
		},
		pSelfBoardsSuggested : {
			type: pBoardsType,
			args: pBoardsArgs,
			resolve:(_, args) => pinterest(args, "pSelfBoardsSuggested")
		},
		pSelfFollower : {
			type: pSelfFollowerType,
			args: pUserArgs,
			resolve:(_, args) => pinterest(args, "pSelfFollower")
		},
		pSelfFollowingBoards : {
			type: pBoardsType,
			args: pBoardsArgs,
			resolve:(_, args) => pinterest(args, "pSelfFollowingBoards")
		},
		pSelfInterests : {
			type: pSelfInterestsType,
			args: {
				id: {
					type: GraphQLBoolean,
					defaultValue: true
				},
				name: {
					type: GraphQLBoolean,
					defaultValue: true
				},
			},
			resolve:(_, args) => pinterest(args, "pSelfInterests")
		},
		pSelfFollowing : {
			type: pSelfFollowerType,
			args: pUserArgs,
			resolve:(_, args) => pinterest(args, "pSelfFollowing")
		},
		pSelfLikes : {
			type: pSelfLikesType,
			args: pLikesArgs,
			resolve:(_, args) => pinterest(args, "pSelfLikes")
		},
		pSelfPins : {
			type: pSelfPinsType,
			args: pPinsArgs,
			resolve:(_, args) => pinterest(args, "pSelfPins")
		},
		pSearchBoards : {
			type: pSearchBoardsType,
			args: pSearchBoardsArgs,
			resolve:(_, args) => pinterest(args, "pSearchBoards")
		},
		pSearchPins : {
			type: pSearchPinsType,
			args: pSearchPinsArgs,
			resolve:(_, args) => pinterest(args, "pSearchPins")
		},
	})

})

module.exports = {
	pinterestQueryType
}
