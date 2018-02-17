### prerequisit:
1. download and run redis server

2. setup local mysql database: as one can see in backend/config.js, one needs to put DB_HOST, DB_USERNAME, DB_PASSWORD, DB_SCHEMA(this one is just the database name) in .env file. 
DB_USERNAME: root
DB_PASSWORD: root
DB_SCHEMA: social_monitor

A table called "users" should be created in the database and have at least username and password (varchar).

3. install dependency library in each folder (graphql, front-end, back-end).

4. put .env file in graphql folder, and back-end folder

### Flow
1. User register
2. User login
3. User authorize with their own social media account
4. Download and Ingest button enables raw json downlad and pushing data to Neo4j database.
5. TBD Zhaoheng adds more here...................................


