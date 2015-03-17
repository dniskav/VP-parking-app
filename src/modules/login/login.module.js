// Login module
'use strict';

var login = angular.module('login.module', []);

login.config(function ($stateProvider) {
  $stateProvider
    .state('login', {
      controllerAs : 'login',
      controller : 'loginCtrl',
      templateUrl : 'views/login/login.html',
      url : '/login'
    });
});