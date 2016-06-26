var express = require( 'express' );
var router = express.Router();
var knex = require( '../db/knex' );
var methodOverride = require( 'method-override' );


////show homepage
router.get( '/', function( req, res ) {
	knex( 'users' ).select().then( function( result, err ) {
		// console.log( result );
		res.render( 'index', {
			user: result
		} );
	} );
} );


///post to users table
router.post( '/', function( req, res ) {
	var user = req.body;
	// eval( locus )
	knex( 'users' ).insert( {
		name: user.name,
		userName: user.userName
	} ).then( function( result, err ) {
		res.redirect( '/users' );
	} );
} );


//add new users
router.get( '/new', function( req, res ) {
	res.render( 'new' );
} );



///get user id
router.get( '/:id', function( req, res ) {
	var userId = req.params.id;
	knex( 'users' ).where( 'id', userId ).first().then( function( result, err ) {
		var user = result;
		// eval( locus )
		res.render( 'show', {
			user: user
		} );
	} );
} );



//edit
router.get( '/:id/edit', function( req, res ) {
	var userId = req.params.id;
	knex( 'users' ).where( 'id', userId ).select().then( function( result, err ) {
		// var user = result;
		res.render( 'edit', {
			user: result[ 0 ]
		} );
	} );
} );

router.post( '/:id', function( req, res ) {
	var userId = req.params.id;
	var user = req.body;
	knex( 'users' ).where( 'id', userId ).first().update( {
		name: user.name,
		userName: user.userName
	} ).then( function( result ) {
		res.redirect( '/users' );
	} );
} );


//delete
router.get( '/:id', function( req, res ) {
	var userId = req.params.id;
	knex( 'users' ).where( 'id', userId ).then( function( result ) {

		res.render( '/users/delete', {
			user: user
		} );
	} );
} );

router.delete( '/:id', function( req, res ) {
	var userId = req.params.id;
	knex( 'users' ).where( 'id', userId ).del().then( function( result ) {
		var user = result;
		res.redirect( '/users' );
		// eval( locus );

	} );
} );

module.exports = router;
