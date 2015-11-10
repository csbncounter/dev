var http = require('http');

module.exports = function(grunt) {

  grunt.registerTask('triggerReload', function (filesQuery) {
    var stream = http.get('http://localhost:35729/changed?' + filesQuery);
    stream.on('error', function (err) {
      if (err.code === 'ECONNREFUSED') { return; }
      throw err;
    })
  });
}
