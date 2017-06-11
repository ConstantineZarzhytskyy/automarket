(function () {
  'use strict';

  angular
      .module('aMarket', [
        'ngRoute'
      ])
      .config(config)
      .controller('DashboardCtrl', DashboardCtrl)
      .controller('AutoMarketCtrl', AutoMarketCtrl);

  config.inject = ['$routeProvider'];

  function config($routeProvider) {
    $routeProvider
        .when('/dashboard', {
          templateUrl: './dashboard.html',
          controller: DashboardCtrl
        })
        .when('/automarket/:automarketId', {
          templateUrl: './automarket.html',
          controller: AutoMarketCtrl
        })
        .when('/auto/:autoId', {
          templateUrl: './auto.html',
          controller: AutoCtrl
        })
        .otherwise({
          redirectTo: '/dashboard'
        });
  }

  function DashboardCtrl($scope, $http, $location) {
    $scope.automarkets = [];
    $scope.isAddAutomarket = false;

    getAautomarkets();
    function getAautomarkets() {
      $http.get('/api/automarket')
          .then(function (automarkets) {
            $scope.automarkets = automarkets.data;
          }, function (err) {
            console.log(err);
          });
    }

    $scope.showAddAutomarket = function () {
      $scope.isAddAutomarket = !$scope.isAddAutomarket;
    };

    $scope.createAutomarket = function (automarket) {
      $http.post('/api/automarket', { automarket: automarket })
          .then(function () {
            $scope.showAddAutomarket();
            getAautomarkets();
          }, function (err) {
            console.log(err);
          });
    };

    $scope.editAutomarket = function (automarket) {
      $scope.newAutomarket = automarket;
      if (!$scope.isAddAutomarket) {
        $scope.showAddAutomarket();
      }
    };

    $scope.removeAutomarket = function (id) {
      $http.delete('/api/automarket/' + id)
          .then(function () {
            getAautomarkets();
          }, function (err) {
            console.log(err);
          });
    };

    $scope.goToAutomarketPage = function (autoId) {
      $location.path('automarket/' + autoId);
    }
  }

  function AutoMarketCtrl($scope, $http, $routeParams, $location) {
    $scope.isAddPerosnal = false;
    $scope.automarketId = $routeParams.automarketId;

    getAutomarket($scope.automarketId);
    function getAutomarket(automarketId) {
      $scope.newPersonal = { name: '', description: '' };

      $http.get('/api/automarket/' + automarketId)
          .then(function (automarket) {
            $scope.automarket = automarket.data;
          }, function (err) {
            console.log(err);
          })
    }

    $scope.showAddPersonal = function () {
      $scope.isAddPerosnal = !$scope.isAddPerosnal;
    };

    $scope.showAddAuto = function () {
      $scope.isAddAuto = !$scope.isAddAuto;
    };

    $scope.addPersonal = function (personal) {
      $http.post('/api/member', {
        personal: personal,
        automarketId: $scope.automarketId
      })
          .then(function () {
            $scope.showAddPersonal();
            getAutomarket($scope.automarketId);
          }, function (err) {
            console.log(err);
          })
    };


    $scope.addAuto = function (auto) {
      $http.post('/api/auto', {
        auto: auto,
        automarketId: $scope.automarketId
      })
          .then(function () {
            $scope.showAddAuto();
            getAutomarket($scope.automarketId);
          }, function (err) {
            console.log(err);
          })
    };

    $scope.goToAutoPage = function (autoId) {
      $location.path('/auto/' + autoId);
    }
  }

  function AutoCtrl($scope, $http, $routeParams) {
    $scope.autoId = $routeParams.autoId;
    $scope.isAddShares = $scope.isBuyAuto = false;

    getAuto($scope.autoId);
    function getAuto(autoId) {
      $http.get('/api/auto/' + autoId)
          .then(function (auto) {
            $scope.auto = auto.data;
          }, function (err) {
            console.log(err);
          })
    }

    $scope.showAddShares = function () {
      $scope.isAddShares = !$scope.isAddShares;
    };

    $scope.addShares = function (shares) {
      $http.post('/api/shares', {
        shares: shares,
        autoId: $scope.autoId
      })
          .then(function () {
            $scope.showAddShares();
            getAuto($scope.autoId);
          }, function (err) {
            console.log(err);
          })
    };

    $scope.removeShares = function (sharesId) {
      $http.delete('/api/shares/' + sharesId)
          .then(function () {
            getAuto($scope.autoId);
          }, function (err) {
            console.log(err);
          })
    };

    $scope.showBuyAuto = function () {
      $scope.isBuyAuto = !$scope.isBuyAuto;
    };
    
    $scope.buyAuto = function () {
      var today = new Date();
      var buyPrice = $scope.auto.price;

      for(var i in $scope.auto.shares) {
        if (new Date($scope.auto.shares[i].start) <= today && today <= new Date($scope.auto.shares[i].end)) {
          buyPrice = buyPrice * (100 - $scope.auto.shares[i].percentage) / 100;
        }
      }
      $scope.auto.buyPrice = buyPrice;
      $http.put('/api/auto/'+ $scope.auto._id, { auto: $scope.auto })
          .then(function () {
            $scope.showBuyAuto();
            getAuto($scope.autoId);
          }, function (err) {
            console.log(err);
          })
    }
  }
})();