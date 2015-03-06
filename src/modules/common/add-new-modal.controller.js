// Controller to manage events related to modal of new user
'use strict';
 
common.controller('addNewModal', function ($scope, $log, $timeout, SlotsFactory, ngDialog){

  var editedUser,
      form = $scope.newUserForm,
      editUsrId = $scope.$parent.editUsrId,
      resp;

  this.spots = SlotsFactory.spots;

  $scope.saveNew = function(update) {
    var user = $scope.editedUser;
    if (update) {
      resp = SlotsFactory.editUser(editUsrId, user);
    } else {
      console.warn(user);
      resp = SlotsFactory.createUser(user);
    }
    ngDialog.closeAll();
    return resp
  };

  var getUserData = function () {
    SlotsFactory.getData(editUsrId)
      .then(
        function(data) {
          $scope.editedUser = data;
        },
        function(err) {

        }
      )
  };
  
  if(editUsrId) {
    getUserData();
  };

});