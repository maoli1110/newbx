"use strict"
/*************************************************************************************
 * 面包屑组件
 * ***********************************************************************************
 * require: ui.route
 * ***********************************************************************************
 * usage:
 * <breadcrumbs display-name='data.displayName' front-msg='当前页面'></breadcrumbs>
 *  $stateProvider.
 *       state('home', {
 *           url: '/',
 *          templateUrl: 'core/home.html',
 *           data: {
 *              displayName: '首页'
 *          }
 *      }).
 *      state('home.huodong', {
 *          url: 'huodong',
 *          templateUrl: 'core/home.html',
 *          data: {
 *              displayName: '活动'
 *          }
 *      });
 *************************************************************************************/
angular.module('z.breadcrumbs', [])
    .directive('breadcrumbs', function($state) {
        return {
            restrict: 'E',
            template: '<ol class="breadcrumb">' +
                '<li><span>{{ frontMsg }}：</span></li>' +
                '<li ng-repeat="crumb in breadcrumbs" ng-class="{ active: $last }">' +
                '<a ui-sref="{{ crumb.route }}" ng-if="!$last && !crumb.abstract">{{ crumb.displayName }}&nbsp;</a>' +
                '<a href="javascript:;" ng-if="!$last && crumb.abstract">{{ crumb.displayName }}&nbsp;</a>' +
                '<span ng-show="$last">{{ crumb.displayName }}</span>' +
                '</li>' +
                '</ol>',
            scope: {
                displayName: '@',
                frontMsg: '@'
            },
            replace: true,
            link: function(scope, element, attrs) {
                if (!scope.displayName) {
                    return;
                }
                var propertyArray = scope.displayName.split('.');
                scope.breadcrumbs = [];

                scope.$on('$stateChangeSuccess', function() {
                    updateBreadcrumbs();
                });

                function updateBreadcrumbs() {
                    var displayName,
                        abstract,
                        breadcrumbs = [],
                        current = $state.$current;
                    while ((displayName = getDisplayName(current))) {
                        abstract  = current.self.abstract || false;
                        var breadcrumb = getBreadcrumb(current, displayName, abstract);
                        breadcrumb && breadcrumbs.push(breadcrumb);
                        current = current.parent;
                    }
                    scope.breadcrumbs = breadcrumbs.reverse();
                }

                function getBreadcrumb(current, displayName, abstract) {
                    if (current.name == '') return;
                    return {
                        route: current.name,
                        displayName: displayName,
                        abstract: abstract
                    };
                }

                function getDisplayName(current) {
                    var propertyReference = current;
                    for (var i = 0; i < propertyArray.length; i++) {
                        if (propertyReference[propertyArray[i]]) {
                            propertyReference = propertyReference[propertyArray[i]];
                        } else {
                            return undefined;
                        }
                    };
                    return (typeof propertyReference === 'string') ? propertyReference : undefined;
                }

            }
        }
    });