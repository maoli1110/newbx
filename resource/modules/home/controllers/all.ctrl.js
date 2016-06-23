'use strict';
/**
 * 概况
 */
angular.module('home').controller('allCtrl', ['$scope', 'Home', '$http','All','$modal',
	function($scope, Home, $http, All, $modal) {

		var newResultList = [];
		var originalResultList = [];

		$scope.resultList = [];

		$scope.cycleList = [1, 2, 3, 4, 5, 6];
		$scope.cycle = $scope.cycleList[5]; // 周期数

		$scope.year = {
			list: [2012, 2013, 2014, 2015, 2016, 2017],
			init: 2015
		};

		$scope.$watch('cycle', function(val) {
			$scope.cycleCount = new Array(val);
		});

		function getData() {
			All.getInvest().then(function(data) {
				$scope.resultList = data;
			});
			_.forEach($scope.resultList, function (value, i) {
				var len = value.length;
				value[len - 1].fieldval = 0;
				_.forEach(value, function (value1, i) {
					if (i !== 0 && i !== 1 && i !== len - 1) {
						value[len - 1].fieldval += parseFloat(value1.fieldval);
					}
				});
			});
		}

		getData();
		//获取数据
		// $http.get('../test.json').success(function (data) {

		// 	// console.log(data);

		// 	$scope.resultList = data;

		// 	originalResultList = _.cloneDeep(data);

		// 	// console.log(originalResultList);

		// 	_.forEach($scope.resultList, function (value, i) {
		// 		var len = value.length;
		// 		value[len - 1].fieldval = 0;
		// 		_.forEach(value, function (value1, i) {
		// 			if (i !== 0 && i !== 1 && i !== len - 1) {
		// 				value[len - 1].fieldval += parseFloat(value1.fieldval);
		// 			}
		// 		});
		// 	});
		// });

		$scope.changeData = function (row, field) {
			// console.log('current target', field);
			if (!field.fieldval) return;
			// input value must be a number
			field.fieldval = parseFloat(field.fieldval);

			

			// vertical total calculate
			var verticalId = field.fieldxyid.split("_")[1],
				currentIndex = row.indexOf(field),
				className = field.class,
				topTotal = 0,
				firstTotal = 0;
			var topList = _.filter($scope.resultList, function (row) {
				console.log(row[0]);
				return row[0].level === 0 && row[0].class === className;
			})[0];
			//console.log(topList);
			var top = _.filter(topList, function (f) {
				return f.level === 0 && f.fieldxyid.toString().indexOf(verticalId) !== -1
			})[0];

			var firstList = _.filter($scope.resultList, function (row) {
				return row[0].level === 1 && row[0].class === className
					&& row[currentIndex].fieldxyid === field.pidx;
			})[0];
			// console.log(verticalId, className);
			for (var j = 0; j < $scope.resultList.length; j++) {
				// this line need to calculate vertical total
				for (var k = 2; k < $scope.resultList[j].length - 1; k++) {
					var unit = $scope.resultList[j][k];
					if (unit.fieldxyid.toString().indexOf(verticalId) !== -1
						&& unit.class === className && unit.pidx === field.pidx) {
						if (unit.level === 2)
							firstTotal += parseFloat(unit.fieldval);
						if (unit.level === 1)
							topTotal += parseFloat(unit.fieldval);
					}
				}
			}

			if (field.jump && firstList && firstList[currentIndex]) {
				if (parseFloat(field.fieldval) > parseFloat(firstList[currentIndex].fieldval)) {
					// console.log('top of jump line', firstList[currentIndex]);
					field.fieldval = firstList[currentIndex].fieldval;
				}
			} else {
				top.fieldval = topTotal;
				if (firstList && firstList.length) {
					var first = firstList[currentIndex];
					first.fieldval = firstTotal;
				}

				if (field.level === 2) {
					$scope.changeData(firstList, first);
				}
			}

			_.last(row).fieldval = 0;
			_.last($scope.resultList[0]).fieldval = 0;
			// horizontal total calculate
			for (var i = 2; i < row.length - 1; i++) {
				_.last(row).fieldval += parseFloat(row[i].fieldval);
				_.last($scope.resultList[0]).fieldval += parseFloat($scope.resultList[0][i].fieldval);
			}
		};


		$scope.openChart = function() {
			var modalInstance = $modal.open({
                templateUrl: 'home/chart.html'
            });
		}

	}
]);