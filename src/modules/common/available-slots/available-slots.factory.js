// Factory that stores all the data related to available parking lots
'use strict';

common.factory('SlotsFactory', function ($http, $q, $log, $timeout) {
  var factory = {},
    totalSlots = 10,
    spotsUrl = 'API/spots',
    availableSlots = 0;

  factory.spots = [];

  // Factory Init
  factory.init = function () {
    factory.drawSlots();
  }

  factory.drawSlots = function () {
    this.getData()
      .then(angular.bind(this, function (data) {
        for(var ndx in data){
          data[ndx].plate = factory.normalizePlate(data[ndx].plate);
        }
        factory.spots = data;
        factory.setAvailableSlots();
      }));    
  };

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
    var usr,
        user = {};

    var assign = function() {
      factory.editData(id, user)
        .then(angular.bind(this, function (data) {
          factory.drawSlots();
        }),
          function(err) {
            alert('save fail!!!'); 
            factory.drawSlots();
          }
        );
    } ;   

    factory.getData(id)
      .then(
        angular.bind(this, function (data) {
          usr = data;
          user.active = !usr.active;
          assign();
        })
      );
  };

  // Format plate of vehicle
  factory.normalizePlate = function (plate){
    return plate.match(/[A-Za-z0-9]/gi).join('').toUpperCase();  
  };

  //Insert new vehicle
  factory.removeUser = function (id) {
    factory.removeData(id)
      .then(function (res) {
        factory.drawSlots();
        return res
      });
  };

  factory.createUser = function (user) {

    factory.setData(user)
      .then(
        function (data) {
          factory.drawSlots();
        },
        function(err) {
          alert('save fail!!!'); 
        }
      );
  };

  factory.editUser = function (user, data) {

    factory.editData(user, data)
      .then(
        function (data) {
          factory.drawSlots();
        },
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
  factory.getData = function (id) {
    var defer = $q.defer(),
        url = (id)? spotsUrl + '/' + id : spotsUrl;

    $http.get(url)
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

    console.log(user);

    $http.post(spotsUrl, user)
      .success(function(data) {
        defer.resolve(data);
      })
      .error(function() {
        defer.reject();
      });

    return defer.promise;
  };

  factory.editData = function (user, data) {
    var defer = $q.defer(),
        url = spotsUrl + '/' + user;

    $http.put(url, data)
      .success(function(data) {
        defer.resolve(data);
      })
      .error(function() {
        defer.reject();
      });

    return defer.promise;
  };

  factory.removeData = function (id) {
    var defer = $q.defer(),
        url = spotsUrl + '/' + id;

    $http.delete(url)
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