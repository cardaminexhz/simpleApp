'use strict';

var services = angular.module('simpleApp.services', ['ngResource']);

services.factory('RequestServer', ['$http',
    function($http){
        var results = {};
        results.query = function() {

            var myUrl ="http://localhost:8081/statistic?callback=JSON_CALLBACK";
            $http.jsonp(myUrl).success(
                function(data, status){
                    console.log("status:"+status);
                    console.log(data);
                }
            );

            /*
            $http.get("http://localhost:8081/statistic")
                .success(function (data, status) {
                    console.log("http get success");
                    results = data;
                    console.log(status);
                    console.log(results);
                })
                .error(function (data, status) {
                    results = data || "Request failed";
                    console.log("results:"+results);
                    console.log("status"+status);
                });
            */
            return results;
        }
        return results;
    }]);

services.factory('MessagesLoader', ['$q', '$http',
    function($q, $http){
        return {
            getMessages: function() {
                var delay = $q.defer();
                $http.get("http://localhost:8088/simpleApp/Customers_JSON.php")
                    .success(function (data, status) {
                        alert("success");
                        delay.resolve(function() {
                            console.log(status +": http get success");
                            console.log(data);
                            return data;
                        });
                    })
                    .error(function (status) {
                        delay.reject(function() {
                            console.log(status + ": Unable to fetch messages");
                        });
                    });
                return delay.promise;
            }
        };
}]);

services.factory('GetMessages', ['$http',
    function($http) {
        var messages = {};
        messages.query = function() {

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
             return messages;
             /*
            // step3.
            return [
                {Id:'0',Name:'000',City:'http://cn.bing.com',Country:'必应'},
                {Id:'1',Name:'001',City:'http://sina.com.cn',Country:'新浪'},
                {Id:'2',Name:'002',City:'www.baidu.com',Country:'百度'}
            ];
            */
        }
        return messages;
    }]);

services.factory('SingleMessage', ['$http',
    function($http) {
        var message = {};
        message.show = function(){
            $http.get("http://localhost:8088/simpleApp/Customers_JSON.php", {params: {Name: 'Ernst Handel'}
            }).success(function(data, status) {
                console.log("http get[include param] success");
                message = data;
                console.log(status);
                console.log(message);
            }).error(function(data, status) {
                message = data || "Request[include param] failed";
                console.log(status);
            });
            return message;
            /*
            return {Id:'1',Name:'001',City:'http://sina.com.cn',Country:'新浪'};
            */
        }
        return message;
}]);