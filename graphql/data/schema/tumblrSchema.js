var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');
var tumblrAPI = require('./../../API/tumblrAPI');
	
const tumblrQueryType = module.exports = new GraphQLObjectType({
	name:'tumblrQuery',
	description:'',
	fields: () => ({
		searchPosts:{
			type:new GraphQLList(tumblrBlogType),
			args:{
				tag:	{type:GraphQLString,
							description:'The tag on the posts you\'d like to retrieve'},
				before:	{type:GraphQLInt,
							description:'The timestamp of when you\'d like to see posts before'},
				limit:	{type:GraphQLInt,
							defaultValue:20
							},
				fliter: {type:GraphQLString,
							description:`Specifies the post format to return, other than HTML:
							text – Plain text, no HTMLraw – As entered by the user (no 
							post-processing); if the user writes in Markdown, the Markdown 
							will be returned rather than HTML`
							},
			},
			description:'Get Posts with Tag',
		resolve: (_,args,context) => tumblrAPI(context, resolveName='tagged', id='',args=args)
		},
	})
});

const tumblrBlogType = require('./tumblr-type/tumblrBlogType');