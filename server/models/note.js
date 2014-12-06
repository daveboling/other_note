'use strict';

var pg = require('../postgres/manager');

function Note(){
}

Note.create = function(user, obj, cb){
  obj.tags = formatTags(obj.tags[0]);
  pg.query('select add_note($1, $2, $3, $4)', [user.id, obj.title[0], obj.body[0], obj.tags], function(err, results){
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
