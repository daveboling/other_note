/* jshint camelcase:false */
(function(){
  'use strict';

  var readNote = angular.module('hapi-auth');

  readNote.controller('ReadNoteCtrl', ['$scope', '$stateParams', 'Note', function($scope, $stateParams, Note){
    $scope.note = {};
    $scope.photos = [];
    Note.findNote($stateParams.noteId).then(function(res){
      $scope.note = res.data[0];
    });
  }]);
})();
