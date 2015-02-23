// Login service
'use strict';

/**
 * Service for validation of user credentials
 */
login.service('LoginService', function LoginService($state, $cookieStore) {
  /**
   * Service that logs user
   */
  this.login = function () {
    // This return statement will be replace with a service.
    $cookieStore.put('session', 'parking user session');
    return true;
  };

  /**
   * Service that validates if user is logged in
   */
  this.isLogged = function () {
    var usrSession = $cookieStore.get('session');
    // This return statement will be replace with a service.
    if(usrSession) {
      return true;
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
      $cookieStore.remove('session');
      $state.go('home');
    } else {
      $log.error('The user doesn\'t wanna go...');
    };
  };
});