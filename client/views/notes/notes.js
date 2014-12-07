(function(){
  'use strict';

  angular.module('hapi-auth')
  .controller('NotesCtrl', ['$rootScope', '$scope', '$state', '$upload', 'Note', function($rootScope, $scope, $state, $upload,Note){
    $rootScope.currentState = 'Create Note';
    $scope.note = {};
    $scope.files = [];
    $scope.create = function(note){
      $scope.upload = $upload.upload({
            url: '/notes',
            method: 'POST',
            data: $scope.note,
            file: $scope.files
      }).then(function(res){
        //console.log('Images successfully updated and note saved.');
      });
    };


  }]);
})();
