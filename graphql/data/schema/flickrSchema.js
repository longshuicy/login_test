var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');

var flickrAPI = require('./../../API/flickrAPI');

// root
const flickrQueryType = module.exports = new GraphQLObjectType({
	name:'flickrQuery',
	description:'Query flickr photo and group by keywords or other criteria',
	fields: () => ({
		queryPhoto:{
			type: new GraphQLList(flickrPhotoType),
			args:{
				user_id:	{ 	type:GraphQLString,
								description:'The NSID of the user who\'s photo to search or me.' },
				tags:		{ 	type: new GraphQLList(GraphQLString),
								description:`A comma-delimited list of tags. Photos with one or
								more of the tags listed will be returned. You can exclude results
								that match a term by prepending it with a - character.` },
				tag_mode: 	{ 	type: GraphQLString,
								defaultvalue:'any',
								description:`Either 'any' for an OR combination of tags, or 'all' for 
								an AND combination. Defaults to 'any' if not specified.` },
				text:		{	type: GraphQLString,
								description:`A free text search. Photos who's title, description or tags 
								contain the text will be returned. You can exclude results that match a term 
								by prepending it with a - character.`},
				min_upload_date:	{	type: GraphQLString,
										description:`Minimum upload date. Photos with an upload date 
										greater than or equal to this value will be returned. The date 
										can be in the form of a unix timestamp or mysql datetime.`},
				max_upload_date:	{	type: GraphQLString,
										description:`Maximum upload date. Photos with an upload date 
										less than or equal to this value will be returned. The date can 
										be in the form of a unix timestamp or mysql datetime.`},
				min_taken_date:		{	type: GraphQLString,
										description:`Minimum taken date. Photos with an taken date greater 
										than or equal to this value will be returned. The date can be in the 
										form of a mysql datetime or unix timestamp.`},
				sort:				{	type: GraphQLString,
										defaultvalue:'date-posted-desc',
										description:`The order in which to sort returned photos. Deafults to 
										date-posted-desc (unless you are doing a radial geo query, in which 
										case the default sorting is by ascending distance from the point 
										specified). The possible values are: date-posted-asc, date-posted-desc, 
										date-taken-asc, date-taken-desc, interestingness-desc, 
										interestingness-asc, and relevance.`},
				bbox:				{	type: new GraphQLList(GraphQLString),
										description:`A comma-delimited list of 4 values defining the Bounding 
										Box of the area that will be searched. 
The 4 values represent the bottom-left corner of the box and the top-right corner, minimum_longitude, 
minimum_latitude, maximum_longitude, maximum_latitude. 
Longitude has a range of -180 to 180 , latitude of -90 to 90. Defaults to -180, -90, 180, 90 if not specified. 
Unlike standard photo queries, geo (or bounding box) queries will only return 250 results per page. 
Geo queries require some sort of limiting agent in order to prevent the database from crying. This is basically 
like the check against "parameterless searches" for queries without a geo component. 
A tag, for instance, is considered a limiting agent as are user defined min_date_taken and min_date_upload 
parameters — If no limiting factor is passed we return only photos added in the last 12 hours (though we 
may extend the limit in the future).`},
				accuracy:			{	type: GraphQLInt,
										defaultvalue:16,
										description:`Recorded accuracy level of the location information. Current range is 1-16 :
World level is 1,Country is ~3,Region is ~6,City is ~11,Street is ~16,Defaults to maximum value if not specified.`},
				content_type:		{	type: GraphQLString,
										description:`Content Type setting:1 for photos only.2 for screenshots only.
3 for 'other' only.4 for photos and screenshots.5 for screenshots and 'other'.6 for photos and 'other'.7 for photos, 
screenshots, and 'other' (all).`},
				group_id:			{	type: GraphQLString,
										description:`The id of a group who's pool to search. If specified, 
										only matching photos posted to the group's pool will be returned.`},
				contacts:			{	type: GraphQLString,
										description:`Search your contacts. Either 'all' or 'ff' for just friends and family. (Experimental)`},
				woe_id:				{	type: GraphQLString,
										description:`A 32-bit identifier that uniquely represents spatial entities. 
(not used if bbox argument is present). Geo queries require some sort of limiting agent in order to prevent the database from crying. 
This is basically like the check against "parameterless searches" for queries without a geo component. A tag, for instance, is considered 
a limiting agent as are user defined min_date_taken and min_date_upload parameters — If no limiting factor is passed we return only 
photos added in the last 12 hours (though we may extend the limit in the future).`},
				place_id:			{	type: GraphQLString,
										description:`A Flickr place id. (not used if bbox argument is present). 
Geo queries require some sort of limiting agent in order to prevent the database from crying. This is basically 
like the check against "parameterless searches" for queries without a geo component. A tag, for instance, is 
considered a limiting agent as are user defined min_date_taken and min_date_upload parameters — If no limiting 
factor is passed we return only photos added in the last 12 hours (though we may extend the limit in the future).`},
				media:				{	type: GraphQLString,
										defaultvalue:'all',
										description:`Filter results by media type. Possible values are all (default), photos or videos`},
				has_geo:			{	type: GraphQLInt,
										description:`Any photo that has been geotagged, or if the value is "0" any photo that has not been geotagged. 
Geo queries require some sort of limiting agent in order to prevent the database from crying. This is basically like the check against
 "parameterless searches" for queries without a geo component. A tag, for instance, is considered a limiting agent as are user defined
 min_date_taken and min_date_upload parameters — If no limiting factor is passed we return only photos added in the 
 last 12 hours (though we may extend the limit in the future).`},
				geo_context:		{ 	type: GraphQLInt,
										description:`Geo context is a numeric value representing the photo's geotagginess beyond latitude 
and longitude. For example, you may wish to search for photos that were taken "indoors" or "outdoors". The current list of context IDs is :
0, not defined. 1, indoors. 2, outdoors.`},
				lat:				{	type: GraphQLFloat,
										description:`A valid latitude, in decimal format, for doing radial geo queries. 
Geo queries require some sort of limiting agent in order to prevent the database from crying. This is basically like the check against 
"parameterless searches" for queries without a geo component. A tag, for instance, is considered a limiting agent as are user defined 
min_date_taken and min_date_upload parameters — If no limiting factor is passed we return only photos added in the last 12 hours 
(though we may extend the limit in the future).`},
				lon:				{	type: GraphQLFloat,
										description:`A valid longitude, in decimal format, for doing radial geo queries. 
Geo queries require some sort of limiting agent in order to prevent the database from crying. This is basically like the check against 
"parameterless searches" for queries without a geo component. A tag, for instance, is considered a limiting agent as are user defined 
min_date_taken and min_date_upload parameters — If no limiting factor is passed we return only photos added in the last 12 hours 
(though we may extend the limit in the future).`},
				radius:				{	type: GraphQLInt,
										description:`A valid radius used for geo queries, greater than zero and less than 20 
										miles (or 32 kilometers), for use with point-based geo queries. The default value is 5 (km).`},
				radius_units:		{	type: GraphQLString,
										description:`The unit of measure when doing radial geo queries. Valid options 
										are "mi" (miles) and "km" (kilometers). The default is "km".`},
				in_gallery:			{	type: GraphQLBoolean,
										defaultvalue:false,
										description:`Limit the scope of the search to only photos that are in a gallery? Default is false, search all photos.`},
				extras:				{	type: new GraphQLList(GraphQLString),
										description:`A comma-delimited list of extra information to fetch for each returned record. Currently supported 
										fields are: description, license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, 
										geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o`},
				per_page:			{	type: GraphQLInt,
										defaultvalue:10,
										description:`Number of photos to return per page. If this argument is omitted, 
										it defaults to 100. The maximum allowed value is 500.`},
				page:				{	type:GraphQLInt,
										defaultvalue:1,
										description:`The page of results to return. If this argument is omitted, it defaults to 1.`}
			},				
		resolve: (_,args,context) => flickrAPI(context,resolveName = "searchPhotos", addon = {},args = args)},
		
		queryGroup:{
			type: new GraphQLList(flickrGroupType),
			args:{
					text:		{	type:GraphQLString,
									description:'The text to search for.'},
					per_page:	{	type:GraphQLInt,
									description:'Number of groups to return per page. If this argument is ommited, it defaults to 100. The maximum allowed value is 500.'},
					page:		{	type:GraphQLInt,
									description:'The page of results to return. If this argument is ommited, it defaults to 1.'}
				},
			resolve: (_,args,context) => flickrAPI(context, resolveName = "searchGroups",addon ={}, args = args)},
			
		recentPhotos:{
			type: new GraphQLList(flickrPhotoType),
			description:'Returns a list of the latest public photos uploaded to flickr.',
			args:{
					extras: 	{type:GraphQLString},
					per_page: 	{type:GraphQLInt},
					page:		{type:GraphQLInt}
			},
			resolve: (_,args,context) => flickrAPI(context,resolveName = "recentPhotos", addon={}, args=args)},
			
		queryPlace:{
			type: new GraphQLList(flickrPlaceType),
			description:`Return a list of place IDs for a query string.
The flickr.places.find method is not a geocoder. It will round up to the nearest place type to 
which place IDs apply. For example, if you pass it a street level address it will return the city 
that contains the address rather than the street, or building, itself.`,
			args:{
					query:{type:GraphQLString}
			},
			resolve: (_,args,context) => flickrAPI(context,resolveName="searchPlaces", addon={},args=args)},
			
		queryPlaceBoundingBox:{
			type: new GraphQLList(flickrPlaceType),
			description:`Return all the locations of a matching place type for a bounding box.
The maximum allowable size of a bounding box (the distance between the SW and NE corners) is 
governed by the place type you are requesting. Allowable sizes are as follows: neighbourhood: 3km (1.8mi),
locality: 7km (4.3mi), county: 50km (31mi), region: 200km (124mi), country: 500km (310mi),continent: 1500km (932mi)`,
			args:{
					bbox:{type:GraphQLString,
							description:`A comma-delimited list of 4 values defining the Bounding Box of the area that 
							will be searched. The 4 values represent the bottom-left corner of the box and the top-
							right corner, minimum_longitude, minimum_latitude, maximum_longitude, maximum_latitude.`},
					place_type_id:	{type:GraphQLInt,
									description:`The numeric ID for a specific place type to cluster photos by. 
												Valid place type IDs are :22: neighbourhood, 7: locality, 8: region,
												12: country,29: continent`}
			},
			resolve: (_,args,context) => flickrAPI(context,resolveName="boundingBox", addon={}, args=args)},
			
		topPlaces:{
			type: new GraphQLList(flickrPlaceType),
			description:'Return the top 100 most geotagged places for a day.',
			args:{
					place_type_id:	{type:GraphQLInt,
										description:`The numeric ID for a specific place type to cluster photos by. 
													Valid place type IDs are :22: neighbourhood, 7: locality, 8: region,
													12: country,29: continent`},
					date:			{type:GraphQLString},
					woe_id:			{type:GraphQLString},
					place_id:		{type:GraphQLString}
			},
			resolve: (_,args,context) => flickrAPI(context,resolveName="topPlaces",addon={},args=args)},
		
		queryUser:{
			type: flickrPersonType,
			description:'Return a user\'s NSID, given their username.',
			args:{username:{type:GraphQLString}},
			resolve: (_,args,context) => flickrAPI(context,resolveName="searchUsers", addon={}, args=args)},
		
		hotTags:{
			type: new GraphQLList(flickrTagType),
			description:'Returns a list of hot tags for the given period.',
			args:{
				period:{
					type:GraphQLString,
					description:'The period for which to fetch hot tags. Valid values are day and week (defaults to day).'},
				count:{
					type:GraphQLInt, 
					description:'The number of tags to return. Defaults to 20. Maximum allowed value is 200.'}},
				resolve: (_,args,context)=> flickrAPI(context,resolveName="hotTags", addon={},args=args)},
	})
});

const flickrPhotoType = require('./flickr-type/flickrPhotoType');
const flickrGroupType = require('./flickr-type/flickrGroupType');
const flickrPlaceType = require('./flickr-type/flickrPlaceType');
const flickrPersonType = require('./flickr-type/flickrPersonType');
const flickrPandaType = require('./flickr-type/flickrPandaType');
const flickrTagType = require('./flickr-type/flickrTagType');
