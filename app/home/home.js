var app = angular.module('myApp.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'homeCtrl'
        });

        
    }]);

app.service('ServiceForUsers', function ($http,$q) {

      // service qui recup les users dans la base de donnees
       self.GetUsersAll = function () {
           var url = "http://localhost:8080/rest/users/all";
           return $http({
               method: 'GET',
               url: url
           });
       };


      // service qui ajoute  les users dans la bd 
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
               data: JSON.stringify(users) 
           });
       };

    // service qui supprime un user dans la bd
       self.deleteUser = function (id) {
           var url = "http://localhost:8080/rest/users/deleteUser/"+id;
           return $http({
               method: 'DELETE',
               url: url
           });
       };

       // service fait le update
       self.updateUser = function (id, users) {
           var url = "http://localhost:8080/rest/users/updateUser/"+id;
           return $http({
               method: 'POST',
               url: url,
               transformRequest: angular.identity,
               transformResponse: angular.identity,
               headers: {
                   'Content-Type': 'application/json'
               },
               data: JSON.stringify(users)
           });
       };
      

    });

app.controller('homeCtrl', ['ServiceForUsers', '$uibModal', '$scope', function (ServiceForUsers,$uibModal,$scope) {
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

        //self.AddUser = function (nom,prenom,telephone,adresse) {
        //    var data = {
        //        nom: nom,
        //        prenom: prenom,
        //        telephone: telephone,
        //        adresse: adresse
        //    }
        //};

        self.deleteUser = function (id) {

            deleteUser(id).then(function (response) {
                console.log("user deleted with id:",id);
            });


        };

        self.updateFormulaire = function () {
            
            self.modal_instance = $uibModal.open({
                templateUrl: 'home/formulaireUpdate.html',
               // controller: 'homeCtrl',
                scope: $scope,
                backdrop: 'static',
                keyboard: false
            });
        };

        self.closeModal = function () {
            self.modal_instance.close();
        };
       
        self.updateUser = function (id, clickedUser) {
            console.log("id", id);
            updateUser(id, self.clickedUser).then(function (response) {
                //console.log("youpppppiiiiiiiiiiii ");
                console.log("object du user a update ", self.clickedUser);
                self.users = response.data;
                console.log("object du user a update ", self.users);

                
                
                
            }, function () {
                console.log("failure");
            
               }).finally(function () {
                console.log("finally here ");
                  
            });
        };

        self.selectUser = function (user) {
            console.log(user);
            self.clickedUser = user;
        };

      



       
       

       



    }]);
