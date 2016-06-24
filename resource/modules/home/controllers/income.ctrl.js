'use strict';
/**
 * income
 */
angular.module('home').controller('incomeCtrl', ['$scope', 'Home', '$http','All','$modal',
	function($scope, Home, $http, All, $modal) {

		$scope.incomeList = [];


	    $scope.resultList = [];

	    $scope.cycle = {
	      list: [1, 2, 3, 4, 5,6,7,8,9,10],
	      value: 5
	    }
	    $scope.year = {
	      list: [2015, 2016, 2017, 2018, 2019],
	      init: 2015
	    };

	    $scope.$watch('cycle.value', function(val) {
	      $scope.cycleCount = new Array(val);
			if ($scope.incomeList.length) {
				//debugger;
				//年份减少
				if(($scope.incomeList[0].cellXValues.length - 3) > $scope.cycle.value){

					var diff = ($scope.incomeList[0].cellXValues.length - 3) - $scope.cycle.value;
					_.forEach($scope.incomeList, function(r){
							r.cellXValues.splice($scope.cycle.value + 3);
					});

				}else{
					//年份增加
					var arr = [];
					for (var i = 0; i < $scope.cycle.value - ($scope.incomeList[0].cellXValues.length - 3); i++) {
						arr.push(_.cloneDeep({
							xn: $scope.incomeList[0].cellXValues.length + i,
							xyvalue: 0
						}));
					}
					_.forEach($scope.incomeList,function (r) {
						r.cellXValues = r.cellXValues.concat(arr);
					})
					console.log($scope.incomeList);
				}
				
			}
	    });

		$http.get('new.json').success(function (data) {
			//console.log(data);
			data.data.cellYValues.shift();
			$scope.incomeList = data.data.cellYValues;

			var arr1 = [];

		    for (var i = 0; i < $scope.cycle.value + 1; i++) {
				arr1.push({
					xn: $scope.incomeList[0].cellXValues.length + i,
					xyvalue: 0
				});
			}

			//console.log(arr);
			_.forEach($scope.incomeList,function (r) {
				//console.log(r);
				r.cellXValues = r.cellXValues.concat(arr1);
			})

		});
		

		// $scope.changeDate = function(row, cell,index) {

		// 	var verticalId = index,
		// 		verticalLine = [],
		// 		topTotal = 0;
		// 	//取第一行的值
		// 	var top0 = _.filter($scope.incomeList, function(r) {
		// 		return r.yn === 1;
		// 	})[0];
		// 	//关联的值
		// 	var top0List = _.filter($scope.incomeList, function(r) {
		// 		return r.yn === 2 || r.yn ===4 || r.yn ===7 || r.yn === 8;
		// 	});

		// 	console.log(top0);

		// 	 _.forEach(top0List, function (r) {
		// 		var unit = _.filter(r.cellXValues, function (v, i) {
		// 			return parseInt(v.xn) === verticalId;
		// 		})[0];
		// 		verticalLine.push(unit);
		// 		console.log(unit);
		// 	})

		// 	for(var i=0; i<verticalLine.length; i++) {
		// 		//loop & calculate
		// 		topTotal += parseFloat(verticalLine[i].xyvalue);
		// 	}
		// 	//赋值
		// 	top0.cellXValues[verticalId].xyvalue = topTotal;

		// 	console.log(topTotal);
			
		// 	cell.xyvalue = parseFloat(cell.xyvalue);

		// 	//水平求和horizontal total calculate
		// 	_.last(row).xyvalue = 0;
		// 	for(var i=2; i<row.length-1; i++){
		// 		//console.log(row[i]);
		// 		//console.log(row[i].xyvalue);
		// 		_.last(row).xyvalue += parseFloat(row[i].xyvalue);
		// 	}
		// }


	}
]);