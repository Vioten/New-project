var express = require( 'express' );
var router = express.Router();
var knex = require( '../db/knex' );
var methodOverride = require( 'method-override' );
var bodyParser = require( 'body-parser' );

/* GET home page. */
router.get( '/', function( req, res, next ) {
	knex( 'users' ).select().then( function( result, err ) {
		res.render( 'index', {
			user: result

		} );
	} );
} );

router.get( '/', function( req, res, next ) {
	res.cookie( 'views', parseInt( req.cookies.views || 0 ) + 1 );

	res.render( 'index', {
		title: 'puppylink',
		views: ( req.cookies.views || 0 )
	} );
} );

module.exports = router;
