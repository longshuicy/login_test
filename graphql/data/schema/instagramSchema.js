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
	instagram
} = require('./../../API/instagramAPI');

var {
	usersType,
	userInfoType,
	usersSearchType,
} = require('./instagramSchema/usersSchema');

var {
	usersSelfFollowsType,
	usersSelfFollowedByType,
	usersSelfRequestedByType,
	usersRelationshipType,
} = require('./instagramSchema/relationshipsSchema');

var {
	mediaIDType,
	mediaShortCodeType,
	mediaSearchType
} = require('./instagramSchema/mediaSchema.js');

var {
	likesType
} = require('./instagramSchema/likesSchema.js');

var {
	commentsType
} = require('./instagramSchema/commentsSchema.js');

var {
	tagNameType,
	tagMediaRecentType,
	tagSearchType
} = require('./instagramSchema/tagsSchema.js');

var {
	locationIDType,
	locationMediaRecentType,
	locationSearchType
} = require('./instagramSchema/locationsSchema.js');

const instagramQueryType = new GraphQLObjectType({
	name: 'instagramQuery',
	description: 'instagram api call',
	fields: () => ({
		usersSelf : {
			type: usersType,
			resolve:(_, args,context) => instagram(context,args, "usersSelf")
		},
		users : {
			type: usersType,
			args:{
				user_id: {
					type: GraphQLInt,
					description: "User Id"
				},
			},
			resolve:(_, args,context) => instagram(context,args, "users")
		},
		usersSearch : {
			type: usersSearchType,
			args:{
				q: {
					type: GraphQLString,
					description: "A query string"
				},
				count: {
					type: GraphQLInt,
					description: "Number of users to return"
				}
			},
			resolve:(_, args,context) => instagram(context,args, "usersSearch")
		},
		usersSelfFollows: {
			type: usersSelfFollowsType,
			resolve:(_, args,context) => instagram(context,args, "usersSelfFollows")
		},
		usersSelfFollowedBy:{
			type: usersSelfFollowedByType,
			resolve:(_, args,context) => instagram(context,args, "usersSelfFollowedBy")
		},
		usersSelfRequestedBy:{
			type: usersSelfRequestedByType,
			resolve:(_, args,context) => instagram(context,args, "usersSelfRequestedBy")
		},
		usersRelationship:{
			type: usersRelationshipType,
			args:{
				user_id: {
					type: GraphQLInt,
					description: "User Id"
				}
			},
			resolve:(_, args,context) => instagram(context,args, "usersRelationship")
		},
		mediaID:{
			type: mediaIDType,
			args:{
				media_id: {
					type: GraphQLString,
					description: "Media ID"
				}
			},
			resolve:(_, args,context) => instagram(context,args, "mediaID")
		},
		mediaShortCode:{
			type: mediaShortCodeType,
			args:{
				shortcode: {
					type: GraphQLString,
					description: "Media Short Code"
				}
			},
			resolve:(_, args,context) => instagram(context,args, "mediaShortCode")
		},
		mediaSearch:{
			type: mediaSearchType,
			args:{
				lat: {
					type: GraphQLString,
					description: "Media Search Latitude"
				},
				lng: {
					type: GraphQLString,
					description: "Media Search Longitude"
				}
			},
			resolve:(_, args,context) => instagram(context,args, "mediaSearch")
		},
		comments:{
			type: commentsType,
			args:{
				media_id: {
					type: GraphQLString,
					description: "comments"
				}
			},
			resolve:(_, args,context) => instagram(context,args, "comments")
		},
		likes:{
			type: likesType,
			args:{
				media_id: {
					type: GraphQLString,
					description: "likes"
				}
			},
			resolve:(_, args,context) => instagram(context,args, "likes")
		},
		tagName:{
			type: tagNameType,
			args:{
				tag_name: {
					type: GraphQLString,
					description: "tag name"
				}
			},
			resolve:(_, args,context) => instagram(context,args, "tagName")
		},
		tagMediaRecent:{
			type: tagMediaRecentType,
			args:{
				tag_name: {
					type: GraphQLString,
					description: "tag name"
				}
			},
			resolve:(_, args,context) => instagram(context,args, "tagMediaRecent")
		},
		tagSearch:{
			type: tagSearchType,
			args:{
				q: {
					type: GraphQLString,
					description: "query"
				}
			},
			resolve:(_, args,context) => instagram(context,args, "tagSearch")
		},
		locationID:{
			type: locationIDType,
			args:{
				location_id: {
					type: GraphQLString,
					description: "query"
				}
			},
			resolve:(_, args,context) => instagram(context,args, "locationID")
		},
		locationMediaRecent:{
			type: locationMediaRecentType,
			args:{
				location_id: {
					type: GraphQLString,
					description: "query"
				}
			},
			resolve:(_, args,context) => instagram(context,args, "locationMediaRecent")
		},
		locationSearch:{
			type: locationSearchType,
			args:{
				lat: {
					type: GraphQLFloat,
					description: "latitude"
				},
				lng: {
					type: GraphQLFloat,
					description: "longitude"
				}
			},
			resolve:(_, args,context) => instagram(context,args, "locationSearch")
		},
	})
})

module.exports = instagramQueryType;