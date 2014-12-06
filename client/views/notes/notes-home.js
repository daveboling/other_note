(function(){
  'use strict';
  var notesHome = angular.module('hapi-auth');

  notesHome.controller('NotesHomeCtrl', ['$scope', '$state', 'Note', function($scope, $state, Note){
    $scope.query = {limit: 30, tagFilter: 'all'};
    $scope.notes = [];

    //view notes, default most recent default limit 30
    $scope.noteIndex = function(query){
      Note.noteIndex(query).then(function(res){
        $scope.notes = res.data;
      });
    };

    $scope.filterTag = function(tag){
      $scope.query.tagFilter = tag;
      $scope.noteIndex($scope.query);
    };

    $scope.displayNote = function(noteId){
      $state.go('notes-read', {noteId: noteId});
    };

    $scope.noteIndex($scope.query);

  }]);
})();
