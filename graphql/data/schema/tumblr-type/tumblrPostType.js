var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLUnionType
} = require('graphql');


const tumblrTextPostType = require('./tumblrTextPostType');
const tumblrPhotoPostType = require('./tumblrPhotoPostType');
const tumblrQuotePostType = require('./tumblrQuotePostType');
const tumblrLinkPostType = require('./tumblrLinkPostType');
const tumblrChatPostType = require('./tumblrChatPostType');
const tumblrAudioPostType = require('./tumblrAudioPostType');
const tumblrVideoPostType = require('./tumblrVideoPostType');
const tumblrAnswerPostType = require('./tumblrAnswerPostType');

const resolveType = (data) => {
	if (data.type === 'text'){
		return tumblrTextPostType;
	}else if(data.type === 'photo'){
		return tumblrPhotoPostType;
	}else if(data.type === 'quote'){
		return tumblrQuotePostType;
	}else if(data.type === 'link'){
		return tumblrLinkPostType;
	}else if(data.type === 'chat'){
		return tumblrChatPostType;
	}else if(data.type === 'audio'){
		return tumblrAudioPostType;
	}else if(data.type === 'video'){
		return tumblrVideoPostType;
	}else{
		return tumblrAnswerPostType;
	}
};

const tumblrPostType = module.exports = new GraphQLUnionType({
	name: 'tumblrPost',
	types: [tumblrTextPostType, tumblrPhotoPostType, tumblrQuotePostType,
			tumblrLinkPostType, tumblrChatPostType, tumblrAudioPostType, 
			tumblrVideoPostType, tumblrAnswerPostType],
	resolveType: resolveType
});





