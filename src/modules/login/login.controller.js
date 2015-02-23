// Login controller
'use strict';

login.controller('loginCtrl', function ($state, LoginService) {
  this.user = {};
  this.methods = {};
  this.errors = {};
  this.errors.login = false;

  /**
   * Cta for user submitting the login form
   */
  this.methods.submit = angular.bind(this, function () {
    if(LoginService.login()) {
      this.errors.login = false
      $state.go('home');
    } else {
      this.errors.login = true
    }
  });
});