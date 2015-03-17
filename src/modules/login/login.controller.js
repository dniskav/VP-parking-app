// Login controller
'use strict';

login.controller('loginCtrl', function ($state, $scope, $auth) {
  this.user = {};
  this.methods = {};
  this.errors = {};
  this.errors.login = false;

  /**
   * Cta for user submitting the login form
   */
  this.methods.submit = angular.bind(this, function () {
    var user = $scope.login.user;

    $auth.login(user)
      .then(function () {
        console.log('user logged!');
      })
      .catch(function (response) {
        console.log('log fail',response)
      })
    // if(status) {
    //   this.errors.login = false
    //   // $state.go('home');
    // } else {
    //   this.errors.login = true
    // }
  });
});