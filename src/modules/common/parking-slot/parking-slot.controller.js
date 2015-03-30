// Parking Slot Controller
'use strict';

common.controller('parkingSlotCtrl', function (socketFactory, SlotsFactory, $log, $scope, ngDialog) {
  // Will hold parking spots info
  this.spots = {},
  this.auth = true;

  socketFactory.on('DC', function (data) {
    SlotsFactory.drawSlots()
    // console.log('data', data);
  });  

  // Initialitation of SlotsFactory
  SlotsFactory.init();

  // Watch for any change in spots list
  $scope.$watch(function() {
    return SlotsFactory.spots;
  }, angular.bind(this, function (newvalue) {
    this.spots = newvalue;
  }));

  // Assign a slot tu user
  this.assignSlot = function (id) {
   SlotsFactory.assignSlot(id);
    this.spots = SlotsFactory.spots;
  };
  // Delete user
  $scope.delete = function(id){
    var msg = 'This action is unrecoverable, are you sure????';

    if(confirm(msg)) {
      if(SlotsFactory.removeUser(id)) {
        alert(id + ' Deleted!!!');
      } else {
        // alert('somenthing happens, cannot delete user :/');
      };
    }
  };
  // Edit user
  $scope.edit = function(id){
    var usr = SlotsFactory.searchPlate(id);
    $scope.editUsrId = id;

    if(usr.position != '') {
      // launch the modal window
      ngDialog.open({ 
        template: 'views/common/new-vehicle-modal.html',
        className: 'modal-container',
        controller: 'addNewModal',
        scope: $scope  
      });
    } else {
      alert('user not found!');
    }
  }
});