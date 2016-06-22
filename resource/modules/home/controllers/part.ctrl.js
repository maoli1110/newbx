'use strict';
/**
 * 概况
 */
angular.module('home').controller('partCtrl', ['$scope', 'Home', '$http','All','$modal',
	function($scope, Home, $http, All, $modal) {
		
		// $scope.partLsit = [];

		// var getData =  function() {
		// 	$http.post('branchItem.json').then(function(res){
		// 		//console.log(data);
		// 		$scope.partLsit = res.data;
		// 		console.log($scope.partLsit);
		// 	});
		// };

		// getData();

		// function flatten(originArray, parentNode, result){
		// 	var newNode = _.cloneDeep(_.omit(originArray, 'branchItemInfos'));

		// 	if(parentNode) {
		// 		newNode.parent = parentNode;
		// 		newNode.level = parentNode.level + 1;
		// 	}

		// 	result.push(newNode);
		// }

	}
]);