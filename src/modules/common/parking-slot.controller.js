// Parking Slot Controller
'use strict';

common.controller('parkingSlotCtrl', function (SpotsService, SlotsFactory, $log, $scope, ngDialog) {
  // Will hold parking spots info
  this.spots = {};

  // Initialitation of SlotsFactory
  SlotsFactory.init();

  // Watch for any change in spots list
  $scope.$watch(function() {
    return SlotsFactory.spots;
  }, angular.bind(this, function (newvalue) {
    this.spots = newvalue;
  }));


  this.assignSlot = function (plate) {
   SlotsFactory.assignSlot(plate);
    this.spots = SlotsFactory.spots;
  };

  $scope.edit = function(id){
    var usr = SlotsFactory.searchPlate(id);
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
    console.info(usr);
  }
});