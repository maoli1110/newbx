'use strict';
/**
 * income
 */
angular.module('home').controller('incomeCtrl', ['$scope', 'Home', '$http','All','$modal',
	function($scope, Home, $http, All, $modal) {
		 
		 var config = {
		 	"1":{
		 		"level":0,
		 		"child":[2,4,7,8]
		 	},
		 	"4":{
		 		"level":1,
		 		"child":[5,6]
		 	},
		 	"9":{
		 		"level":0,
		 		"child":[10,15,21,26,29,30,31,32,33,34]
		 	},
		 	"10":{
		 		"level":1,
		 		"child":[11,12,13,14]
		 	},
		 	"15":{
		 		"level":1,
		 		"child":[16,17,18,19,20]
		 	},
		 	"21":{
		 		"level":1,
		 		"child":[22,23,24,25]
		 	},
		 	"26":{
		 		"level":1,
		 		"child":[27,28]
		 	}

		 }
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

					//var diff = ($scope.incomeList[0].cellXValues.length - 3) - $scope.cycle.value;
					_.forEach($scope.incomeList, function(r){
							r.cellXValues.splice($scope.cycle.value + 3);
					});

				}else{
					//年份增加
					console.log('year add');
					var diff = $scope.cycle.value - ($scope.incomeList[0].cellXValues.length - 3);
					_.forEach($scope.incomeList,function (r) {
						//debugger;
						console.log(r);
						// debugger;
						for (var i = 0; i < diff; i++) {
							console.log(i);
							r.cellXValues.push(_.cloneDeep({
								xn: $scope.incomeList[0].cellXValues.length -1 + i,
								xyvalue: 0
							}));
						}
					})
					//console.log($scope.incomeList);
				}
				
			}
	    });

		$http.get('new.json').success(function (data) {
			//console.log(data);
			data.data.cellYValues.shift();
			$scope.incomeList = data.data.cellYValues;

			//console.log(arr);
			_.forEach($scope.incomeList,function (r) {
				//console.log(r);
				for (var i = 0; i < $scope.cycle.value + 1; i++) {
					r.cellXValues.push(_.cloneDeep({
						xn: 2 + i,
						xyvalue: 0
					}));
				}
			})

		});
		

			$scope.changeDate = function(row, cell, index) {

			var verticalId = index,
				verticalLine = [],
				topTotal = 0;

				console.log(row);

			if(row.yn == (5 || 6)){
				var top4 = _.filter($scope.incomeList, function (r) {
					return r.yn === 4;
				});
				console.log(top4, '11');
				var top4List = _.filter($scope.incomeList, function (r){
					return r.yn === 5 || r.yn === 6;
				});
			}
			//first 1 =2+4+7+8
			//取第一行的值
			var top0 = _.filter($scope.incomeList, function(r) {
				return r.yn === 1;
			})[0];
			//关联的值
			var top0List = _.filter($scope.incomeList, function(r) {
				return r.yn === 2 || r.yn ===4 || r.yn ===7 || r.yn === 8;
			});

			//console.log(top0);

			 _.forEach(top0List, function (r) {
				var unit = _.filter(r.cellXValues, function (v) {
					//console.log(v);
					return parseInt(v.xn) === verticalId;
				})[0];
				verticalLine.push(unit);
				console.log(unit);
			})

			for(var i=0; i<verticalLine.length; i++) {
				//loop & calculate
				topTotal += parseFloat(verticalLine[i].xyvalue);
			}
			//赋值
			top0.cellXValues[verticalId].xyvalue = topTotal;

			var top1 = _.filter($scope.incomeList, function (r) {
				return r.yn === 4;
			})[0];
			console.log(top1);
			
		}

		$scope.changeData1 = function (row, cell, index) {
			var a = row.yn;
			var parentId;
			var top0ListId;
			var verticalLine = [];
			var topTotal = 0;
			angular.forEach(config, function(value, key) {
			  if(value.child.indexOf(a) != -1){
			  	parentId = key;
			  }
			});
			var top0 = _.filter($scope.incomeList, function(r) {
				return r.yn == parentId;
			})[0];

			top0ListId = typeof parentId === "string" ? config[parentId] : config[parentId.toString()];

			var top0List = _.filter($scope.incomeList, function(r) {
				return top0ListId.child.indexOf(r.yn) != -1;
			});

			_.forEach(top0List, function (r) {
				var unit = _.filter(r.cellXValues, function (v) {
					//console.log(v);
					return parseInt(v.xn) === index;
				})[0];
				verticalLine.push(unit);
				console.log(unit);
			})

			for(var i=0; i<verticalLine.length; i++) {
				//loop & calculate
				topTotal += parseFloat(verticalLine[i].xyvalue);
			}
			//赋值
			top0.cellXValues[index].xyvalue = topTotal;

			if(config[1].child.indexOf(parentId) == -1 ){
				$scope.changeData1($scope.incomeList.filter(function (r) {
					return r.yn == parentId;
				})[0], '', index);
			}
			




		}






	}
]);