(function(){
  'use strict';

  var readNote = angular.module('hapi-auth');

  readNote.controller('ReadNoteCtrl', ['$scope', '$stateParams', 'Note', function($scope, $stateParams, Note){
    $scope.note = {};
    Note.findNote($stateParams.noteId).then(function(res){
      console.log('stuff');
      $scope.note = res.data;
    });
  }]);
})();
