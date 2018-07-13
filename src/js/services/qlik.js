'use strict';

/**
 * @ngdoc function
 * @owner yianni.ververis@qlik.com
 * @description
 * # app
 * Controller of the myApp
 */
var service = function($q, $rootScope, app) {
	var me = this;
			
	me.openModels = [];

	me.config = {
		host: window.location.hostname,
		prefix: '@@ph-prefix',
		port: window.location.port,
		id: '@@ph-id',
		isSecure: window.location.protocol === "https:"
	};

	me.config.isSecure = (me.config.port==443) ? true : false;
	
	me.openApp = function () {
		app.log(JSON.stringify(me.config, null, 2));
		var deferred = $q.defer();
		me.app = qlik.openApp(me.config.id, me.config);
		deferred.resolve(true);
		return deferred.promise;
	}

	me.resize = function(qvid) {
		if (!angular.isUndefined) {
			qlik.resize(qvid)
		} else {
			qlik.resize()
		}
	}
	
	me.openApp();
	
	app.log('Qlik Loaded: ', 'Success!');
};
// angular.module('service.qlik', [])
// .service('qlik', function ($q, $rootScope, utility) {
angular.module('service.qlik', []);
service.$inject = ['$q', '$rootScope', 'app'];
angular.module('service.qlik')
	.service('qlik', service);