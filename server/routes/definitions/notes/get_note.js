/* jshint camelcase:false */
'use strict';

var Joi  = require('joi'),
    Note = require('../../../models/note');

module.exports = {
  description: 'Find one specific note. *Requires user auth.',
  tags:['notes'],
  validate: {
    params: {
      noteId: Joi.number().required()
    }
  },
  auth: {
    mode: 'try'
  },
  handler: function(request, reply){
    console.log(request.params.noteId);
    Note.findOne(request.params.noteId, function(err, note){
      console.log(err, note);
      reply(note.rows);
    });
  }
};
