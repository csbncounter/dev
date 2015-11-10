module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.loadTasks('tasks');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: ['dist', 'tempJs']
    },

    buildHtml: {
      all: {
        src: 'src',
        dist: 'dist',
        partials: 'src/partials',
        ext: 'hbs'
      }
    },

    copy: {
      bloggerCss: {
        src: 'dist/css/common.css',
        dest: 'dist/css/blogger.css',
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
        src: 'dist/js/common.js',
        dest: 'dist/js/blogger.js',
      },
      cssSourceMap: {
        options: {
          // Prepend "../" to sourcemap URLs
          process: function(content, srcpath) {
            var sourcesEnd = content.indexOf(',"names":');
            var sources = content.slice(0, sourcesEnd);
            var search = /^([^;]*"sources":\[.*?")(?=\w)([^"\]]+"[^\[]*\])/;
            while (search.test(sources)) {
              sources = sources.replace(search, '$1../$2');
            }
            return sources + content.slice(sourcesEnd, content.length);
          }
        },
        files: [
          { src: 'dist/css/common.css.map', dest: 'dist/css/common.css.map' }
        ]
      },
      jsSourceMap: {
        options: {
          // Prepend "../" to sourcemap URLs
          process: function(content, srcpath) {
            var sourcesEnd = content.indexOf(';');
            var sources = content.slice(0, sourcesEnd);
            var search = /^([^;]*"sources":\[.*?")(?:\.\.\/\.\.\/)([^"\]]+"[^\[]*\])/;
            while (search.test(sources)) {
              sources = sources.replace(search, '$1../$2');
            }
            return sources + content.slice(sourcesEnd, content.length);
          }
        },
        files: [
          { src: 'dist/js/landing.js.map', dest: 'dist/js/landing.js.map' },
          { src: 'dist/js/common.js.map', dest: 'dist/js/common.js.map' }
        ]
      },
      img: {
        expand: true,
        cwd: 'src/img/',
        src: '**/*',
        dest: 'dist/img/'
      },
      fonts: {
        expand: true,
        cwd: 'src/fonts/',
        src: '**/*',
        dest: 'dist/fonts/'
      }
    },

    cssmin: {
      options: {
        sourceMap: true
      },
      all: {
        files: {
          'dist/css/common.css': [
            'src/vendor/bootstrap/bootstrap.css',
            'src/vendor/font-awesome/font-awesome.css',
            'src/css/theme.css',
            'src/css/main.css',
            'src/css/footer.css'
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
          'dist/js/common.js': [
            'src/vendor/jquery/jquery.js',
            'src/vendor/underscore/underscore.js',
            'src/vendor/jquery.easing/jquery.easing.js',
            'src/vendor/bootstrap/bootstrap.js',
            'src/js/theme/classie.js',
            'src/js/theme/cbpAnimatedHeader.js',
            'src/js/smoothScroll.js'
          ],
          'dist/js/landing.js': [
            'src/vendor/es6-promise/es6-promise.js',
            'src/js/jquery-promise-shim.js',
            'src/js/landing/newsImages.js',
            'src/js/landing/current-news.js'
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
          base: ['dist'],
          open: true,
          livereload: true
        }
      }
    },

    shell: {
      sourceMaps: {
        command: 'cd dist && rm -f src && ln -s ../src src'
      }
    },

    watch: {
      hbs: {
        files: [
          'src/*.hbs',
          'src/**/*.hbs'
        ],
        tasks: ['buildHtml']
      },
      css: {
        files: [
          'src/css/*.css',
          'src/css/**/*.css'
        ],
        tasks: ['cssmin', 'copy:cssSourceMap']
      },
      js: {
        files: [
          'src/js/*.js',
          'src/js/**/*.js'
        ],
        tasks: ['uglify']
      },
      dist: {
        files: [
          'dist/js/*.js',
          'dist/css/*.css',
          'dist/**/*.html'
        ],
        options: {
          livereload: true
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
    'clean',
    'buildHtml',
    'cssmin',
    'uglify',
    'copy'
  ]);

  grunt.registerTask('dev', 'Start development mode', [
    'build',
    'shell:sourceMaps',
    'concurrent'
  ]);

  grunt.registerTask('default', 'Default task is dev', ['dev']);
};
