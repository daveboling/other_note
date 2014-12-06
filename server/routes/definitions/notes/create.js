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
  // validate: {
  //   payload: {
  //     title: Joi.string().required(),
  //     body: Joi.string().required(),
  //     tags: Joi.string().required()
  //   }
  // },
  handler: function(request, reply){

    var form = new mp.Form();
    form.parse(request.payload, function(err, fields, files){
      console.log(fields);
      console.log(files);
      Note.create(request.auth.credentials, fields, function(err, note){
        reply();
      });
    });


  }
};
