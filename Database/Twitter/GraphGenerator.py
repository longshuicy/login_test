import os
from py2neo import Graph, Path, authenticate
import json
from flatten_json import flatten
import hashlib

class GraphGenerator(object):
	def __init__(self, nested_json):
		self.nested_json = nested_json
		self.flattened_json = None
		self.user_dic = {}
		self.tweet_dic = {}
		self.geo_dic = {}
		self.place_dic = {}
		self.coordinate_dic = {}
		self.entity_dic = {}
		self.retweet_dic = {}
		self.usermention_dic = {}
		self.edges = {}
		self.compound = {
								"queryUser" : "User",
								"queryTweet" : "Tweet", 
								"queryGeo" : "Geo",
								"timeline" : "Tweet", 
								"friends" : "User", 
								"followers" : "User", 
								"place" : "Place",
								"coordinates" : "Coordinate",
								"user_mentions" : "User",
								"user" : "User",
								"entities" : "Entity",
								"retweet" : "Tweet",
								"contained_within" : "Geo"
								}
		self.execute()

	# def flattenJson(self, name):
	# 	nested_json = json.loads(open(name, 'r', encoding = 'utf-8').read())
	# 	self.flattened_json = flatten(nested_json, "->")

	def flattenJson(self):
		# nested_json = json.loads(open(name, 'r', encoding = 'utf-8').read())
		self.flattened_json = flatten(self.nested_json, "->")
		
	def parse(self):
		for k, v in self.flattened_json.items():
			splited = k.split("->")
			for i in range(len(splited) - 1, -1, -1):
				if splited[i] in self.compound:
					obj = self.compound[splited[i]]
					prefix = '->'.join(splited[:-2]) if self.isNumber(splited[-1]) else '->'.join(splited[:-1])
					field = splited[-2] if self.isNumber(splited[-1]) else splited[-1]
					if v:
						self.handler(prefix, field, v, obj, splited[i])
					break


	def handler(self, prefix, field, value, obj, relation):
		if obj == "User":
			self.UserHandler(prefix, field, str(value), obj, relation)
		elif obj == "Tweet":
			self.TweetHandler(prefix, field, str(value), obj, relation)
		elif obj == "Geo":
			self.GeoHandler(prefix, field, str(value), obj, relation)
		elif obj == "Place":
			self.PlaceHandler(prefix, field, str(value), obj, relation)
		elif obj == "Coordinate":
			self.CoordinateHandler(prefix, field, str(value), obj, relation)
		elif obj == "Entity":
			self.EntityHandler(prefix, field, str(value), obj, relation)
		else:
			return

	def UserHandler(self, prefix, field, value, obj, relation):
		if prefix not in self.user_dic:
			self.user_dic[prefix] = {"resource":"twitter", "object":obj, field : value}
		else:
			self.user_dic[prefix][field] = value
		
		if relation == "queryUser":
			self.user_dic[prefix]["relation"] = [True, "Normal user", None]
		elif relation == "friends":
			self.relationHandler(relation, prefix, "user_dic", "user_dic", "author_id", "FriendOfUser")
		elif relation == "followers":
			self.relationHandler(relation, prefix, "user_dic", "user_dic", "author_id", "FollowerOfUser")
		elif relation == "user_mentions":
			self.relationHandler(relation, prefix, "user_dic", "tweet_dic", "id", "MentionedByTweet")
		elif relation == "user":
			self.relationHandler(relation, prefix, "user_dic", "tweet_dic", "id", "UserOfTweet")
		else:
			return

	def TweetHandler(self, prefix, field, value, obj, relation):
		if prefix not in self.tweet_dic:
			if field == "mentions" or field == "hashtags":
				self.tweet_dic[prefix] = {"resource":"twitter", "object":obj, field : [value]}
			else:
				self.tweet_dic[prefix] = {"resource":"twitter", "object":obj, field : value}
		else:
			if field not in self.tweet_dic[prefix]:
				if field == "mentions" or field == "hashtags":
					self.tweet_dic[prefix][field] = [value]
				else:
					self.tweet_dic[prefix][field] = value

			else:
				if field == "mentions" or field == "hashtags":
					self.tweet_dic[prefix][field].append(value)
				else:
					self.tweet_dic[prefix][field] = value

		if relation == "queryTweet":
			self.tweet_dic[prefix]["relation"] = [True, "Normal tweet", None]
		elif relation == "timeline":
			self.relationHandler(relation, prefix, "tweet_dic", "user_dic", "author_id", "TimelineOfUser")
		elif relation == "retweet":
			self.relationHandler(relation, prefix, "tweet_dic", "tweet_dic", "id", "RetweetOfTweet")
		else:
			return

	def GeoHandler(self, prefix, field, value, obj, relation):
		if prefix not in self.geo_dic:
			self.geo_dic[prefix] = {"resource":"twitter", "object":obj, field : value}
		else:
			self.geo_dic[prefix][field] = value
		
		if relation == "queryGeo":
			self.geo_dic[prefix]["relation"] = [True, "Normal geo", None]
		elif relation == "contained_within":
			self.relationHandler(relation, prefix, "geo_dic", "geo_dic", "id", "ContainedWithinGeo")
		else:
			return

	def PlaceHandler(self, prefix, field, value, obj, relation):
		if prefix not in self.place_dic:
			self.place_dic[prefix] = {"resource":"twitter", "object":obj, field : value}
		else:
			self.place_dic[prefix][field] = value
		
		if relation == "place":
			self.relationHandler(relation, prefix, "place_dic", "tweet_dic", "id", "PlaceOfTweet")
		else:
			return

	def CoordinateHandler(self, prefix, field, value, obj, relation):
		if prefix not in self.coordinate_dic:
			self.coordinate_dic[prefix] = {"resource":"twitter", "object":obj, field : value}
		else:
			self.coordinate_dic[prefix][field] = value
		
		if relation == "coordinates":
			self.relationHandler(relation, prefix, "coordinate_dic", "tweet_dic", "id", "CoordinateOfTweet")
		else:
			return

	def EntityHandler(self, prefix, field, value, obj, relation):
		if prefix not in self.entity_dic:
			self.entity_dic[prefix] = {"resource":"twitter", "object":obj, field : [value]}
		else:
			if field not in self.entity_dic[prefix]:
				self.entity_dic[prefix][field] = [value]
			else:
				self.entity_dic[prefix][field].append(value)

		if relation == "entities":
			self.relationHandler(relation, prefix, "entity_dic", "tweet_dic", "id", "EntityOfTweet")
		else:
			return

	def relationHandler(self, relation, prefix, curr_dic, target_dic, id_name, comment):
		target_prefix = self.locateKeyword(prefix, relation)
		if target_prefix:
			code = "self." + curr_dic + "['" + prefix + "']['relation'] = [True, '" + comment + "', self." + target_dic + "['" + target_prefix + "']['" + id_name + "']]"
		else:
			code = "self." + curr_dic + "['" + prefix + "']['relation'] = [False, '" + comment + "', ('" + prefix + "', '" + relation + "')]"

		exec(code)

	def locateKeyword(self, prefix, keyword):
		if keyword != "user_mentions":
			splited = prefix.split("->")
			for i in range(len(splited) - 1, -1, -1):
				if splited[i] == keyword:
					return '->'.join(splited[:i])
		else:
			splited = prefix.split("->")
			for i in range(len(splited) - 1, -1, -1):
				if splited[i] in self.compound and self.compound[splited[i]] == "Tweet":
					return '->'.join(splited[:i + 2])

	def isNumber(self, s):
		try:
			float(s)
			return True
		except ValueError:
			pass

		try:
			import unicodedata
			unicodedata.numeric(s)
			return True
		except (TypeError, ValueError):
			pass

		return False


	def removePrefix(self):
		self.user_dic = {v["author_id"] : v for v in self.user_dic.values()}
		self.tweet_dic = {v["id"] : v for v in self.tweet_dic.values()}
		self.geo_dic = {v["id"] : v for v in self.geo_dic.values()}
		self.place_dic = {v["id"] : v for v in self.place_dic.values()}
		self.coordinate_dic = {v["id"] : v for v in self.coordinate_dic.values()}
		self.entity_dic = {v["id"] : v for v in self.entity_dic.values()}


	def hashEntities(self):
		new_entity_dic = {}
		for k, v in self.entity_dic.items():
			entity_id = self.hashEntity(v)
			v["id"] = entity_id
			new_entity_dic[k] = v

		self.entity_dic = new_entity_dic
		return

	def hashEntity(self, v):
		s = ""
		if "urls" in v:
			if type(v["urls"]) == list:
				v["urls"].sort()
				s += ''.join(v["urls"])
			else:
				s += v["urls"]

		if "hashtags" in v:
			if type(v["hashtags"]) == list:
				v["hashtags"].sort()
				s += ''.join(v["hashtags"])
			else:
				s += v["hashtags"]

		return hashlib.md5(s.encode()).hexdigest()

	def hashCoordinates(self):
		new_coordiante_dic = {}
		for k, v in self.coordinate_dic.items():
			coordinate_id = self.hashEntity(v)
			v["id"] = coordinate_id
			new_entity_dic[k] = v

		self.coordinate_dic = new_coordiante_dic
		return

	def hashCoordinate(self, v):
		s = ""
		if "lon" in v:
			s += v["lon"]

		if "lat" in v:
			s += v["lat"]

		return hashlib.md5(s.encode()).hexdigest()	

	def userPostPorcess(self):
		new_user_dic = {}
		for k, v in self.user_dic.items():
			new_user_dic[k] = v
			if v['relation'][0] == False:
				prefix, relation = v['relation'][2]
				target_prefix = self.locateKeyword(prefix, relation)
				if v['relation'][1] == "FriendOfUser":
					target_id = self.user_dic[target_prefix]['author_id']
				elif v['relation'][1] == "FollowerOfUser":
					target_id = self.user_dic[target_prefix]['author_id']
				elif v['relation'][1] == "MentionedByTweet":
					target_id = self.tweet_dic[target_prefix]['id']
				else:
					target_id = self.tweet_dic[target_prefix]['id']
				
				new_user_dic[k]['relation'] = [True, v['relation'][1], target_id]
		
		return new_user_dic

	def tweetPostPorcess(self):
		new_tweet_dic = {}
		for k, v in self.tweet_dic.items():
			new_tweet_dic[k] = v
			if v['relation'][0] == False:
				prefix, relation = v['relation'][2]
				target_prefix = self.locateKeyword(prefix, relation)
				if v['relation'][1] == "TimelineOfUser":
					target_id = self.user_dic[target_prefix]['author_id']
				elif v['relation'][1] == "RetweetOfTweet":
					target_id = self.tweet_dic[target_prefix]['id']
				
				new_tweet_dic[k]['relation'] = [True, v['relation'][1], target_id]
		
		return new_tweet_dic

	def geoPostPorcess(self):
		new_geo_dic = {}
		for k, v in self.geo_dic.items():
			new_geo_dic[k] = v
			if v['relation'][0] == False:
				prefix, relation = v['relation'][2]
				target_prefix = self.locateKeyword(prefix, relation)
				if v['relation'][1] == "ContainedWithinGeo":
					target_id = self.geo_dic[target_prefix]['id']
				
				
				new_geo_dic[k]['relation'] = [True, v['relation'][1], target_id]
		
		return new_geo_dic

	def placePostPorcess(self):
		new_place_dic = {}
		for k, v in self.place_dic.items():
			new_place_dic[k] = v
			if v['relation'][0] == False:
				prefix, relation = v['relation'][2]
				target_prefix = self.locateKeyword(prefix, relation)
				if v['relation'][1] == "PlaceOfTweet":
					target_id = self.tweet_dic[target_prefix]['id']
				
				
				new_place_dic[k]['relation'] = [True, v['relation'][1], target_id]
		
		return new_place_dic

	def coordinatePostPorcess(self):
		new_coordinate_dic = {}
		for k, v in self.coordinate_dic.items():
			new_coordinate_dic[k] = v
			if v['relation'][0] == False:
				prefix, relation = v['relation'][2]
				target_prefix = self.locateKeyword(prefix, relation)
				if v['relation'][1] == "CoordinateOfTweet":
					target_id = self.tweet_dic[target_prefix]['id']
				
				
				new_coordinate_dic[k]['relation'] = [True, v['relation'][1], target_id]
		
		return new_coordinate_dic

	def entityPostPorcess(self):
		new_entity_dic = {}
		for k, v in self.entity_dic.items():
			new_entity_dic[k] = v
			if v['relation'][0] == False:
				prefix, relation = v['relation'][2]
				target_prefix = self.locateKeyword(prefix, relation)
				if v['relation'][1] == "EntityOfTweet":
					target_id = self.tweet_dic[target_prefix]['id']
				
				
				new_entity_dic[k]['relation'] = [True, v['relation'][1], target_id]
		
		return new_entity_dic

	def postProcess(self):
		new_user_dic = self.userPostPorcess()
		new_tweet_dic = self.tweetPostPorcess()
		new_geo_dic = self.geoPostPorcess()
		new_place_dic = self.placePostPorcess()
		new_coordinate_dic = self.coordinatePostPorcess()
		new_entity_dic = self.entityPostPorcess()

		self.user_dic = new_user_dic
		self.tweet_dic = new_tweet_dic
		self.geo_dic =  new_geo_dic
		self.place_dic = new_place_dic
		self.coordinate_dic = new_coordinate_dic
		self.entity_dic = new_entity_dic
		return

	def buildEdgesFromUser(self):
		for k, v in self.user_dic.items():
			source, target, relation = k, v['relation'][2], v['relation'][1]
			if relation == 'FriendOfUser':
				self.edges[(source, target)] = 'IsFriendOf'
				self.edges[(target, source)] = 'IsFriendOf'
			elif relation == 'FollowerOfUser':
				self.edges[(source, target)] = 'IsFollowerOf'
				self.edges[(target, source)] = 'FollowedBy'
			elif relation == 'MentionedByTweet':
				self.edges[(source, target)] = 'UserMentionedByTweet'
				self.edges[(target, source)] = 'TweetMentionedUser'
			elif relation == 'UserOfTweet':
				self.edges[(source, target)] = 'UserCreatedTweet'
				self.edges[(target, source)] = 'TweetCreatedByUser'
			else:
				continue

	def buildEdgesFromTweet(self):
		for k, v in self.tweet_dic.items():
			source, target, relation = k, v['relation'][2], v['relation'][1]
			if relation == 'TimelineOfUser':
				self.edges[(source, target)] = 'TweetCreatedByUser'
				self.edges[(target, source)] = 'UserCreatedTweet'
			else:
				continue

	def buildEdgesFromGeo(self):
		for k, v in self.geo_dic.items():
			source, target, relation = k, v['relation'][2], v['relation'][1]
			if relation == 'ContainedWithinGeo':
				self.edges[(source, target)] = 'GeoContainedWithinGeo'
				self.edges[(target, source)] = 'GeoContainedGeo'
			else:
				continue

	def buildEdgesFromPlace(self):
		for k, v in self.place_dic.items():
			source, target, relation = k, v['relation'][2], v['relation'][1]
			if relation == 'PlaceOfTweet':
				self.edges[(source, target)] = 'IsPlaceOfTweet'
				self.edges[(target, source)] = 'TweetHasPlace'
			else:
				continue

	def buildEdgesFromCoordinate(self):
		for k, v in self.coordinate_dic.items():
			source, target, relation = k, v['relation'][2], v['relation'][1]
			if relation == 'CoordinateOfTweet':
				self.edges[(source, target)] = 'IsCoordinateOfTweet'
				self.edges[(target, source)] = 'TweetHasCoordinate'
			else:
				continue

	def buildEdgesFromEntity(self):
		for k, v in self.entity_dic.items():
			source, target, relation = k, v['relation'][2], v['relation'][1]
			if relation == 'EntityOfTweet':
				self.edges[(source, target)] = 'IsEntityOfTweet'
				self.edges[(target, source)] = 'TweetHasEntity'
			else:
				continue

	def format(self):
		temp = {"data" : []}
		for v in self.user_dic.values():
			temp["data"].append(v)
		self.user_dic = temp

		temp = {"data" : []}
		for v in self.tweet_dic.values():
			temp["data"].append(v)
		self.tweet_dic = temp

		temp = {"data" : []}
		for v in self.geo_dic.values():
			temp["data"].append(v)
		self.geo_dic = temp

		temp = {"data" : []}
		for v in self.place_dic.values():
			temp["data"].append(v)
		self.place_dic = temp

		temp = {"data" : []}
		for v in self.coordinate_dic.values():
			temp["data"].append(v)
		self.coordinate_dic = temp

		temp = {"data" : []}
		for v in self.entity_dic.values():
			temp["data"].append(v)
		self.entity_dic = temp

		temp = {"edge" : []}
		for k, v in self.edges.items():
			temp["edge"].append({"source" : list(k)[0], "target" : list(k)[1], "edgeType" : v})
		self.edges = temp

	def buildEdges(self):
		self.buildEdgesFromUser()
		self.buildEdgesFromTweet()
		self.buildEdgesFromGeo()
		self.buildEdgesFromPlace()
		self.buildEdgesFromCoordinate()
		self.buildEdgesFromEntity()

	def execute(self):
		self.flattenJson()
		self.parse()
		self.postProcess()
		self.hashEntities()
		self.hashCoordinates()
		self.removePrefix()
		self.buildEdges()
		self.format()

	def getUser(self):
		return self.user_dic

	def getTweet(self):
		return self.tweet_dic

	def getGeo(self):
		return self.geo_dic

	def getPlace(self):
		return self.place_dic

	def getCoordinate(self):
		return self.coordinate_dic

	def getEntity(self):
		return self.entity_dic

	def getEdge(self):
		return self.edges

		# with open("users.json", "w", encoding='utf-8') as fp:
		# 	fp.write(json.dumps(self.user_dic))

		# with open("tweets.json", "w", encoding='utf-8') as fp:
		# 	fp.write(json.dumps(self.tweet_dic))

		# with open("geo.json", "w", encoding='utf-8') as fp:
		# 	fp.write(json.dumps(self.geo_dic))

		# with open("places.json", "w", encoding='utf-8') as fp:
		# 	fp.write(json.dumps(self.place_dic))

		# with open("coordinates.json", "w", encoding='utf-8') as fp:
		# 	fp.write(json.dumps(self.coordinate_dic))

		# with open("entities.json", "w", encoding='utf-8') as fp:
		# 	fp.write(json.dumps(self.entity_dic))

		# with open("edges.json", "w", encoding='utf-8') as fp:
		# 	fp.write(json.dumps(self.edges))