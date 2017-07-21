'use strict';

var app = angular.module('myApp.populaire', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/populaire', {
            templateUrl: 'populaire/populaire.html',
            controller: 'populaireCtrl'
        });
    }])

    .filter('startFrom', function () {
        return function (data, start) {

            return data.slice(start);
        }

    });

app.service('MyService', function ($http) {

    self.GetPhotos = function () {
        var url = "https://jsonplaceholder.typicode.com/comments";
        return $http({
            method: 'GET',
            url: url
        });
    }


});

app.controller('populaireCtrl', ['MyService', function ($scope, MyService) {

   
    var self = this;
    
    self.responseWebService = [];

    self.currentPage = 1;
    self.pageSize = 9; 
    self.maxSize = 5;



    GetPhotos().then(function (response) {
        
        self.responseWebService = response.data;
        console.log('resul web service', self.responseWebService);

     });

   
   






}]);