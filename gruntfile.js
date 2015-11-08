module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.loadTasks('tasks');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    buildHtml: {
      all: {
        src: '',
        dist: ''
      }
    },

    copy: {
      bloggerCss: {
        src: 'dist/common.css',
        dest: 'dist/blogger.css',
        options: {
          process: function(content, srcpath) {
            // Convert CSS paths to protocol-relative URLs with full domain name
            // - url(http://csbncounter.org/path) => url(//csbncounter.org/path)
            // - ../path => //csbncounter.org/path
            return content.replace(/(url\(['"]?)(?:\/|\.\.\/)/g, '$1//csbncounter.org/');
          }
        }
      },
      bloggerJs: {
        src: 'dist/common.js',
        dest: 'dist/blogger.js',
      },
      cssSourceMap: {
        src: 'dist/common.css.map',
        dest: 'dist/common.css.map',
        options: {
          process: function(content, srcpath) {
            var headingEnd = content.indexOf(';');
            var heading = content.slice(0, headingEnd);
            // Prepend "../" to sourcemap URLs
            var search = /^([^;]*"sources":\[.*?")(?=\w)([^"\]]+"[^\[]*\])/;
            var match;
            while (match = heading.match(search)) {
              heading = heading.replace(search, '$1../$2');
            }
            return heading + content.slice(headingEnd, content.length);
          }
        }
      }
    },

    cssmin: {
      options: {
        sourceMap: true
      },
      all: {
        files: {
          'dist/common.css': [
            'vendor/bootstrap/bootstrap.css',
            'vendor/font-awesome/font-awesome.css',
            'css/theme.css',
            'css/main.css',
            'css/footer.css'
          ]
        }
      }
    },

    uglify: {
      options: {
        sourceMap: true
      },
      all: {
        files: {
          'dist/common.js': [
            'vendor/jquery/jquery.js',
            'vendor/jquery.easing/jquery.easing.js',
            'vendor/bootstrap/bootstrap.js',
            'js/theme/classie.js',
            'js/theme/cbpAnimatedHeader.js',
            'js/newsImages.js',
            'js/smoothScroll.js'
          ],
          'dist/landing.js': [
            'vendor/es6-promise/es6-promise.js',
            'vendor/underscore/underscore.js',
            'js/jquery-promise-shim.js',
            'js/landing/newsImages.js',
            'js/landing/current-news.js'
          ]
        }
      }
    },

    connect: {
      // http://localhost:8000
      staticServer: {
        options: {
          keepalive: true,
          port: 8000,
          base: '',
          open: true,
          livereload: true
        }
      }
    },

    watch: {
      hbs: {
        files: [
          '*.hbs'
        ],
        tasks: ['buildHtml']
      },
      css: {
        files: [
          'css/**/*.css'
        ],
        tasks: ['cssmin', 'copy:cssSourceMap']
      },
      js: {
        files: [
          'js/**/*.js'
        ],
        tasks: ['uglify']
      },
      livereload: {
        files: [
          'dist/*.css',
          'dist/*.js',
          '*.html'
        ],
        options: {
          livereload: true,
          spawn: false
        }
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: {
        tasks: ['connect', 'watch']
      }
    }
  });

  grunt.registerTask('build', 'Build assets', [
    'buildHtml',
    'cssmin',
    'uglify',
    'copy'
  ]);

  grunt.registerTask('dev', 'Start development mode', [
    'build',
    'concurrent'
  ]);

  grunt.registerTask('default', 'Default task is dev', ['dev']);
};
