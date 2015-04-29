//  Custom Directive for filter functionality
'use strict';

common.directive('tableFilter', function () {
  return{
    restrict: 'E',
    templateUrl: 'views/common/table-filter/table-filter.html',
    controller: 'tableFilterCtrl',
    controllerAs: 'filter',
    replace: true
  };
});
