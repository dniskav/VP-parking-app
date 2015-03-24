// nav controller
'use strict';

parking.controller('navCtrl', function (LoginService) {
  this.methods = {};
  this.LoginService = LoginService;

  /**
   * Calls logout service
   */
  this.methods.logout = function () {
    LoginService.logout();
  };
});