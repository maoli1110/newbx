'use strict';

/**
 * tree数据
 */
'use strict';

angular.module('core').service('Tree', function ($http, $q) {
    //var url = ApplicationConfiguration.urls.apiUrl + 'concern/';

    this.getTree = function () {
        var delay = $q.defer();
        $http.post('login.do?method=queryZJOrganizeNodes')
            .success(function (data) {
                delay.resolve(data);
            }).error(function (data, status) {
                delay.reject(data);
            });
        return delay.promise;
    };


});