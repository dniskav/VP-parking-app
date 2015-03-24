'use strict';

common.directive('newVehicle', function() {
  return{
    restrict: 'E',
    templateUrl:'views/common/new-vehicle.html',
    controller: 'addNewCtrl',
    controllerAs: 'new',
    replace: true
  };
});