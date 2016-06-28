'use strict';
/**
 * 概况
 */
angular.module('core').controller('coreCtrl', ['$rootScope','$scope', '$http',
    function ($rootScope,$scope, $http) {
        $rootScope.username = sessionStorage.username || "";
    }]);