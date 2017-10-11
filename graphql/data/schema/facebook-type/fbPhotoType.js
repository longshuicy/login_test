var {
	GraphQLList,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLFloat
} = require('graphql');
var getField = require('../../../API/fbAPI').getField;
var getEdge = require('../../../API/fbAPI').getEdge;

const fbPhotoType = module.exports = new GraphQLObjectType({
	name: 'fbPhoto',
	description: 'Return a facebook photo.',
	fields: () => ({
		id:				{ type: GraphQLString },
		name: 			{ type: GraphQLString },
		created_time:	{ type: GraphQLString },
		backdated_time:	{ type: GraphQLString,
							resolve: ({id}) => getField({id},'backdated_time')},
		height:			{ type: GraphQLInt,
							resolve: ({id}) => getField({id},'height')},
		width:			{ type: GraphQLInt,
							resolve: ({id}) => getField({id},'width')},
		icon: 			{ type: GraphQLString,
							resolve: ({id}) => getField({id},'icon')},
		link:			{ type: GraphQLString,
							resolve: ({id}) => getField({id},'link')},
		page_story_id:	{ type: GraphQLString,
							resolve: ({id}) => getField({id},'page_story_id')},
		picture:		{ type: GraphQLString,
							resolve: ({id}) => getField({id},'picture')},
		updated_time:	{ type: GraphQLString,
							resolve: ({id}) => getField({id},'updated_time')},
		backdated_time_granularity:	{ type: GraphQLString,
							resolve: ({id}) => getField({id},'backdated_time_granularity')},	

		images:			{ type: new GraphQLList(fbPlatformImageSourceType),
							resolve: ({id}) => getField({id},'images')},
		name_tags: 		{ type: new GraphQLList(fbEntityAtTextRangeType),
							resolve: ({id}) => getField({id},'name_tags')},
		webp_images:	{ type: new GraphQLList(fbPlatformImageSourceType),
							resolve: ({id}) => getField({id},'webp_images')},	
		album: 			{ type: fbAlbumType,
							resolve: ({id}) => getField({id},'album')},
		from:			{ type: fbProfileType,
							resolve: ({id}) => getField({id},'from')},
		event: 			{ type: fbEventType,
							resovle: ({id}) => getField({id},'event')},
		place:			{ type: fbPlaceType,
							resolve: ({id}) => getField({id},'place')},
		/*-------------------------- edges ---------------------------------- */
		reactions:		{ type: new GraphQLList(fbReactionType),
								resolve: ({id}) => getEdge({id},'reactions')},
		sharedposts:	{ type: new GraphQLList(fbPostType),
								resolve: ({id}) => getEdge({id},'sharedposts')},
		sponsor_tags:	{ type: new GraphQLList(fbPageType),
								resolve: ({id}) => getEdge({id},'sponsor_tags')},
		tags:			{ type: new GraphQLList(fbTaggableSubjectType),
								resolve: ({id}) => getEdge({id},'tags')},
		likes:			{ type: new GraphQLList(fbLikeType),
								resolve: ({id}) => getEdge({id},'likes')},
		comments:		{ type: new GraphQLList(fbCommentType),
							resolve: ({id}) => getEdge({id},'comments')}
	})
});
		
const fbPlatformImageSourceType = new GraphQLObjectType({
	name:'fbPlatformImageSource',
	description: `The different stored representations of the photo. 
	Can vary in number based upon the size of the original photo.`,
	fields: ()=>({
		height:	{ type: GraphQLInt},
		width:	{ type: GraphQLInt},
		source:	{ type: GraphQLString}
	})
});
const fbTaggableSubjectType = new GraphQLObjectType({
	name:'fbTaggableSubject',
	description:'Represents an object can be tagged in some content',
	fields:()=>({
		id:				{type:GraphQLString},
		name:			{type:GraphQLString},
		created_time:	{type:GraphQLString},
		x:				{type:GraphQLFloat},
		y:				{type:GraphQLFloat},
	})
	
});
const fbEntityAtTextRangeType = require('./fbEntityAtTextRangeType');		
const fbAlbumType = require('./fbAlbumType');
const fbUserType = require('./fbUserType');
const fbEventType = require('./fbEventType');
const fbPlaceType = require('./fbPlaceType');
const fbCommentType = require('./fbCommentType');
const fbLikeType = require('./fbLikeType');
const fbReactionType = require('./fbReactionType');
const fbPostType = require('./fbPostType');
const fbPageType = require('./fbPageType');
const fbProfileType = require('./fbProfileType');

		
		
		
		
		
		
		
		