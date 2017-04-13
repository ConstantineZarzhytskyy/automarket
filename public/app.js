(function () {
  'use strict';

  angular
      .module('aMarket', [
        'ngRoute'
      ])
      .config(config)
      .controller('DashboardCtrl', DashboardCtrl);

  config.inject = ['$routeProvider'];

  function config($routeProvider) {
    $routeProvider
        .when('/dashboard', {
          templateUrl: './dashboard.html',
          controller: DashboardCtrl
        })
        .when('/automarket/:automarketId', {
          templateUrl: './automarket.html'
        })
        .otherwise({
          redirectTo: '/dashboard'
        });
  }

  function DashboardCtrl($scope, $http) {
    $scope.automarkets = [];

    getAautomarkets();
    function getAautomarkets() {
      $http.get('/api/automarket')
          .then(function (automarkets) {
            $scope.automarkets = automarkets.data;
          }, function (err) {
            console.log(err);
          });
    }

    $scope.createAutomarket = function () {
      $http.post('/api/automarket', { automarket: { name: 'automarket1', description: 'automarket1 description' } })
          .then(function () {
            getAautomarkets();
          }, function (err) {
            console.log(err);
          });
    };

    $scope.removeAutomarket = function (id) {
      $http.delete('/api/automarket/' + id)
          .then(function () {
            getAautomarkets();
          }, function (err) {
            console.log(err);
          });
    }
  }

})();