var express = require( 'express' );
var http = require( 'http' );
var path = require( 'path' );
var passport = require( 'passport' );
var cookieSession = require( 'cookie-session' );
var FacebookStrategy = require( 'passport-facebook' ).Strategy;
var favicon = require( 'serve-favicon' );
var logger = require( 'morgan' );
var cookieParser = require( 'cookie-parser' );
var bodyParser = require( 'body-parser' );
var methodOverride = require( 'method-override' );
var app = express();

require( 'dotenv' ).load();


// -------------------------------
// view engine setup
// -------------------------------

app.set( 'view engine', 'ejs' );
app.set( 'views', path.join( __dirname, '/views' ) );
app.use( express.static( path.join( __dirname, '/public' ) ) );
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
	extended: false
} ) );
app.use( methodOverride( '_method' ) );
app.use( cookieParser() );

// -------------------------------
// Initialize Passport and restore authentication state, if any, from the
// session.
// -------------------------------

app.use( passport.initialize() );
app.use( passport.session() );


// -------------------------------
// routes
// -------------------------------

var auth = require( './routes/auth' );
var routes = require( './routes/index' );
var users = require( './routes/users' );


app.use( '/', routes );
app.use( '/users', users );


// ---------------------------------
// Facebook Strategy
// ---------------------------------


passport.use( new FacebookStrategy( {
		clientID: FACEBOOK_APP_ID,
		clientSecret: FACEBOOK_APP_SECRET,
		callbackURL: "http://localhost:3000/auth/facebook/callback"
	},
	function( accessToken, refreshToken, profile, cb ) {
		User.findOrCreate( {
			facebookId: profile.id
		}, function( err, user ) {
			return cb( err, user );
		} );
	}
) );

// ---------------------------------
// Configure Passport authenticated session persistence.
// ---------------------------------

passport.serializeUser( function( user, cb ) {
	cb( null, user );
} );

passport.deserializeUser( function( obj, cb ) {
	cb( null, obj );
} );


// -------------------------------

var port = process.env.PORT || 3000;
app.listen( port, function() {
	console.log( "Im listening yo!" );
} );

module.exports = {
	app
};
