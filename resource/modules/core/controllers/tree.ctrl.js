'use strict';
/**
 * Tree
 */
angular.module('core').controller('treeCtrl', ['$rootScope','$scope', '$http','loginService','$state','Tree',
    function ($rootScope,$scope, $http,loginService,$state,Tree) {
        $scope.isSelected = false;
	 	var setting = {  
             data :{  
                 simpleData:{  
                     enable:true  
                 }  
             },  
             callback:{
            	 onClick: zTreeOnClick
             }  
         };  
	
	
    	$scope.resultList = [];
    	$scope.schemeList = [];
    	function getData() {
			Tree.getTree().then(function(data) {
				$scope.resultList = data.data;
				$.fn.zTree.init($("#tagtree"), setting,$scope.resultList )
			});

		}
    	
    	
    	function zTreeOnClick(event, treeId, treeNode) {
    	    $http.post('scheme.do?method=findSchemes',{"projid":treeNode.id.split("-")[1]})
            .success(function (data) {
            	$scope.schemeList = data.data;
            }).error(function (data, status) {
                //delay.reject(data);
            });
    	};

		getData();


 }]);
