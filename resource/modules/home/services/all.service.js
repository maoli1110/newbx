'use strict';

/**
 * 总投资数据
 */
'use strict';

angular.module('home').service('All', function ($http, $q) {
    //var url = ApplicationConfiguration.urls.apiUrl + 'concern/';

    this.getInvest = function () {
        var delay = $q.defer();
        $http.get('test.json')
            .success(function (data) {
                delay.resolve(data);
            }).error(function (data, status) {
                delay.reject(data);
            });
        return delay.promise;
    };


});