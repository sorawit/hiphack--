module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      dist: {
        options: {
          sassDir: '../hiphackio/sass',
          cssDir: '../hiphackio/public/css'
        }
      }
    },
    browserify: {
      dev: {
        options: {
          debug: true,
          transform: ['reactify']
        },
        files: {
          '../hiphackio/public/js/app.js': '../hiphackio/ui/main.js'
        }
      },
      build: {
        options: {
          debug: false,
          transform: ['reactify']
        },
        files: {
          '../hiphackio/public/js/app.js': '../hiphackio/ui/main.js'
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      js_vendor: {
        src: [
          '../hiphackio/ui/vendor/jquery.min.js',
          '../hiphackio/ui/vendor/moment.min.js',
          '../hiphackio/ui/vendor/jquery.dataTables.min.js',
          '../hiphackio/ui/vendor/fullcalendar.min.js',
          '../hiphackio/ui/vendor/fullcalendar.lang.th.js',
          '../hiphackio/ui/vendor/perfect-scrollbar.jquery.min.js',
        ],
        dest: '../hiphackio/public/js/vendor.js',
      },
    },
    shell: {
        ui: {
            command: 'cd ../hiphackio/ui && npm install'
        },
        hiphooker: {
            command: 'cd ../hiphooker && npm install'
        }
    },
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: '../hiphackio/sass/**/*.scss',
        tasks: ['compass']
      },
      browserify: {
        files: ['../hiphackio/ui/**/*.js'],
        tasks: ['browserify:dev']
      },
      js_vendor: {
        files: ['../hiphackio/ui/vendor/**/*.js'],
        tasks: ['concat:js_vendor']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.registerTask('default', ['compass', 'browserify', 'concat', 'watch']);
};
