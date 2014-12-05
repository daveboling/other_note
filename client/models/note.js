(function(){
  'use strict';

  angular.module('hapi-auth')
  .factory('Note', ['$http', function($http){

    function create(note){
      return $http.post('/notes', note);
    }

    function noteIndex(query){
      return $http.get('/notes?limit=' + query.limit);
    }


    return {create:create, noteIndex: noteIndex};
  }]);
})();
