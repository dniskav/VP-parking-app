// Apps module
'use strict';

var parking = angular.module('parking', [
    'ui.router',
    'common.module',
    'login.module',
    'ngCookies',
    'ngDialog'
  ]).config(function ($urlRouterProvider, $stateProvider) {
    // When no url finds a match redirect to /
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        templateUrl : 'views/home/home.html',
        url : '/'
      });
  });
