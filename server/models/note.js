'use strict';

var pg     = require('../postgres/manager'),
    crypto = require('crypto'),
    bucket = process.env.AWS_BUCKET,
    AWS    = require('aws-sdk'),
    s3     = new AWS.S3(),
    async  = require('async');


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
  pg.query('select add_note($1, $2, $3, $4, $5)', [user.id, obj.title[0], obj.body[0], obj.tags, awsLinks.links], function(err, results){
    if(awsLinks){
      uploadFilesToS3(images.file, awsLinks, cb);
    }else{
      cb();
    }
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
  return {links: links, folder: folder};
}

function uploadFilesToS3(images, awsLinks, cb){
  var index = 0;
  async.forEach(images, function(file, callback){
    if((/^image/).test(file.headers['content-type'])){ //if it's an image, upload it
      var params = {Bucket: bucket, Key: awsLinks.folder + '/' + file.originalFilename, Body: file.path, ACL: 'public-read'};
      index++;
      s3.putObject(params, callback);
    }else { callback(null); } //if it wasn't an image, callback with nothing
  }, cb); //when done, callback to Note.create where it was called
}
