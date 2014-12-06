(function(){
  'use strict';

  angular.module('hapi-auth')
  .factory('Note', ['$http', function($http){

    function create(note){
      return $http.post('/notes', note);
    }

    function noteIndex(query){
      return $http.get('/notes?limit=' + query.limit + '&tagFilter=' + query.tagFilter);
    }

    function findNote(noteId){
      return $http.get('/notes/read/' + noteId);
    }


    return {create:create, noteIndex: noteIndex, findNote: findNote};
  }]);
})();
