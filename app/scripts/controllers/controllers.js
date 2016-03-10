'use strict';

// 为simpleApp创建一个模块
var app = angular.module('simpleApp', ['simpleApp.services']);

// 定义路由规则，建立URLs，模板，控制器之间的映射关系
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
/*            controller: 'ListController',
            resolve: {
                messages: ["MessagesLoader", function(MessagesLoader) {
                    return MessagesLoader();
                }]
            },
            templateUrl: 'views/list.html'*/

            // step5. 与server交互
            controller: 'StatisController',
            resolve: {
                results: ["MultiResultsLoader", function(MultiResultsLoader) {
                    return MultiResultsLoader();
                }]
            },
            templateUrl: 'views/statis.html'
        }).
/*        when('/edit/:Id', {
            controller: 'EditController',
            /!*resolve: {
                message: [""]
            },*!/
            templateUrl: 'views/edit.html'
        })*/
        when('/edit/:category', {
            controller: 'EditStatisController',
            resolve: {
                result: ["ResultLoader", function(ResultLoader) {
                    return ResultLoader();
                }]
            },
            templateUrl: 'views/editStatis.html'
        });
}]);

app.controller('StatisController', ['$scope', '$location', 'results',
    function($scope, $location, results) {
        $scope.results = results;
        //alert("in controller:" + results);
/*        for(var i=0; i<results.length; i++){
            console.log(results[i].category + " : " + results[i].num);
        }*/
        console.log("in controller:" );
        console.log($scope.results);

        $scope.add = function() {
            $location.path('/edit/');
        }

        $scope.remove = function(index) {
            $scope.results.splice(index,1);
            // TODO: 传给server
        };

        $scope.edit = function(category) {
            console.log("category:" + category);
            $location.path('/edit/' + category);
        }
    }]);

app.controller('EditStatisController', ['$scope', '$location', 'result', 'RecordCreation',
    function($scope, $location, result, RecordCreation) {
        $scope.result = result;
        console.log(result);

        $scope.save = function() {
            console.log("enter save: " + $scope.result.category + "; " + $scope.result.num);
            // TODO: 表单提交的数据如何传给service; 还是考虑错了方向
            RecordCreation($scope.result.category, $scope.result.num);

            console.log("already save");
            //$location.path("/");
        }

        $scope.del = function() {
            delete $scope.message;
            console.log("already delete");
            $location.path('/');
        }
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
app.controller('ListController', ['$scope', '$location', 'GetMessages', 'messages',
    function($scope, $location, GetMessages, messages) {
        //$scope.messages = MessagesLoader.getMessages();
        //$scope.messages = GetMessages.query();
        $scope.messages = messages;
        console.log($scope.messages);
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







