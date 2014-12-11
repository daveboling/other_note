/* jshint camelcase:false */
'use strict';

var Joi  = require('joi'),
    Note = require('../../../models/note');

module.exports = {
  description: 'Upload a new photo to a ',
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
    Note.addPhoto(request.payload.image, request.params.noteId, function(err, photo){
      reply(photo).code(err ? 400 : 200);
    });
  }
};
