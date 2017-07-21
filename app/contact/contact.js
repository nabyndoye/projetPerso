'use strict';

var app = angular.module('myApp.contact', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/contact', {
            templateUrl: 'contact/contact.html',
            controller: 'contactCtrl'
        });
    }])





app.controller('contactCtrl', [ function ($scope, MyService) {

 



}]);