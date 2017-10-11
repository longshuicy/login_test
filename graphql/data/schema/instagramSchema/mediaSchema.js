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
	followerInfoType
} = require('./relationshipsSchema');

const positionType = new GraphQLObjectType({
	name: 'position',
	description: 'json structure for Position Type',
	fields: () =>({
		x: {type: GraphQLFloat},
		y: {type: GraphQLFloat},
	})
})

const lowResolutionType = new GraphQLObjectType({
	name: 'lowResolution',
	description: 'json structure for lowResolution Type',
	fields: () =>({
		url: {type: GraphQLString},
		width: {type: GraphQLInt},
		height: {type: GraphQLInt}
	})
})

const standardResolutionType = new GraphQLObjectType({
	name: 'standardResolution',
	description: 'json structure for standardResolution Type',
	fields: () =>({
		url: {type: GraphQLString},
		width: {type: GraphQLInt},
		height: {type: GraphQLInt}
	})
})

const thumbnailType = new GraphQLObjectType({
	name: 'thumbnail',
	description: 'json structure for Thumbnail Type',
	fields: () =>({
		url: {type: GraphQLString},
		width: {type: GraphQLInt},
		height: {type: GraphQLInt}
	})
})

const userPhotoType = new GraphQLObjectType({
	name: 'userPhoto',
	description: 'json structure for User Photo Type',
	fields: ()=>({
		user: {type: userType},
		position: {type: positionType},
	})
})

const tagsType = new GraphQLObjectType({
	name: 'tag',
	description: 'json structure for Tags Type',
	fields: ()=>({
		tag: {type: GraphQLString}
	})
})

const mediaCommentsType = new GraphQLObjectType({
	name: 'mediaComments',
	description: 'json structure for Media Comments Type',
	fields: ()=>({
		name: {type: GraphQLString},
		media_count: {type: GraphQLInt}
	})
})

const likesType = new GraphQLObjectType({
	name: 'likes',
	description: 'json structure for Likes Type',
	fields: ()=>({
		count: {type: GraphQLInt}
	})
})

const userType = followerInfoType

const imagesType = new GraphQLObjectType({
	name: 'images',
	description: 'json structure for Images Type',
	fields: ()=>({
		low_resolution: {type: lowResolutionType},
		thumbnail: {type: thumbnailType},
		standard_resolution: {type: standardResolutionType},
	})
})

const videosType = new GraphQLObjectType({
	name: 'videos',
	description: 'json structure for Videos Type',
	fields: ()=>({
		low_resolution: {type: lowResolutionType},
		standard_resolution: {type: standardResolutionType},
	})
})

const ImageType = new GraphQLObjectType({
	name: 'Image',
	description: 'json structure for Image Data Type',
	fields: ()=> ({
		distance: {
			type: GraphQLFloat,
			description: "Only for mediaSearch Type",
		},
		type: {type: GraphQLString},
		users_in_photo: {type: new GraphQLList(userPhotoType)},
		filter: {type: GraphQLString},
		tags: {type: new GraphQLList(tagsType)},
		comments: {type: mediaCommentsType},
		caption: {type: GraphQLString},
		likes: {type: likesType},
		link: {type: GraphQLString},
		user: {type: userType},
		created_time: {type: GraphQLString},
		images: {type: imagesType},
		id: {type: GraphQLString},
		location: {type: GraphQLString},
	})
})

const VideoType = new GraphQLObjectType({
	name: "Video",
	description: "json structure for Video Type",
	fields: ()=> ({
		distance: {
			type: GraphQLFloat,
			description: "Only for mediaSearch Type",
		},
		type: {type: GraphQLString},
		videos: {type: videosType},
		users_in_photo: {type: new GraphQLList(userPhotoType)},
		filter: {type: GraphQLString},
		tags: {type: new GraphQLList(tagsType)},
		comments: {type: mediaCommentsType},
		caption: {type: GraphQLString},
		likes: {type: likesType},
		link: {type: GraphQLString},
		user: {type: userType},
		created_time: {type: GraphQLString},
		images: {type: imagesType},
		id: {type: GraphQLString},
		location: {type: GraphQLString},
	})
})

const resolveType = (result) => {
	if (result.videos){
		return VideoType;
	}else{
		return ImageType;
	}
};

const mediaType = new GraphQLUnionType({
	name: 'media',
	description: 'json structure for Media Type',
	types: [ImageType, VideoType],
	resolveType: resolveType
})

const mediaIDType = new GraphQLObjectType({
	name: "mediaID",
	description: "json structure for Media ID Type",
	fields: ()=> ({
		data: {type: new GraphQLList(mediaType)}
	})
})

const mediaShortCodeType = new GraphQLObjectType({
	name: "mediaShortCode",
	description: "json structure for Media Short Code Type",
	fields: ()=> ({
		data: {type: new GraphQLList(mediaType)}
	})
})

const mediaSearchType = new GraphQLObjectType({
	name: "mediaSearch",
	description: "json structure for Media Search Type",
	fields: ()=> ({
		data: {type: new GraphQLList(mediaType)}
	})
})

module.exports = {
	mediaIDType,
	mediaShortCodeType,
	mediaSearchType,
	mediaType
}
