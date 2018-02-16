# coding=utf-8
import os
from flask import Flask, jsonify, render_template, redirect, url_for, request, make_response
from py2neo import Graph, Path, authenticate
import hashlib
import json
from helpers import *
from Twitter.TwitterParser import TwitterParser
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
authenticate("localhost:7474", "neo4j", "123456")
neo4jUrl = os.environ.get('NEO4J_URL',"http://localhost:7474/db/data/")
graph = Graph(neo4jUrl)
words_to_avoid = ["SystemUser"]


# @app.route('/start', methods=['POST','GET'])
# def start():
#     return render_template('start.html')

# @app.route('/loginPage', methods=['POST','GET'])
# def loginPage():
#     return render_template('login.html')

# @app.route('/signupPage', methods=['POST','GET'])
# def signupPage():
#     return render_template('signup.html')
    
# @app.route('/login', methods=['POST','GET'])
# def login():
#     try:
#         error = None
#         username, password = request.form['username'], request.form['password']
#         query = "MATCH (d:SystemUser) WHERE d.username = '" + username + "' AND d.password = '" + password + "' RETURN d"
#         valid = graph.cypher.execute(query)
#         if valid:
#             info = list(map(getHashKey, valid))[0]
#             response = make_response(redirect(url_for('home', username = info['username'], hashkey = info['hashkey'])))
#             response.set_cookie('hashkey', info['hashkey'])
#             response.set_cookie('username', info['username'])
#             return response

#         else:
#             error = 'Invalid username/password'
#             return render_template('start.html', error=error)

#     except Exception as e:
#         return render_template('start.html', error = e)


# @app.route('/signup', methods=['POST','GET'])
# def signup():
#     try:
#         error = None
#         username, password = request.form['username'], request.form['password']
#         query = "MATCH (d:SystemUser) WHERE d.username = '" + username + "' RETURN d"
#         exists = graph.cypher.execute(query)
#         if not exists:
#             hashkey = hashlib.md5((username + password).encode()).hexdigest()
#             query = "CREATE (d:SystemUser {username : '" + username + "', password : '" + password + "', hashkey : '" + hashkey + "'})"
#             results = graph.cypher.execute(query)
#             return render_template('login.html')
#         else:
#             error = "Username already exists"
#             return render_template('signup.html', error = error)


#     except Exception as e:
#         return render_template('start.html', error = e)


@app.route('/verification', methods=['GET', 'POST'])
def verification():
    print("request received")
    username, password, session_id, data, resource = request.json["username"], request.json["password"], request.json["sessionID"], json.loads(request.json["data"]), request.json["platform"]
    hashkey = hashlib.md5((username + password).encode()).hexdigest()
    query = "MATCH (d:SystemUser) WHERE d.username = '" + username + "' RETURN d"
    exists = graph.cypher.execute(query)
    fp = open("data.txt", "a", encoding = "utf-8")
    fp.write(json.dumps(data))
    fp.close()
    print ("data saved")
    redirect_url = "http://127.0.0.1:1111" + url_for('home', username = username, hashkey = hashkey)
    if not exists:
        hashkey = hashlib.md5((username + password).encode()).hexdigest()
        query = "CREATE (d:SystemUser {username : '" + username + "', password : '" + password + "', hashkey : '" + hashkey + "'})"
        results = graph.cypher.execute(query)
        storeData(resource, graph, data, username, hashkey)
        # response = make_response(redirect(url_for('home', username = username, hashkey = hashkey)))
        response = make_response(redirect_url)
        response.set_cookie('hashkey', hashkey)
        response.set_cookie('username', username)
        return response
    else:
        query = "MATCH (d:SystemUser) WHERE d.username = '" + username + "' AND d.password = '" + password + "' RETURN d"
        valid = graph.cypher.execute(query)
        storeData(resource, graph, data, username, hashkey)
        # response = make_response(redirect(url_for('home', username = username, hashkey = hashkey)))
        response = make_response(redirect_url)
        response.set_cookie('hashkey', hashkey)
        response.set_cookie('username', username)
        return response

@app.route('/home')
def home():
    username, hashkey = request.args.get('username'), request.args.get('hashkey')
    return render_template('home.html', username = username, hashkey = hashkey)


@app.route('/loadGraph')
def loadGraph():
    username = json.loads(request.args.get('arg'))['username']
    hashkey = json.loads(request.args.get('arg'))['hashkey']
    nodes = map(buildNodes, graph.cypher.execute("MATCH (d) WHERE d.system_user_hashkey = '" + hashkey + "' AND d.system_user_username = '" + username + "' RETURN d"))
    edges = map(buildEdges, graph.cypher.execute("MATCH (d)-[r]->(t) WHERE r.system_user_hashkey = '" + hashkey + "' AND d.system_user_username = '" + username + "' RETURN r"))
    return jsonify(elements = {"nodes": list(nodes), "edges": list(edges)})


app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

if __name__ == '__main__':
    app.debug = True
    app.run(port = 1111, threaded=True)