'use strict';

var  mp     = require('multiparty'),
     Note   = require('../../../models/note');

module.exports = {
  description: 'Create a Note',
  tags:['notes'],
  payload: {
        maxBytes:209715200,
        output:'stream',
        parse: false
  },
  handler: function(request, reply){
    var options = {uploadDir: __dirname + '../../../../../temp'},
    form = new mp.Form(options);
    form.parse(request.payload, function(err, fields, files){
      Note.create(request.auth.credentials, fields, files, function(err, note){
        reply();
      });
    });


  }
};
