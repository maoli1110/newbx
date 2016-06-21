'use strict';
angular.module('core').service('grid', [

    function() {
        var defaultPagingOptions = {
            pageSize: 15,
            currentPage: 1
        };
        var defaultGridOptions = {
            data: 'myData',
            headerRowHeight: 36,
            rowHeight: 36,
            showFooter: true,
            enablePaging: true,
            enableColumnResize: true,
            totalServerItems: 'totalServerItems',
            footerTemplate: '<pagination ng-change="pageChanged(pagingOptions.currentPage)" ng-show="showFooter"' +
                'total-items="totalServerItems" ' +
                'max-size="5" ' +
                'class="pagination-sm"' +
                'items-per-page="pagingOptions.pageSize" ' +
                'ng-model="pagingOptions.currentPage" ' +
                'previous-text="&lsaquo;" next-text="&rsaquo;">' +
                '</pagination>'
        };
        var setMonitor = function(scope, dataHandler) {
            var getPagedDataAsync = function(pageSize, page) {
                var params = {
                    offset: (page - 1) * pageSize,
                    limit: pageSize
                };
                var callback = dataHandler.callback || function(res){
                	return res.data.param;
                };
                angular.extend(params, dataHandler.params);
                dataHandler.request(params).then(callback).then(function(res){
                	scope.myData = res.list;
                	scope.totalServerItems = res.totalCount;
                	if (!scope.$$phase) {
                		scope.$apply();
                	}
                });
            };

            getPagedDataAsync(scope.pagingOptions.pageSize, scope.pagingOptions.currentPage);
            scope.pageChanged = function (page) {
                getPagedDataAsync(scope.pagingOptions.pageSize, page);
            };
            // scope.$watch('pagingOptions', function(newVal, oldVal) {
            //     if (newVal !== oldVal && newVal.currentPage != oldVal.currentPage) {
            //         getPagedDataAsync(scope.pagingOptions.pageSize, scope.pagingOptions.currentPage);
            //     }
            // }, true);
        };

        /**
         * 被调用的初始化方法
         * @param  {Object} scope         传入作用域
         * @param  {Object} dataHandler   数据请求处理器
         *         {func}	request		  数据获取方法
         *         {Object} params		  数据获取参数对象
         *         {func}	callback	  数据预处理函数
         * @param  {Object} gridOptions   grid配置
         * @param  {Object} pagingOptions grid的分页配置         
         */
        this.init = function(scope, dataHandler, gridOptions, pagingOptions) {
            if (!scope || !dataHandler) {
                return;
            }
            scope.pagingOptions = angular.extend({}, defaultPagingOptions, pagingOptions);
            defaultGridOptions.pagingOptions = scope.pagingOptions;
            scope.gridOptions = angular.extend({}, defaultGridOptions, gridOptions);

            setMonitor(scope, dataHandler);
        };

    }
]);
