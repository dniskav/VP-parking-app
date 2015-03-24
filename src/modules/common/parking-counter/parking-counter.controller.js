// parking counter controller
'use strict';

common.controller('parkingCounterCtrl', function (SlotsFactory, $scope) {
  this.available = SlotsFactory.getAvailableSlots();

  $scope.$watch(SlotsFactory.getAvailableSlots, angular.bind(this, function (newvalue) {
    this.available = newvalue;
  }));
});