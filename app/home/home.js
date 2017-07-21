var app = angular.module('myApp.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'homeCtrl'
        });

        
    }]);

app.service('ServiceForUsers', function ($http) {

       self.GetUsersAll = function () {
           var url = "http://localhost:8080/rest/users/all";
           return $http({
               method: 'GET',
               url: url
           });
       };

       self.AddUser = function (users) {
           var url = "http://localhost:8080/rest/users/adduser";
           return $http({
               method: 'POST',
               url: url,
               transformRequest: angular.identity,
               transformResponse: angular.identity,
               headers: {
                   'Content-Type': 'application/json'
               },
               data: angular.toJson(users) 
           });
       };

    });

    app.controller('homeCtrl', ['ServiceForUsers', function (ServiceForUsers) {
        var self = this;

        self.ListUsers = [];

        self.users = {
            nom: undefined,
            prenom: undefined,
            telephone: undefined,
            adresse: undefined
        };

        GetUsersAll().then(function (response) {

            self.ListUsers = response.data;
            console.log('resul web service', self.ListUsers);

        });

        self.submit = function () {

            AddUser(self.users).then(function (response) {
                console.log("successssssss");
                console.log("nom", self.users.nom);
                self.users = {
                    nom: '',
                    prenom: '',
                    telephone: '',
                    adresse: ''
                };

            }, function () {
                console.log("failure");


            }).finally(function () {
                console.log("finally here ");

            });
        };

        self.AddUser = function (nom,prenom,telephone,adresse) {
            var data = {
                nom: nom,
                prenom: prenom,
                telephone: telephone,
                adresse: adresse
            }
        };

        self.AddTotab = function () {

            self.ListUsers.push(self.users);
            console.log('resl', self.ListUsers);
            self.users = "";
        };


    }]);
