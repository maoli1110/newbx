'use strict';
/**
 * income
 */
angular.module('home').controller('incomeCtrl', ['$scope', 'Home', '$http','All','$modal',
	function($scope, Home, $http, All, $modal) {

		$scope.incomeList = [];


	    $scope.resultList = [];
	    $scope.cycle = {
	      list: [1, 2, 3, 4, 5],
	      value: 5
	    }
	    $scope.year = {
	      list: [2012, 2013, 2014, 2015, 2016],
	      init: 2012
	    };

	    $scope.$watch('cycle.value', function(val) {
	      $scope.cycleCount = new Array(val);
	    });

		$http.get('new.json').success(function (data) {
			console.log(data);
			
			$scope.incomeList = data.data.cellYValues;
			console.log($scope.incomeList);
		});

		$scope.changeDate = function(row, cell,index) {

			//console.log(row);
			//console.log($scope.incomeList);
			var verticalId = index;
			var topList = _.filter($scope.incomeList, function(r){
				console.log(row);
				debugger;
				return r.cellXValues.xn == verticalId;
			})
			console.log(topList);

			cell.xyvalue = parseFloat(cell.xyvalue);

			//水平求和horizontal total calculate
			_.last(row).xyvalue = 0;
			for(var i=2; i<row.length-1; i++){
				//console.log(row[i]);
				//console.log(row[i].xyvalue);
				_.last(row).xyvalue += parseFloat(row[i].xyvalue);
			}
		}


	}
]);