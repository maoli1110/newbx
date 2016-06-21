/**
 * require Bootstrap v3
 * usage:
 * alertService.add('danger', message);
 * <alert ng-repeat="alert in alerts" type="alert.type" close="alert.close()" class="col-md-4 alert-danger" style="position: absolute; right: 0px">
 *   <span ng-bind="alert.msg"></span>
 * </alert>
 */
angular.module('alert', [])
    .service('alertService', ['$rootScope', '$timeout',
        function($rootScope, $timeout) {
            var alertFactory = {};
            $rootScope.alerts = [];

            alertFactory.add = function(type, msg) {
                $rootScope.alerts.push({
                    'type': type,
                    'msg': msg,
                    'close': function() {
                        alertFactory.close(this);
                    }
                });

                $timeout(function() {
                    $rootScope.alerts.splice(0, 1);
                }, 5000);
            };

            alertFactory.close = function(alert) {
                alertFactory.closeById($rootScope.alerts.indexOf(alert));
            };

            alertFactory.closeById = function(index) {
                $rootScope.alerts.splice(index, 1);
            };

            return alertFactory;
        }
    ]);