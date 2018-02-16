import os
from py2neo import Graph, Path, authenticate
from Twitter.GraphGenerator import GraphGenerator
import json
import time

class TwitterParser(object):
	def __init__(self, graph):
		self.GraphGenerator = None
		# authenticate("localhost:7474", "neo4j", "123456")
		# neo4jUrl = os.environ.get('NEO4J_URL',"http://localhost:7474/db/data/")
		# self.graph = Graph(neo4jUrl)
		self.graph = graph

	def createData(self):
		# self.graph.cypher.execute("CREATE CONSTRAINT ON (d:Data) ASSERT d.neo4j_id IS UNIQUE;")
		return

	def createUser(self, username, hashkey):
		# data = open("users.json", 'r', encoding = 'utf-8').read()
		# data = json.loads(data)
		data = self.GraphGenerator.getUser()
		query = """
			WITH {data} as json_data
			UNWIND json_data.data as q
			MERGE (d:Data {neo4j_id:q.author_id}) ON CREATE
			SET d.resource = q.resource,
				d.object = q.object,
				d.author_id = q.author_id,
				d.author_id_str = CASE WHEN q.author_id_str is not null THEN q.author_id_str ELSE 'Missing author_id_str for user ' + q.author_id END,
				d.name = CASE WHEN q.name is not null THEN q.name ELSE 'Missing name for user ' + q.author_id END,
				d.screen_name = CASE WHEN q.screen_name is not null THEN q.screen_name ELSE 'Missing screen_name for user ' + q.author_id END,
				d.description = CASE WHEN q.description is not null THEN q.description ELSE 'Missing description for user ' + q.author_id END,
				d.author_created_at = CASE WHEN q.author_created_at is not null THEN q.author_created_at ELSE 'Missing author_created_at for user ' + q.author_id END,
				d.profile_image_url = CASE WHEN q.profile_image_url is not null THEN q.profile_image_url ELSE 'Missing profile_image_url for user ' + q.author_id END,
				d.profile_banner_url = CASE WHEN q.profile_banner_url is not null THEN q.profile_banner_url ELSE 'Missing profile_banner_url for user ' + q.author_id END,
				d.url = CASE WHEN q.url is not null THEN q.url ELSE 'Missing url for user ' + q.author_id END,
				d.location = CASE WHEN q.location is not null THEN q.location ELSE 'Missing location for user ' + q.author_id END,
				d.tweets_count = CASE WHEN q.tweets_count is not null THEN q.tweets_count ELSE 'Missing tweets_count for user ' + q.author_id END,
				d.followers_count = CASE WHEN q.followers_count is not null THEN q.followers_count ELSE 'Missing followers_count for user ' + q.author_id END,
				d.friends_count = CASE WHEN q.friends_count is not null THEN q.friends_count ELSE 'Missing friends_count for user ' + q.author_id END,
				d.listed_count = CASE WHEN q.listed_count is not null THEN q.listed_count ELSE 'Missing listed_count for user ' + q.author_id END,
				d.favourites_count = CASE WHEN q.favourites_count is not null THEN q.favourites_count ELSE 'Missing favourites_count for user ' + q.author_id END,
				d.statuses_count = CASE WHEN q.statuses_count is not null THEN q.statuses_count ELSE 'Missing statuses_count for user ' + q.author_id END,
				d.time_zone = CASE WHEN q.time_zone is not null THEN q.time_zone ELSE 'Missing time_zone for user ' + q.author_id END,
				d.protected = CASE WHEN q.protected is not null THEN q.protected ELSE 'Missing protected for user ' + q.author_id END,
				d.verified = CASE WHEN q.verified is not null THEN q.verified ELSE 'Missing verified for user ' + q.author_id END,
				d.is_translator = CASE WHEN q.is_translator is not null THEN q.is_translator ELSE 'Missing is_translator for user ' + q.author_id END,
				d.contributors_enabled = CASE WHEN q.contributors_enabled is not null THEN q.contributors_enabled ELSE 'Missing contributors_enabled for user ' + q.author_id END,
				d.geo_enabled = CASE WHEN q.geo_enabled is not null THEN q.geo_enabled ELSE 'Missing geo_enabled for user ' + q.author_id END,
				d.lang = CASE WHEN q.lang is not null THEN q.lang ELSE 'Missing lang for user ' + q.author_id END,
			""" + "d.system_user_username = '" + username + "', d.system_user_hashkey = '" + hashkey + "'"

		results = self.graph.cypher.execute(query, data = data)

	def createTweet(self, username, hashkey):
		# data = open("tweets.json", 'r', encoding = 'utf-8').read()
		# data = json.loads(data)
		data = self.GraphGenerator.getTweet()
		query = """
			WITH {data} as json_data
			UNWIND json_data.data as q
			MERGE (d:Data {neo4j_id:q.id}) ON CREATE
			SET d.resource = q.resource,
				d.object = q.object,
				d.tweet_id = q.id,
				d.id_str = CASE WHEN q.id_str is not null THEN q.id_str ELSE 'Missing id_str for tweet ' + q.id END,
				d.created_at = CASE WHEN q.created_at is not null THEN q.created_at ELSE 'Missing created_at for tweet ' + q.id END,
				d.text = CASE WHEN q.text is not null THEN q.text ELSE 'Missing text for tweet ' + q.id END,
				d.retweet_count = CASE WHEN q.retweet_count is not null THEN q.retweet_count ELSE 'Missing retweet_count for tweet ' + q.id END,
				d.favorite_count = CASE WHEN q.favorite_count is not null THEN q.favorite_count ELSE 'Missing favorite_count for tweet ' + q.id END,
				d.retweeted = CASE WHEN q.retweeted is not null THEN q.retweeted ELSE 'Missing retweeted for tweet ' + q.id END,
				d.favorited = CASE WHEN q.favorited is not null THEN q.favorited ELSE 'Missing favorited for tweet ' + q.id END,
				d.possibly_sensitive = CASE WHEN q.possibly_sensitive is not null THEN q.possibly_sensitive ELSE 'Missing possibly_sensitive for tweet ' + q.id END,
				d.truncated = CASE WHEN q.truncated is not null THEN q.truncated ELSE 'Missing truncated for tweet ' + q.id END,
				d.lang = CASE WHEN q.lang is not null THEN q.lang ELSE 'Missing lang for tweet ' + q.id END,
				d.in_reply_to_user_id_str = CASE WHEN q.in_reply_to_user_id_str is not null THEN q.in_reply_to_user_id_str ELSE 'Missing in_reply_to_user_id_str for tweet ' + q.id END,
				d.in_reply_to_status_id_str = CASE WHEN q.in_reply_to_status_id_str is not null THEN q.in_reply_to_status_id_str ELSE 'Missing in_reply_to_status_id_str for tweet ' + q.id END,
				d.in_reply_to_screen_name = CASE WHEN q.in_reply_to_screen_name is not null THEN q.in_reply_to_screen_name ELSE 'Missing in_reply_to_screen_name for tweet ' + q.id END,
				d.timestamp_ms = CASE WHEN q.timestamp_ms is not null THEN q.timestamp_ms ELSE 'Missing timestamp_ms for tweet ' + q.id END,
				/*d.mentions = CASE WHEN q.mentions is not null THEN q.mentions ELSE 'Missing mentions for tweet ' + q.id END,
				d.hashtags = CASE WHEN q.hashtags is not null THEN q.hashtags ELSE 'Missing hashtags for tweet ' + q.id END,*/
				d.mentions = q.mentions,
				d.hashtags = q.hashtags,
				d.urls = CASE WHEN q.urls is not null THEN q.urls ELSE 'Missing urls for tweet ' + q.id END,
				d.is_quote_status = CASE WHEN q.is_quote_status is not null THEN q.is_quote_status ELSE 'Missing is_quote_status for tweet ' + q.id END,
				d.emoticons = CASE WHEN q.emoticons is not null THEN q.emoticons ELSE 'Missing emoticons for tweet ' + q.id END,
				d.source = CASE WHEN q.source is not null THEN q.source ELSE 'Missing source for tweet ' + q.id END,
				d.sentiments = CASE WHEN q.sentiments is not null THEN q.sentiments ELSE 'Missing sentiments for tweet ' + q.id END,
				d.filter_level = CASE WHEN q.filter_level is not null THEN q.filter_level ELSE 'Missing filter_level for tweet ' + q.id END,

			""" + "d.system_user_username = '" + username + "', d.system_user_hashkey = '" + hashkey + "'"

		results = self.graph.cypher.execute(query, data = data)

	def createGeo(self, username, hashkey):
		# data = open("geo.json", 'r', encoding = 'utf-8').read()
		# data = json.loads(data)
		data = self.GraphGenerator.getGeo()
		query = """
			WITH {data} as json_data
			UNWIND json_data.data as q
			MERGE (d:Data {neo4j_id:q.id}) ON CREATE
			SET d.resource = q.resource,
				d.object = q.object,
				d.geo_id = q.id,
				d.attributes = CASE WHEN q.attributes is not null THEN q.attributes ELSE 'Missing attributes for geo ' + q.id END,				
				d.country = CASE WHEN q.country is not null THEN q.country ELSE 'Missing country for geo ' + q.id END,
				d.country_code = CASE WHEN q.country_code is not null THEN q.country_code ELSE 'Missing country_code for geo ' + q.id END,
				d.full_name = CASE WHEN q.full_name is not null THEN q.full_name ELSE 'Missing full_name for geo ' + q.id END,
				d.name = CASE WHEN q.name is not null THEN q.name ELSE 'Missing name for geo ' + q.id END,
				d.place_type = CASE WHEN q.place_type is not null THEN q.place_type ELSE 'Missing place_type for geo ' + q.id END,
				d.url = CASE WHEN q.url is not null THEN q.url ELSE 'Missing url for geo ' + q.id END,
				d.contained_within = CASE WHEN q.contained_within is not null THEN q.contained_within ELSE 'Missing contained_within for geo ' + q.id END,
			""" + "d.system_user_username = '" + username + "', d.system_user_hashkey = '" + hashkey + "'"

		results = self.graph.cypher.execute(query, data = data)

	def createPlace(self, username, hashkey):
		# data = open("places.json", 'r', encoding = 'utf-8').read()
		# data = json.loads(data)
		data = self.GraphGenerator.getPlace()
		query = """
			WITH {data} as json_data
			UNWIND json_data.data as q
			MERGE (d:Data {neo4j_id:q.id}) ON CREATE
			SET d.resource = q.resource,
				d.object = q.object,
				d.place_id = q.id,
				d.country_code = CASE WHEN q.country_code is not null THEN q.country_code ELSE 'Missing country_code for place ' + q.id END,
				d.country = CASE WHEN q.country is not null THEN q.country ELSE 'Missing country for place ' + q.id END,
				d.full_name = CASE WHEN q.full_name is not null THEN q.full_name ELSE 'Missing full_name for place ' + q.id END,
				d.name = CASE WHEN q.name is not null THEN q.name ELSE 'Missing name for place ' + q.id END,
				d.place_type = CASE WHEN q.place_type is not null THEN q.place_type ELSE 'Missing place_type for place ' + q.id END,
				d.url = CASE WHEN q.url is not null THEN q.url ELSE 'Missing url for place ' + q.id END,
				d.bounding_box_type = CASE WHEN q.bounding_box_type is not null THEN q.bounding_box_type ELSE 'Missing bounding_box_type for place ' + q.id END,
				d.bounding_box_coordinates = CASE WHEN q.bounding_box_coordinates is not null THEN q.bounding_box_coordinates ELSE 'Missing bounding_box_coordinates for place ' + q.id END,
			""" + "d.system_user_username = '" + username + "', d.system_user_hashkey = '" + hashkey + "'"

		results = self.graph.cypher.execute(query, data = data)

	def createCoordinate(self, username, hashkey):
		# data = open("coordinates.json", 'r', encoding = 'utf-8').read()
		# data = json.loads(data)
		data = self.GraphGenerator.getCoordinate()
		query = """
			WITH {data} as json_data
			UNWIND json_data.data as q
			MERGE (d:Data {neo4j_id:q.id}) ON CREATE
			SET d.resource = q.resource,
				d.object = q.object,
				d.coordiante_id = q.id,
				d.type = CASE WHEN q.type is not null THEN q.type ELSE 'Missing type for coordinate ' + q.id END,
				d.lon = CASE WHEN q.lon is not null THEN q.lon ELSE 'Missing lon for coordinate ' + q.id END,
				d.lat = CASE WHEN q.lat is not null THEN q.lat ELSE 'Missing lat for coordinate ' + q.id END,
			""" + "d.system_user_username = '" + username + "', d.system_user_hashkey = '" + hashkey + "'"

		results = self.graph.cypher.execute(query, data = data)

	def createEntity(self, username, hashkey):
		# data = open("entities.json", 'r', encoding = 'utf-8').read()
		# data = json.loads(data)
		data = self.GraphGenerator.getEntity()
		query = """
			WITH {data} as json_data
			UNWIND json_data.data as q
			MERGE (d:Data {neo4j_id:q.id}) ON CREATE
			SET d.resource = q.resource,
				d.object = q.object,
				d.entity_id = q.id,
				d.urls = q.urls,
				d.hashtags = q.hashtags,
			""" + "d.system_user_username = '" + username + "', d.system_user_hashkey = '" + hashkey + "'"

		results = self.graph.cypher.execute(query, data = data)

	def createEdges(self, username, hashkey):
		# edges = open("edges.json", 'r', encoding = 'utf-8').read()
		# edges = json.loads(edges)
		edges = self.GraphGenerator.getEdge()
		# query = """
		# 	WITH {edges} as json_data
		# 	UNWIND json_data.edge as q
		# 	MATCH (s:Data{neo4j_id : q.source}), (t:Data{neo4j_id : q.target})
		# 	CREATE (s)-[:RELATION {type: q.edgeType}]->(t)
		# 	"""
		query = "WITH {edges} as json_data UNWIND json_data.edge as q MATCH (s:Data{neo4j_id : q.source}), (t:Data{neo4j_id : q.target}) CREATE (s)-[:RELATION {type: q.edgeType, system_user_username: '" + username + "', system_user_hashkey: '" + hashkey + "'}]->(t)"
		results = self.graph.cypher.execute(query, edges = edges)

	def execute(self, data, username, hashkey):
		self.GraphGenerator = GraphGenerator(data)
		self.createData()
		self.createUser(username, hashkey)
		self.createTweet(username, hashkey)
		self.createGeo(username, hashkey)
		self.createPlace(username, hashkey)
		self.createCoordinate(username, hashkey)
		self.createEntity(username, hashkey)
		self.createEdges(username, hashkey)

		start = time.time()
		self.GraphGenerator = GraphGenerator(data)
		self.createData()
		print ("Data Created, takes " + str(time.time() - start))
		start = time.time()
		self.createUser(username, hashkey)
		print ("User Created, takes " + str(time.time() - start))
		start = time.time()
		self.createTweet(username, hashkey)
		print ("Tweet Created, takes " + str(time.time() - start))
		start = time.time()
		self.createGeo(username, hashkey)
		print ("Geo Created, takes " + str(time.time() - start))
		start = time.time()
		self.createPlace(username, hashkey)
		print ("Place Created, takes " + str(time.time() - start))
		start = time.time()
		self.createCoordinate(username, hashkey)
		print ("Coordinate Created, takes " + str(time.time() - start))
		start = time.time()
		self.createEntity(username, hashkey)
		print ("Entity Created, takes " + str(time.time() - start))
		start = time.time()
		self.createEdges(username, hashkey)
		print ("Edges Created, takes " + str(time.time() - start))