// nav controller
'use strict';

parking.controller('navCtrl', function (LoginService, $cookies) {
  this.methods = {};
  this.$cookies = $cookies;
  this.LoginService = LoginService;

  /**
   * Calls logout service
   */
  this.methods.logout = function () {
    LoginService.logout();
  };
});