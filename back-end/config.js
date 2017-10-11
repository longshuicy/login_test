require('dotenv').config();
var config = {};

//config.authProviders = ['twitter','reddit','facebook','github','fitbit','flickr', 'instagram', 'spotify','tumblr','youtube','local'];
config.authProviders = ['twitter','reddit','facebook','flickr','spotify','instagram','tumblr','youtube','local'];

config.twitter = {};
  config.twitter.consumer_key    =  process.env.TWITTER_CONSUMER_KEY    || '';
  config.twitter.consumer_secret =  process.env.TWITTER_CONSUMER_SECRET || '';

config.reddit = {};
  config.reddit.client_id = process.env.REDDIT_CLIENT_ID || '';
  config.reddit.client_secret = process.env.REDDIT_CLIENT_SECRET || '';

config.facebook = {};
  config.facebook.client_id = process.env.FACEBOOK_APP_ID || '';
  config.facebook.client_secret = process.env.FACEBOOK_APP_SECRET || '';

/*config.github= {};
  config.github.client_id = process.env.GITHUB_ID || '';
  config.github.client_secret = process.env.GITHUB_SECRET || '';

config.fitbit= {};
  config.fitbit.client_id = process.env.FITBIT_ID || '';
  config.fitbit.client_secret = process.env.FITBIT_SECRET || '';*/

config.flickr = {};
  config.flickr.consumer_key = process.env.FLICKR_CONSUMER_KEY || '';
  config.flickr.consumer_secret = process.env.FLICKR_CONSUMER_SECRET || '';

config.instagram = {};
  config.instagram.client_id = process.env.INSTAGRAM_ID|| '';
  config.instagram.client_secret = process.env.INSTAGRAM_SECRET || '';

config.spotify= {};
  config.spotify.client_id = process.env.SPOTIFY_CLIENT_ID || '';
  config.spotify.client_secret = process.env.SPOTIFY_CLIENT_SECRET || '';

config.tumblr= {};
  config.tumblr.consumer_key = process.env.TUMBLR_CONSUMER_KEY || '';
  config.tumblr.consumer_secret = process.env.TUMBLR_CONSUMER_SECRET || '';

config.youtube = {};
  config.youtube.client_id = process.env.YOUTUBE_CLIENT_ID || '';
  config.youtube.client_secret = process.env.YOUTUBE_CLIENT_SECRET || '';

/*config.db = {};
  config.db.host = process.env.DB_HOST || '';
  config.db.username = process.env.DB_USERNAME || '';
  config.db.password = process.env.DB_PASSWORD || '';
  config.db.database = process.env.DB_SCHEMA || '';*/

config.app = {};
  config.app.port = process.env.PORT || '3000';

config.db = {};
  config.db.host = process.env.DB_HOST || '';
  config.db.username = process.env.DB_USERNAME || '';
  config.db.password = process.env.DB_PASSWORD || '';
  config.db.database = process.env.DB_SCHEMA || '';

module.exports = config;
