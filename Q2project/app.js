var express = require( 'express' );
var http = require( 'http' );
var path = require( 'path' );
var passport = require( 'passport' );
var cookieSession = require( 'cookie-session' );
var favicon = require( 'serve-favicon' );
var logger = require( 'morgan' );
var cookieParser = require( 'cookie-parser' );
var bodyParser = require( 'body-parser' );
var app = express();

require( 'dotenv' ).load();


// -------------------------------
// view engine setup
// -------------------------------

app.set( 'view engine', 'ejs' );
app.set( 'views', path.join( __dirname, 'views' ) );
app.use( express.static( path.join( __dirname, 'public' ) ) );
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
	extended: false
} ) );
app.use( cookieParser() );


// -------------------------------
// routes
// -------------------------------

var auth = require( './routes/auth' );
var routes = require( './routes/index' );
var users = require( './routes/users' );



// -------------------------------
// users function
// -------------------------------

function users() {
	return knex( 'users' );
}



app.get( '/', function( req, res ) {
	res.redirect( '/' );
} );

app.post( '/', function( req, res ) {
	var user = req.body;

	users().insert( {
		name: user.name,
		age: user.age
	} ).then( function( result ) {
		res.send( 'welcome' );
	} );
} );



// -------------------------------

app.listen( 3000, function() {
	console.log( 'im listening yo!!' );
} );




module.exports = app;
