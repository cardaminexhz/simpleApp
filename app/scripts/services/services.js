'use strict';

var services = angular.module('simpleApp.services', ['ngResource']);

// 用JSONP实现跨域，访问8090端口的远程文件remote.js
/*
services.factory('MultiResultsLoader', ['$http', '$q',
    function($http, $q) {
        return function() {
            var results = {};
            var myUrl = "http://localhost:8090/remote.js?callback=JSON_CALLBACK";
            var delay = $q.defer();
            $http.jsonp(myUrl).success(function(data) {
                console.log("http get success");
                results = data;
                alert("解析后:" + results);
                delay.resolve(results);
            }, function() {
                delay.reject('Unable to fetch recipes');
            });
            return delay.promise;
        };
    }]);
*/

// 用CORS实现跨域，获取记录列表
services.factory('MultiResultsLoader', ['$http', '$q',
    function($http, $q){
        return function() {
            var results = {};
            //var myUrl = "http://localhost:8090/remote.js?callback=JSON_CALLBACK";
            var myUrl = "http://localhost:8081/statistic";
            var delay = $q.defer();

            $http.get(myUrl)
                .success(function (data, status) {
                    console.log("http get success");
                    results = data;
                    console.log(status);
                    console.log(results);
                    delay.resolve(results);
                })
                .error(function (data, status) {
                    console.log(status);
                    delay.reject('Unable to fetch recipes');
                });
            return delay.promise;
        }
    }
]);

// 获取单条记录
services.factory('ResultLoader', ['$http', '$q', '$route', '$routeParams',
    function($http, $q, $route, $routeParams) {
        return function() {
            console.log("in service:" + $route.current.params.category);
            //console.log("in server:" + $routeParams.category);

            var result = {};
            var myUrl = "http://localhost:8081/statistic";
            var delay = $q.defer();

            $http({
                method: 'GET',
                url: myUrl,
                params: {category: $route.current.params.category}
            })
            .success(function (data, status) {
                console.log("http get success");
                result = data;
                console.log(status);
                console.log(result);
                delay.resolve(result);
            })
            .error(function (data, status) {
                console.log(status);
                delay.reject('Unable to fetch recipes');
            });
            return delay.promise;
        }
    }
]);

// TODO: 提交单条记录
services.factory('RecordCreation', ['$http', '$q',
    function($http, $q) {
        return function (category, num) {
            // TODO: 获取category, num
            console.log("in service [RecordCreation]:" + category + "; " + num);

            // TODO: post 到server
            var myUrl = "http://localhost:8081/statistic/add";
            var delay = $q.defer();

            $http({
                method: 'POST',
                url: myUrl,
                params: {
                    category: category,
                    num: num
                }
            })
            .success(function (data, status) {
                console.log("http get success");
                console.log(status);
                delay.resolve('save to server success');
            })
            .error(function (data, status) {
                console.log(status);
                delay.reject('Unable to fetch recipes');
            });
            return delay.promise;

            // TODO: 接收server的返回消息，是否添加成功，返回界面给出提示

        }
    }
]);

services.factory('MessagesLoader', ['$q', '$http',
    function($q, $http){
        return function() {
            var delay = $q.defer();
            $http.get("http://localhost:8088/simpleApp/Customers_JSON.php")
                .success(function (data, status) {
                    console.log(status +": http get success");
                    console.log(data);
                    delay.resolve(data);
                })
                .error(function () {
                    delay.reject("Unable to fetch messages");
                });
            return delay.promise;
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