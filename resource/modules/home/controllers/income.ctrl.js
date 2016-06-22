'use strict';
/**
 * 概况
 */
angular.module('home').controller('incomeCtrl', ['$scope', 'Home', '$http','All','$modal',
	function($scope, Home, $http, All, $modal) {

		$scope.incomeList = [];

		$http.post('new.json').success(function (data) {
			console.log(data);
			
			$scope.incomeList = data.data.cellValues;
			console.log($scope.incomeList);
		});

	}
]);