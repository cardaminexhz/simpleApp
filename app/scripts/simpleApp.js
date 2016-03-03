'use strict';

// 为simpleApp创建一个模块
var app = angular.module('simpleApp', []);

// 定义路由规则，建立URLs，模板，控制器之间的映射关系
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            controller: 'ListCtrl',
            templateUrl: 'views/list.html'
            });
}]);

var messages = [{
    id: 0, name: 'john', age: '18'
}, {
    id: 1, name: 'heron', age: '20'
} ];

// 将messages发布到模板list.html
app.controller('ListCtrl', ['$scope', 'messages',
    function($scope, messages) {
        $scope.messages = messages;
    }]);