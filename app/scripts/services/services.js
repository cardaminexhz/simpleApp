'use strict';

var services = angular.module('simpleApp.services',
    ['ngResource']);

services.factory('GetMessages', ['$http',
    function($http) {
        var messages = {};
        messages.query = function() {
            /*
             // step4. 异步操作，返回顺序的问题，无法保证从server取到数据后再返回
             // AngularJS promise
             $http.get("http://localhost:8088/simpleApp/Customers_JSON.php")
             .success(function (data, status) {
             console.log("http get success");
             messages = data;
             console.log(status);
             console.log(messages);
             })
             .error(function (data, status) {
             messages = data || "Request failed";
             console.log(status);
             });
             */
            // step3.
            return [
                {Id:'0',Name:'000',City:'http://cn.bing.com',Country:'必应'},
                {Id:'1',Name:'001',City:'http://sina.com.cn',Country:'新浪'},
                {Id:'2',Name:'002',City:'www.baidu.com',Country:'百度'}
            ];
        }
        return messages;
    }]);

services.factory('SingleMessage', ['$http',
    function($http) {
        var message = {};
        message.show = function(){
            return {Id:'1',Name:'001',City:'http://sina.com.cn',Country:'新浪'};
        }
        return message;
}]);