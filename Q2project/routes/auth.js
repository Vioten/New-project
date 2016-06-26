var express = require( 'express' );
var router = express.Router();
var passport = require( 'passport' );
var favicon = require( 'serve-favicon' );
var cookieSession = require( 'cookie-session' );




router.post( '/login',
	passport.authenticate( 'local' ),
	function( req, res ) {
		res.redirect( '/users/' + req.user.username );
	} );


router.get( '/', function( req, res ) {
	req.logout();
	res.redirect( '/' );
} );


module.exports = router;
