(function(){
  'use strict';
  var notesHome = angular.module('hapi-auth');

  notesHome.controller('NotesHomeCtrl', ['$scope', 'Note', function($scope, Note){
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

    $scope.noteIndex($scope.query);

  }]);
})();
