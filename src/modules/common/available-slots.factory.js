// Factory that stores all the data related to available parking lots
'use strict';

common.factory('SlotsFactory', function ($http, $q, $log, $timeout) {
  var factory = {},
    totalSlots = 10,
    spotsUrl = '/spots',
    availableSlots = 0;

  factory.spots = [];

  // Factory Init
  factory.init = function () {
    this.getData(spotsUrl)
      .then(angular.bind(this, function (data) {
        for(var ndx in data){
          data[ndx].plate = factory.normalizePlate(data[ndx].plate);
        }
        factory.spots = data;
        factory.setAvailableSlots();
      }));
  }

  // Available slots
  factory.setAvailableSlots = function () {
    var parkingList = factory.spots.length,
      count = 0;

    for (var i = 0; i < parkingList; i++) {
      count += (factory.spots[i].active) ? 1 : 0;
    };

    availableSlots = count;
  };

  factory.getAvailableSlots = function () {
    return availableSlots;
  };

  factory.assignSlot = function (id) {
    var str;

    // plate = factory.normalizePlate(plate);

    for (var i = 0; i < factory.spots.length; i++) {
      str = factory.spots[i]._id;

      if (id == str) {
          if (!factory.spots[i].active) {
            factory.spots[i].active = true;
          }else{
            factory.spots[i].active = false;
          };
          factory.setAvailableSlots();
      };
    };
  };
  // Format ID of vehicle

  factory.normalizePlate = function (plate){
    return plate.match(/[A-Za-z0-9]/gi).join('').toUpperCase();  
  };

  //Insert new vehicle
  factory.createUser = function (user) {

    if (typeof factory.searchPlate(user.plate) === 'object') return;
    
    var newUser = {
      active: false,
      type: user.type.toLowerCase(),
      plate: factory.normalizePlate(user.plate),
      name: user.name
    };

    factory.setData(newUser)
      .then(angular.bind(this, function (data) {
        factory.spots.push(newUser);
        console.log(data);
      }),
        function(err) {
          alert('save fail!!!'); 
        }
      );
  };

  // Search plate
  factory.searchPlate = function (plate){

    plate = factory.normalizePlate(plate);
    // Iterator to verify that the user plate is not present in the current array 
    for(var ndx in factory.spots){

      var DbPlate = factory.normalizePlate(factory.spots[ndx].plate);
      if (DbPlate === plate) return { position: ndx };
    };
    return false;
  };

  // Http Request to parking users object
  factory.getData = function () {
    var defer = $q.defer();

    $http.get(spotsUrl)
      .success(function(data) {
        defer.resolve(data);
      })
      .error(function() {
        defer.reject();
      });

    return defer.promise;
  };

  factory.setData = function (user) {
    var defer = $q.defer();

    $http.post(spotsUrl, user)
      .success(function(data) {
        defer.resolve(data);
      })
      .error(function() {
        defer.reject();
      });

    return defer.promise;
  };

  factory.editData = function (user) {
    var defer = $q.defer();

    $http.put(spotsUrl, user)
      .success(function(data) {
        defer.resolve(data);
      })
      .error(function() {
        defer.reject();
      });

    return defer.promise;
  };

  // return factory object
  return factory;
});