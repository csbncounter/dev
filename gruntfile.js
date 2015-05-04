module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      bloggerCss: {
        src: [
          'css/bootstrap.min.css',
          'css/agency.css',
          'css/ncounter.css'
        ],
        dest: 'blogger/csbncounter.css'
      },
      bloggerJs: {
        src: [
          'js/jquery.js',
          'js/bootstrap.js',
          'js/jquery.easing.min.js',
          'js/classie.js',
          'js/cbpAnimatedHeader.js'
        ],
        dest: 'blogger/csbncounter.js'
      }
    },

    copy: {
      bloggerCss: {
        src: 'blogger/csbncounter.css',
        dest: 'blogger/csbncounter.css',
        options: {
          process: function(content, srcpath) {
            // Convert CSS paths to protocol-relative URLs with full domain name
            // - url(http://csbncounter.org/path) => url(//csbncounter.org/path)
            // - ../path => //csbncounter.org/path
            return content.replace(/(url\(['"]?)(?:\/|\.\.\/)/g, '$1//dev.csbncounter.org/');
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
    },

    uglify: {
      bloggerJs: {
        files: {
          'blogger/csbncounter.js': 'blogger/csbncounter.js'
        }
      }
    },

    connect: {
      // http://localhost:8000
      staticServer: {
        options: {
          keepalive: true,
          port: 8000,
          base: '.',
          open: true
        }
      }
    }
  });

  grunt.registerTask('blogger', 'Build assets for Blogger', [
    'concat:bloggerCss',
    'copy:bloggerCss',
    'cssmin:bloggerCss',
    'concat:bloggerJs',
    'uglify:bloggerJs'
  ]);

  grunt.registerTask('dev', 'Start development mode', ['connect']);

  grunt.registerTask('default', 'Default task is dev', ['dev']);
};
