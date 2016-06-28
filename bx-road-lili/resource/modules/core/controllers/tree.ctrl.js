'use strict';
/**
 * Tree
 */
angular.module('core').controller('treeCtrl', ['$rootScope','$scope', '$http','loginService','$state','Tree',
    function ($rootScope,$scope, $http,loginService,$state,Tree) {
	$rootScope.username = cookieUtil.getCookie('username') || "";
	 	var treId;
	 	var treName;
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
    		treId = treeNode.id.split("-")[1];
    		treName = treeNode.name;
    		
    	    $http.post('scheme.do?method=findSchemes',{"projid":treId})
            .success(function (data) {
            	$scope.schemeList = data.data;
            }).error(function (data, status) {
                //delay.reject(data);
            });
    	};
   
    	$scope.addSchemes = function() {
    		if(treId==null||treName==null){
    			alert("未选择树");
    			return false;
    		}
    		 $http.post('scheme.do?method=addSchemes',{"projid":treId,"sn":treName})
             .success(function (data) {
            	 $state.go("home.part");
             }).error(function (data, status) {
                 //delay.reject(data);
             });
    	} 
    	
		getData();


 }]).directive('disinpDirective',function(){
	 debugger;
 	return {
		restrict: 'A',
		link:function(scope,element,attrs){
			$('#tree').niceScroll({
				cursorborderradius:"5px"
			});
		}
	}
}).directive('disInpDir', function() {    
    return {
        restrict: 'A',
        scope: {
            inpflag: '='
        },        
        link: function(scope, element, attrs) {

           element.bind('click', function(){

                $('input:not(:checked)').parent().removeClass("checked").addClass("nochecked");
                $('input:checked').parent().removeClass("nochecked").addClass("checked");


           });                      
        }
    };
    });