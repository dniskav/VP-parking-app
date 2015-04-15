// Controller to manage events related to new user insert
'use strict';
 
common.controller('addNewCtrl', function ($scope, $log, ngDialog, SlotsFactory){

  $scope.addNew = function() {
    ngDialog.open({ 
      template: 'views/common/new-vehicle/new-vehicle-modal.html',
      className: 'modal-container',
      controller: 'addNewModal' 
    });
  };

});