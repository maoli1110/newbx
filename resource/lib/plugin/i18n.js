/**
 * 多语言
 */

angular.module('i18n', [])
    .service('i18n', ['$interpolate', function ($interpolate) {
        var i18nMessages = {};

        /* 设置语言库 */
        var set = function(messages){
            i18nMessages = messages;
        };
        /* 处理未匹配情况 */
        var handleNotFound = function(msg, msgKey){
            return msg || '?' + msgKey + '?';
        };
        /* 调用替换方法 */
        var get = function(msgKey, interpolateParams){
            var msg = i18nMessages[msgKey];
            if(msg){
                return $interpolate(msg)(interpolateParams);
            }else{
                return handleNotFound(msg, msgKey);
            }
        };

        return {
            set: set,
            get: get
        };
    }]);