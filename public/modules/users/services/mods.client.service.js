'use strict';

// Mods service used for communicating with the users REST endpoint
angular.module('users').factory('Mods', ['$resource',
	function($resource) {
		return $resource('mods/list', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);