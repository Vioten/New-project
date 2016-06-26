var express = require( 'express' );
var router = express.Router();
var passport = require( 'passport' );
var favicon = require( 'serve-favicon' );
var cookieSession = require( 'cookie-session' );



app.get( '/auth/facebook',
	passport.authenticate( 'facebook' ) );

app.get( '/auth/facebook/callback',
	passport.authenticate( 'facebook', {
		failureRedirect: '/login'
	} ),
	function( req, res ) {
		// Successful authentication, redirect home.
		res.redirect( '/' );
	} );

module.exports = router;
