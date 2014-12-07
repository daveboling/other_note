(function(){
  'use strict';
  var notesHome = angular.module('hapi-auth');

  notesHome.controller('NotesHomeCtrl', ['$scope', '$state', 'Note', function($scope, $state, Note){
    $scope.query = {limit: 30, tagFilter: 'all', pageOffset: 0};
    $scope.notes = [];
    $scope.pages = [];

    //view notes, default most recent default limit 30
    $scope.noteIndex = function(query){
      Note.noteIndex(query).then(function(res){
        $scope.notes = res.data;
        getPages(Math.ceil($scope.notes.length / 5)); //reset $scope.pages
      });
    };

    $scope.filterTag = function(tag){
      $scope.query.tagFilter = tag;
      $scope.noteIndex($scope.query);
    };

    $scope.changePage = function(pageOffset){
      $scope.query.pageOffset = pageOffset;
      Note.noteIndex($scope.query).then(function(res){
        $scope.notes = res.data;
      });
    };

    $scope.displayNote = function(noteId){
      $state.go('notes-read', {noteId: noteId});
    };

    function getPages(num){
      var offset = 0;
      $scope.pages = [];
      for(var i = 1; i <= num; i++){
        $scope.pages.push({pageNum: i, offset: offset});
        offset += 5;
      }
    }

    $scope.noteIndex($scope.query);

  }]);
})();
