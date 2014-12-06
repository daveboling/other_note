'use strict';

var pg     = require('../postgres/manager'),
    crypto = require('crypto');

function Note(){
}

Note.create = function(user, obj, images, cb){
  var awsLinks = [];
  obj.tags = formatTags(obj.tags[0]);

  //images array, post id
  if(images.file){
    awsLinks = reformatAwsFiles(images.file);
  }

  //save notes, tags, photos to the database!
  pg.query('select add_note($1, $2, $3, $4, $5)', [user.id, obj.title[0], obj.body[0], obj.tags, awsLinks], function(err, results){
    cb();
  });

};

Note.all = function(user, query, cb){
  pg.query('select * from display_note($2, '+query.limit+', $1)', [query.tagFilter, user.id], cb);
};

module.exports = Note;

//format tags for less inconsistencies
function formatTags(tags){
  tags = tags.split(',').map(function(s){ return s.trim(); }).join(',');
  return tags;
}

function reformatAwsFiles(images){
  var folder = crypto.randomBytes(48).toString('hex'), //random folder generated based on userame
  links = [];
  links = images.map(function(f){
    return 'https://s3.amazonaws.com/' + process.env.AWS_BUCKET + '/' + folder + '/' + f.originalFilename;
  });
  return links;
}
