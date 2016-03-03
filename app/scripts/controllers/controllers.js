'use strict';

// 为simpleApp创建一个模块
var app = angular.module('simpleApp', ['simpleApp.services']);

// 定义路由规则，建立URLs，模板，控制器之间的映射关系
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            controller: 'ListController',
            /*resolve: {
                messages: ["GetMessages", function(GetMessages) {
                    return GetMessages();
                }]
            },*/
            templateUrl: 'views/list.html'
        }).
        when('/edit/:Id', {
            controller: 'EditController',
            templateUrl: 'views/edit.html'
        });
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
app.controller('ListController', ['$scope', '$location', 'GetMessages', 'SingleMessage',
    function($scope, $location, GetMessages, SingleMessage) {
        $scope.messages = GetMessages.query();

        $scope.remove = function(index) {
            $scope.messages.splice(index,1);
            // TODO: 传给server
        };

        $scope.edit = function() {
            $scope.message = SingleMessage;
            console.log("id:"+ SingleMessage.Id);
            $location.path('/edit/' + SingleMessage.Id);
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

app.controller('EditController', ['$scope',
    function($scope){

}]);







