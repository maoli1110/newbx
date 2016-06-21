'use strict';
/**
 * 概况
 * todo: 
 * reset/add/delete vertical line
 * 以当前最低粒度为编辑项
 */
angular.module('home').controller('homeCtrl', ['$scope', 'Home', '$http', '$filter',
  function($scope, Home, $http, $filter) {

    var originalData = {
      resultList: [],
      year: {},
      cycle: {}
    };

    $scope.resultList = [];
    $scope.cycle = {
      list: [1, 2, 3, 4, 5],
      value: 5
    }
    $scope.year = {
      list: [2012, 2013, 2014, 2015, 2016],
      init: 2012
    };
    originalData.year = _.cloneDeep($scope.year);
    originalData.cycle = _.cloneDeep($scope.cycle);


    $scope.$watch('cycle.value', function(val) {
      $scope.cycleCount = new Array(val);
    });

    var x = 0;
//    $http.get('../data.json').success(function(data) {
//      for (var i = 0; i < data.length; i++) {
//        flatten(data[i], null, $scope.resultList);
//      }
//      console.log($scope.resultList); // 最终循环数组
//      originalData.resultList = _.cloneDeep($scope.resultList);
//    });

    $scope.sum = function(array) {
      return _.sum(array);
    };

    //changeData
    $scope.changeData = function(row, index) {
      // console.log(row);
      var brother = [],
        fatherBrother = [],
        verticalTotal = 0,
        topTotal = 0;

      if (row.level === 2) { // 最小粒度可改变数据 目前最小粒度为level2
        brother = findBrother();
        fatherBrother = findFatherBrother();
        for (var i = 0; i < brother.length; i++) {
          verticalTotal += parseInt(brother[i].dataSet[index]);
        }

        total(row.parent.id, index, verticalTotal);

        for (var i = 0; i < fatherBrother.length; i++) {
          topTotal += parseInt(fatherBrother[i].dataSet[index]);
        }

        total(row.parent.parent.id, index, topTotal);
      }

      // 算父级合计
      function total(parentId, index, totalValue) {
        _.filter($scope.resultList, function (r) {
          return r.id === parentId;
        })[0].dataSet[index] = totalValue;
      }

      // 筛选同级项
      function findBrother() {
        return _.filter($scope.resultList, function(r) {
          if (r.parent) {
            return r.parent.id === row.parent.id;
          }
        })
      }

      // 筛选父级同级项
      function findFatherBrother() {
        return _.filter($scope.resultList, function(r) {
          if (r.parent)
            return r.parent.id === row.parent.parent.id;
        });
      }
    };

    $scope.addVerticalLine = function () {
      // add year & cycle
      $scope.year.list.push(_.last($scope.year.list) + 1);
      $scope.cycle.list.push(_.last($scope.cycle.list) + 1);
      $scope.cycle.value = _.last($scope.cycle.list);

      for (var i = 0; i < $scope.resultList.length; i++) {
        $scope.resultList[i].dataSet.push(0);
      }
    };

    //获取数据
    $scope.getTest = function() {
      console.log('success');
      var data = {
        "name": "彭佳佳",
        "age": 25,
        "birthDate": 694742400000,
        "tel": "15221113063"
      };
      Home.getData(data).then(function(res) {
        console.log('data is update');
      })
    };

    /**
     * originArray: 需要打平的原数据
     * result: 结果数组
     * serial: 每个一级分类下的序列 初始为0
     */
    function flatten(originArray, parentNode, result, serial) {
      var newNode = _.cloneDeep(_.omit(originArray, 'children'));

      if (parentNode) {
        newNode.parent = parentNode;
        newNode.level = parentNode.level + 1;
      } else {
        newNode.level = 0;
      }

      if (newNode.level === 1) {
        newNode.serial = x;
      }

      result.push(newNode);
      if (originArray.children && originArray.children.length) {
        for (var i = 0; i < originArray.children.length; i++) {
          if (newNode.level === 0) {
            x++;
          }
          var childNode = originArray.children[i];
          flatten(childNode, newNode, result, x);
        }
      }
    }

    $scope.reset = function () {
      $scope.resultList = originalData.resultList;
      $scope.year = originalData.year;
      $scope.cycle = originalData.cycle;
    };

    $scope.save = function() {
      console.log('hihihi i am save');
      console.log($scope.resultList);
    };

  }
]);
