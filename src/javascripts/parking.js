// Apps module
'use strict';

var parking = angular.module('parking', [
    'ui.router',
    'common.module',
    'satellizer',
    'ngDialog'
  ]).config(function ($urlRouterProvider, $stateProvider, $authProvider) {
    // When no url finds a match redirect to /
    $authProvider.loginUrl = "API/auth";
    $authProvider.signupUrl = "API/auth";
    $authProvider.tokenName = "token";
    $authProvider.tokenPrefix = "VPparkingApp";
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
      .state('home', {
        templateUrl : 'views/home/home.html',
        url : '/'
      })
    .state('login', {
      controller : 'loginCtrl',
      controllerAs : 'login',
      templateUrl : 'views/login/login.html',
      url : '/login'
    });

  });
