'use strict';

// ΪsimpleApp����һ��ģ��
var app = angular.module('simpleApp', []);

// ����·�ɹ��򣬽���URLs��ģ�壬������֮���ӳ���ϵ
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

// ��messages������ģ��list.html
app.controller('ListCtrl', ['$scope', 'messages',
    function($scope, messages) {
        $scope.messages = messages;
    }]);