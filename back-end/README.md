# Social Sense

A social universe observatory system. 

Useful commands:

```bash
$ npm install # installs project dependencies
$ npm start serve # Runs hot reload server
```

### System Requirements:
* Environment variables
  * Facebook
    * Application client id as FACEBOOK\_ID 
    * Application client secret as FACEBOOK\_SECRET

  * Reddit 
    * Application client id as REDDIT\_ID 
    * Application client secret as REDDIT\_SECRET

  * Github 
    * Application client id as GITHUB\_ID 
    * Application client secret as GITHUB\_SECRET

  * Fitbit 
    * Application client id as FITBIT\_ID 
    * Application client secret as FITBIT\_SECRET

  * Twitter 
    * Application consumer key as TWITTER\_CONSUMER\_KEY
    * Application consumer secret as TWITTER\_CONSUMER\_SECRET

  * MySQL 
    * Database host as DB\_HOST
    * Database username as DB\_USERNAME
    * Database password as DB\_PASSWORD
    * Database schema as DB\_SCHEMA

* Connection Requirements:
  * Accessability to the MySQL database on port 3306
  * Accessability to Redis on port 6379
