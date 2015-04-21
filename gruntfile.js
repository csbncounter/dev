module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      bloggerCss: {
        src: [
          'css/bootstrap.min.css',
          'css/agency.css',
          'css/ncounter.css',
          'font-awesome/css/font-awesome.css'
        ],
        dest: 'blogger/csbncounter.css'
      }
    },

    copy: {
      bloggerCss: {
        src: 'blogger/csbncounter.css',
        dest: 'blogger/csbncounter.css',
        options: {
          process: function (content, srcpath) {
            return content
              .replace(/\/?dev\//g, 'http://csbncounter.org/dev/')
              .replace(/\.\.\//g, 'http://csbncounter.org/dev/');
          }
        }
      }
    },

    cssmin: {
      bloggerCss: {
        files: {
          'blogger/csbncounter.css': 'blogger/csbncounter.css'
        }
      }
    }
  });

  grunt.registerTask('blogger-css', 'Build CSS for Blogger', [
    'concat:bloggerCss',
    'copy:bloggerCss',
    'cssmin:bloggerCss'
  ]);

  grunt.registerTask('default', 'Default task is blogger-css', ['blogger-css']);
};
