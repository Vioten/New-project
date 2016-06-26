var express = require( 'express' );
var router = express.Router();
var passport = require( 'passport' );
var favicon = require( 'serve-favicon' );
var cookieSession = require( 'cookie-session' );
var FacebookStrategy = require( 'passport-facebook' ).Strategy;



router.get( '/auth/facebook',
	passport.authenticate( 'facebook' ) );

router.get( '/auth/facebook/callback',
	passport.authenticate( 'facebook', {
		failureRedirect: '/login'
	} ),
	function( req, res ) {
		// Successful authentication, redirect home.
		res.redirect( '/' );
	} );

module.exports = router;
