'use strict';
/**
 * 概况
 */
angular.module('home').controller('partCtrl', ['$scope', 'Home', '$http','All','$modal',
	function($scope, Home, $http, All, $modal) {
		
		$scope.partLsit = [];

		var getData =  function() {
			$http.post('item.json').then(function(res){
				//console.log(data);
				//$scope.partLsit = res.data.data;
			
				var a = res.data.data;
				for(var i =0; i<a.length; i++){
					flatten(a[i], null, $scope.partLsit);
				}
				
				console.log($scope.partLsit);
			});
		};

		getData();

		var x=0;
		function flatten(originArray, parentNode, result){
			var newNode = _.cloneDeep(_.omit(originArray, 'items'));

			if(parentNode) {
				newNode.parent = parentNode;
				newNode.level = parentNode.level + 1;
			} else {
				newNode.level = 0;
			} 
			result.push(newNode);

			if(originArray.items && originArray.items.length) {
				for(var i = 0; i < originArray.items.length; i++){
					if (newNode.level === 0) {
						x++;
					}
					var childNode = originArray.items[i];
					flatten(childNode, newNode, result);
				}
			}
		}

	}
]);