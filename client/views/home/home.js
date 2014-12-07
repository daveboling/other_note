(function(){
  'use strict';

  var home = angular.module('hapi-auth');

  home.controller('HomeCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
    $rootScope.currentState = 'Home';
  }]);
})();
