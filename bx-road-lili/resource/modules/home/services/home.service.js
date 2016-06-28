'use strict';

angular.module('home').service('Home', function ($http, $q) {
    var url = ApplicationConfiguration.urls.apiUrl;

    /**
     *获取参数test
     */
    this.getData = function (params) {
        console.log('1111');
        console.log(params);
        var delay = $q.defer();
        $http.post(url, params)
            .success(function (data) {
                delay.resolve(data);
            }).error(function (data, status) {
                delay.reject(data);
            });
        return delay.promise;
    };


});