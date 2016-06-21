'use strict';

angular.module('core').service('loginService', function($http, $q) {
    function login(user) {
        return $http({
            method: 'post',
            data:user,
            url: 'login.do?method=doLogin'
        });
    }
    
    function checkCompany(company){
    	 return $http({
             method: 'post',
             data:company,
             url: 'login.do?method=userLogin'
         });
    }
    return {
        login: login,
        checkCompany:checkCompany
    }
});