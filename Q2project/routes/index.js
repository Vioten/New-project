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

module.exports = router;
