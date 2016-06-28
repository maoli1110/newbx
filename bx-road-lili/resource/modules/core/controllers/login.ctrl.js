'use strict';
/**
 * 登录
 */
angular.module('core').controller('loginCtrl', ['$rootScope','$scope', '$http','loginService','$state',
    function ($rootScope,$scope, $http,loginService,$state) {
    	$scope.user = {},$scope.temp = {};
	    $scope.login = function(){
	    	if(!this.user.name){
	    		$('#error-message').html('用户名不能为空');
	    		return false;
	    	}else if(!this.user.password){
	    		$('#error-message').html('密码不能为空');
	    		return false;
	    	}else if(this.user.name.trim().length > 12){
	    		$('#error-message').html('用户名不能超过12个字符');
	    		return false;
	    	}else if(this.user.password.length>18){
	    		$('#error-message').html('密码不能超过18个字符');
	    		return false;
	    	}else{
	    		  var _user = {};
	    		   _user.name = this.user.name,
	    		   _user.password = this.user.password;
	    		  _user.password = $.md5(_user.password);
	    		  $scope.temp = _user;
	    		if($('input[type="checkbox"]').is(':checked')){
	    			cookieUtil.setCookie('0d6c0bc610f3cd65e1307e6b81e5c4d3',JSON.stringify(_user),60*24*7);
	    		}else{
	    			cookieUtil.destoryCookie('0d6c0bc610f3cd65e1307e6b81e5c4d3');
	    		}
              loginService.login(_user).then(function(result){
          
            	  if(!result.data.success){
            		  $('#error-message').html(result.data.msg);
            		  return false;
            	  }
               	    if(result.data.validate[0].status == 0){
               	    	$('#formul').animate({
		                   'left':'-435px'
			    		},400);
               	    	
			    		var selected = "";
			    		result.data.validate[0].companyList.forEach(function(obj){
                            selected += '<option value="'+obj.enterpriseId+'">'+obj.enterpriseName+'</option>';
			    		});
			    		$('#companySelect').html(selected);
               	    }
                    
		        },function(error){

		        });
		       
              $scope.checkCompany = function(){
            	  $scope.temp["enterpriseId"] = $('#companySelect').val();
            	  $scope.temp["enterpriseName"] = $('#companySelect').text();
            
            	  $rootScope.username = $scope.temp.name;
            	  cookieUtil.setCookie('username',$scope.temp.name);
            	  loginService.checkCompany($scope.temp).then(function(result){
            		 if(!!result.data.success){
            			 $state.go('tree');
            		 } 
            	  });
              }     
	    	}
	    }
    }]).directive('loginformDirective',function(){
    	return {
			restrict: 'A',
			link: function(scope, element, attr) {
				 $('input[type="checkbox"]').uniform();
				 $('#back').click(function(){
				 	$('#formul').animate({
                   'left':'40px'
	    		},400);
				});
				 $('input').change(function(e){
					 e.preventDefault();
					 $('#error-message').html('');
				 });
                var user = cookieUtil.getCookie("0d6c0bc610f3cd65e1307e6b81e5c4d3");
                if(!!user){
                	user = JSON.parse(unescape(user));
                	scope.user = user;
                	$('input[type="checkbox"]').attr('checked','checked');
                	$('.checker').addClass('focus').children('span').addClass('checked');
                }
                $('.login-form').on('keyup',function(e){
                	var key = 'which' in e ? e.which : e.keyCode;
                	if(key == 13){
                		$('#btn-login').trigger('click');
                	}
                	
                });
			}};
    });