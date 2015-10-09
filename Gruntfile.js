module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-lintspaces');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      style: {
        files: {
          'css/style.css': 'less/style.less'
        }
      }
    },

    autoprefixer: {
      options: {
      // Task-specific options go here.
        browsers: ['last 5 versions', 'ie 8', 'ie 9'] 
      },
      your_target: {
      // Target-specific file lists and/or options go here. 
      },
    },

    postcss: {
    options: {
      map: true, // inline sourcemaps

      // or
      map: {
          inline: false, // save all sourcemaps as separate files...
          annotation: 'dist/css/maps/' // ...to the specified directory
      },

      processors: [
        require('pixrem')(), // add fallbacks for rem units
        require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
        require('cssnano')() // minify the result
      ]
    },
    dist: {
      src: 'css/*.css'
    }
  },

    
    watch: {
      styles: {
        files: ['less/**/*.less'],
        tasks: ['less','notify:less'],
        options: {
            spawn: false,
            livereload: true
        }
      },
      livereload: {
        files: ['*.html'],
        tasks: ['notify:html'],
        options: {
          livereload: true
        }
      }
    },


    notify: {
      less: {
        options: {
          title: 'Ура!',  // optional
          message: 'LESS героически скомпилирован', //required
        }
      },
      html: {
        options: {
          title: 'Ура-Ура!',  // optional
          message: 'HTML обновлен!', //required
        }
      }
    },

    lintspaces: {
      test: {
        src: [
          '*.html',
          'js/*.js',
          'less/*.less',
          'sass/*.sass'
        ],
        options: {
          editorconfig: '.editorconfig'
        }
      }
    },

    copy: {
      gosha: {
        files: [{
          expand: true,
          src: [
            '*.html',
            'css/**',
            'img/**',
            'js/**'
          ],
          dest: 'gosha',
        }]
      }
    },

    clean: {
      gosha: [
        'gosha/img/README',
        'gosha/js/README'
      ]
    }
  });

  grunt.registerTask('test', ['lintspaces:test']);
  grunt.registerTask('default', ['postcss:dist']);

  if (grunt.file.exists(__dirname, 'less', 'style.less', 'autoprefixer')) {
    grunt.registerTask('gosha', ['less:style', 'copy:gosha', 'clean:gosha']);
  } else if (grunt.file.exists(__dirname, 'sass', 'style.scss')) {
    grunt.registerTask('gosha', ['sass:style', 'copy:gosha', 'clean:gosha']);
  } else {
    grunt.registerTask('gosha', ['copy:gosha', 'clean:gosha']);
  }
};
