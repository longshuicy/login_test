### prerequisit:
1. download and run redis server

2. setup local mysql database: as one can see in backend/config.js, one needs to put DB_HOST, DB_USERNAME, DB_PASSWORD, DB_SCHEMA(this one is just the database name) in .env file. 

DB_USERNAME: root

DB_PASSWORD: root

DB_SCHEMA: social_monitor

A table called "users" should be created in the database and have at least username and password (varchar).

3. install dependency library in each folder (graphql, front-end, back-end).

4. put .env file in graphql folder https://drive.google.com/file/d/0B8JvcWvoUuxaM1RGRktJQms5cnM/view?usp=sharing

5. put .env file in back-end folder https://drive.google.com/file/d/0B8JvcWvoUuxaRkhyZkE5Y2ZCWUE/view?usp=sharing


### Database folder prerequisit
1.install python

2.install python package listed in app.py:
    flask==0.12.2
    py2neo==2.0.8
    flatten_json
    
3.download neo4j database and install

4.set password of neo4j to 123456 and start neo4j

5.run app.py

### Flow
1. User register

2. User login

3. User authorize with their own social media account

4. Download and Ingest button enables raw json downlad and pushing data to Neo4j database

5. TBD Zhaoheng adds more here...................................


