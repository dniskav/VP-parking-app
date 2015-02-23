// Parking Slot Controller
'use strict';

common.controller('parkingSlotCtrl', function (SpotsService, SlotsFactory, $log, $scope) {
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
});