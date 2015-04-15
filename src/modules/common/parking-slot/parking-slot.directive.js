// Parking slot directive
'use strict';

common.directive('parkingSlot', function () {
  return {
    restrict : 'E',
    templateUrl : 'views/common/parking-slot/parking-slot.html',
    controller : 'parkingSlotCtrl',
    controllerAs: 'slots',
    replace : true
  };
});

