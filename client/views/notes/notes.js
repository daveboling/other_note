(function(){
  'use strict';

  angular.module('hapi-auth')
  .controller('NotesCtrl', ['$rootScope', '$scope', '$state', 'Note', function($rootScope, $scope, $state, Note){
    $scope.note = {};
    $scope.create = function(note){
      Note.create(note).then(function(response){
        console.log(response.data);
      }, function(){
        console.log('error');
      });
    };
  }]);
})();
