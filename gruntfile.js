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
        partials: 'src/_partials',
        ext: 'hbs'
      }
    },

    copy: {
      bloggerCss: {
        src: 'dist/assets/css/all.css',
        dest: 'dist/assets/css/blogger.css',
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
        src: 'dist/assets/js/common.js',
        dest: 'dist/assets/js/blogger.js',
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
          { src: 'dist/assets/css/all.css.map', dest: 'dist/assets/css/all.css.map' }
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
          { src: 'dist/assets/js/landing.js.map', dest: 'dist/assets/js/landing.js.map' },
          { src: 'dist/assets/js/common.js.map', dest: 'dist/assets/js/common.js.map' }
        ]
      },
      img: {
        expand: true,
        cwd: 'src/assets/img/',
        src: '**/*',
        dest: 'dist/assets/img/'
      },
      fonts: {
        expand: true,
        cwd: 'src/assets/fonts/',
        src: '**/*',
        dest: 'dist/assets/fonts/'
      }
    },

    cssmin: {
      options: {
        sourceMap: true
      },
      all: {
        files: {
          'dist/assets/css/all.css': [
            'src/assets/vendor/bootstrap/bootstrap.css',
            'src/assets/vendor/font-awesome/font-awesome.css',
            'src/assets/css/theme.css',
            'src/assets/css/main.css',
            'src/assets/css/footer.css',
            'src/index.css',
            'src/!(assets)/**/*.css'
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
          'dist/assets/js/common.js': [
            'src/assets/vendor/jquery/jquery.js',
            'src/assets/vendor/underscore/underscore.js',
            'src/assets/vendor/jquery.easing/jquery.easing.js',
            'src/assets/vendor/bootstrap/bootstrap.js',
            'src/assets/js/theme/classie.js',
            'src/assets/js/theme/cbpAnimatedHeader.js',
            'src/assets/js/smoothScroll.js'
          ],
          'dist/assets/js/landing.js': [
            'src/assets/vendor/es6-promise/es6-promise.js',
            'src/assets/js/jquery-promise-shim.js',
            'src/assets/js/landing/newsImages.js',
            'src/assets/js/landing/current-news.js'
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
          'src/**/*.hbs'
        ],
        tasks: ['buildHtml']
      },
      css: {
        files: [
          'src/**/*.css'
        ],
        tasks: ['cssmin', 'copy:cssSourceMap']
      },
      js: {
        files: [
          'src/assets/js/**/*.js'
        ],
        tasks: ['uglify']
      },
      dist: {
        files: [
          'dist/assets/js/*.js',
          'dist/assets/css/*.css',
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
