// Directive for counter in the UI
'use strict';

common.directive('parkingCounter', function () {
  return {
    restrict : 'E',
    templateUrl : 'views/common/parking-counter/parking-counter.html',
    controller : 'parkingCounterCtrl',
    controllerAs : 'counter',
    replace : true
  };
});
