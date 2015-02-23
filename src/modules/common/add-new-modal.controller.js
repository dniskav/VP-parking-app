// Controller to manage events related to modal of new user
'use strict';
 
common.controller('addNewModal', function ($scope, $log, $timeout, SlotsFactory, ngDialog){

  var newUser;
  this.spots = SlotsFactory.spots;

  $scope.saveNew = angular.bind(this, function() {
    
    newUser = {
      name: $scope.name,
      plate: $scope.plate,
      type: $scope.type
    };
    SlotsFactory.createUser(newUser);
    ngDialog.closeAll();
  });

  
});