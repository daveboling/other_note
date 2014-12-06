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
    var form = new mp.Form();
    form.parse(request.payload, function(err, fields, files){
      Note.create(request.auth.credentials, fields, files, function(err, note){
        reply();
      });
    });


  }
};
