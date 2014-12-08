'use strict';

var  mp     = require('multiparty'),
     Note   = require('../../../models/note');

module.exports = {
  description: 'Create a Note',
  tags:['notes'],
  payload: {
        maxBytes:4194304, //need to limit by 4mb
        output:'stream',
        parse: false //need to be true
  },
  handler: function(request, reply){
    var options = {uploadDir: __dirname + '../../../../../temp'},
    form = new mp.Form(options);
    console.log(request.payload);
    form.parse(request.payload, function(err, fields, files){
      // Note.create(request.auth.credentials, fields, files, function(err, note){
      //   reply();
      // });
      reply(err);
    });


  }
};
