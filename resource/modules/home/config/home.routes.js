'use strict';

angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider.
		 state('home', {
			url:"/home",
			templateUrl: 'resource/template/home/home.html',
			data: {
				displayName: 'home'
			}
			
		})
		.state('home.part', {
			'url':"/part",
			templateUrl: 'resource/template/home/part.html',
			controller: 'partCtrl',
			data: {
				displayName: 'part'
			}
		})
		.state('home.all', {
			'url': "/all",
			templateUrl: 'resource/template/home/all.html',
			controller: 'allCtrl',
			data: {
				displayName: 'all'
			}
		})
		.state('home.income', {
			'url':"/income",
			templateUrl: 'resource/template/home/income.html',
			controller: 'incomeCtrl',
			data: {
				displayName: 'income'
			}
		});
	}
]);