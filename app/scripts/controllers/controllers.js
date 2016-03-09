'use strict';

// 为simpleApp创建一个模块
var app = angular.module('simpleApp', ['simpleApp.services']);

// 定义路由规则，建立URLs，模板，控制器之间的映射关系
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            //controller: 'ListController',
            /*
            resolve: {
                messages: ["MessagesLoader", function(MessagesLoader) {
                    return MessagesLoader.getMessages();
                }]
            },
            */
            //templateUrl: 'views/list.html'
            // step5. 与server交互
            controller: 'StatisController',
            templateUrl: 'views/statis.html'
        }).
        when('/edit/:Id', {
            controller: 'EditController',
            /*resolve: {
                message: [""]
            },*/
            templateUrl: 'views/edit.html'
        });
}]);

app.controller('StatisController', ['$scope', '$location', 'RequestServer',
    function($scope, $location, RequestServer) {
        $scope.results = RequestServer.query();

        /*
        $scope.remove = function(index) {
            $scope.messages.splice(index,1);
            // TODO: 传给server
        };

        $scope.edit = function(id) {
            console.log("id:" + id);
            $location.path('/edit/' + id);
        }
        */
    }]);
/*
// step1.
var messages = [{
    id: 0, name: 'john', age: 18
}, {
    id: 1, name: 'heron', age: 20
}, {
    id: 2, name: 'lily', age: 30
}, {
    id: 3, name: 'lucy', age: 25
}, {
    id: 4, name: 'li', age: 40
} ];
*/

// 将messages发布到模板list.html
app.controller('ListController', ['$scope', '$location', 'GetMessages',
    function($scope, $location, GetMessages) {
        //$scope.messages = MessagesLoader.getMessages();
        $scope.messages = GetMessages.query();
        //$scope.searchText = "hello world";

        $scope.remove = function(index) {
            $scope.messages.splice(index,1);
            // TODO: 传给server
        };

        $scope.edit = function(id) {
            console.log("id:" + id);
            $location.path('/edit/' + id);
        }

        $scope.add = function() {
            $location.path('/edit/');
        }

        // step2. 与server交互应由服务完成；暂时放在此处
        /*
        $http.get("http://localhost:8088/simpleApp/Customers_JSON.php")
            .success(function (data, status) {
                console.log("http get success");
                $scope.messages = data;
                console.log(status);
            })
            .error(function(data, status) {
                $scope.data = data || "Request failed";
                console.log(status);
            });
            */
    }]);

app.controller('EditController', ['$scope', '$routeParams', 'GetMessages', '$location', 'SingleMessage',
    function($scope, $routeParams, GetMessages, $location, SingleMessage){

        $scope.messages = GetMessages.query();
        $scope.message = $scope.messages[$routeParams.Id];

        /*
        $scope.message = SingleMessage.show();
        */

        $scope.save = function() {
            console.log("already save");
            $location.path("/");
        }

        $scope.del = function() {
            delete $scope.message;
            console.log("already delete");
            $location.path('/');
        }
}]);







