// Login service
'use strict';

/**
 * Service for validation of user credentials
 */
parking.service('LoginService', function LoginService($state, $q, $http) {
  var loginUrl = '/auth';

  /**
   * Service that logs user
   */
  this.userLogged = {};
  this.login = function (credentials) {
    var that = this;
    // This return statement will be replace with a service.
    this.checkData(credentials)
      .then(
        function (data) {
          that.userLogged = data;
          return data;
        }, 
        function (err) {
          return false;
        }
      );

    return true;
  };

  /**
   * Service that validates if user is logged in
   */
  this.isLogged = function () {
    if(this.userLogged.token) {
      return this.userLogged;
    }
    return false;
  };

  /**
   * Service to logout or kill the user session
   */
  this.logout = function () {
    var didLogout = true;
    // This conditional will be replace with a service.
    if(didLogout) {
      $state.go('home');
    } else {
      $log.error('The user doesn\'t wanna go...');
    };
  };

  this.checkData = function (user) {
    var defer = $q.defer();

    $http.post(loginUrl, user)
      .success(function(data) {
        defer.resolve(data);
      })
      .error(function() {
        defer.reject();
      });

    return defer.promise;
  };

});