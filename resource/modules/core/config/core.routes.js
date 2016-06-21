'use strict';

angular.module('core',[]).config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider.
		 state('login', {
			url:"/",
			templateUrl: 'resource/template/core/login.html',
			controller: 'loginCtrl',
			data: {
				displayName: 'login'
			}
		})
		.state('tree', {
			url:"/tree",
			templateUrl: 'resource/template/core/tree.html',
			controller: 'treeCtrl',
			data: {
				displayName: 'tree'
			}
		});
	}
]);