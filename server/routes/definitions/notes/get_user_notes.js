/* jshint camelcase:false */
'use strict';

var Joi  = require('joi'),
    Note = require('../../../models/note');

module.exports = {
  description: 'Display user notes',
  tags:['notes'],
  validate: {
    query: {
      limit: Joi.number().required(),
      tagFilter: Joi.string().required(),
      pageOffset: Joi.number().required()
    }
  },
  handler: function(request, reply){
    console.log(request.query);
    Note.all(request.auth.credentials, request.query, function(err, notes){
      console.log(err, notes);
      if(!err){
        reply(notes.rows);
      }else{
        reply({error: 'No notes were found. Try making some!'});
      }
    });
  }
};
