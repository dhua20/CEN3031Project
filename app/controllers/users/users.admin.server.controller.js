'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');
	_ = require('lodash');


/**
 * List of Moderators
 */
exports.listMods = function(req, res) { 
	User.find({roles: 'moderator'}).exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(users);
		}
	});
};

exports.readMod = function(req, res) {
	req.mod.password = ''; //hide current password
	res.jsonp(req.mod);
};

/**
 * Update a Bandapplication
 */
exports.updateMod = function(req, res) {
	var mod = req.mod ;
	mod = _.extend(mod , req.body);
	mod.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mod);
		}
	});
};

/**
 * Admin middleware
 */
exports.modByType = function(req, res, next, modType) {
	User.findOne({userType: modType}).exec(function(err, mod) {
		if (err) {
			return next(err);
		}
		if (!mod){
			return next(new Error('Failed to find ' + modType + ' mod'));
		}
		req.mod = mod;
		next();
	});
};

/**
 * Band authorization middleware
 */
exports.hasAdminAuthorization = function(req, res, next) {
	if (req.user.roles !== 'admin') {

		return res.status(403).send('User is not authorized');
	}
	next();
};