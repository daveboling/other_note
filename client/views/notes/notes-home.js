(function(){
  'use strict';
  var notesHome = angular.module('hapi-auth');

  notesHome.controller('NotesHomeCtrl', ['$scope', 'Note', function($scope, Note){
    $scope.query = {limit: 30};
    $scope.notes = [];

    //view notes, default most recent default limit 30
    $scope.noteIndex = function(){
      Note.noteIndex($scope.query).then(function(res){
        $scope.notes = res.data;
      });
    };

    $scope.noteIndex($scope.query);

  }]);
})();
