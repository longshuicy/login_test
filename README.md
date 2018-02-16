# login_test
try to build a powerful login

How to use it:
1. download and run redis server
2. setup local mysql database: as one can see in backend/config.js, one needs to put DB_HOST, DB_USERNAME, DB_PASSWORD, DB_SCHEMA(this one is just the database name) in .env file. A table called "users" should be created in the database and have at least username and password.
3. use npm start, the two service will start simutaneously.
