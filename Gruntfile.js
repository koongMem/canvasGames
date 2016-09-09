module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-replace');

  var appConfig = {
    app: 'webapp',
    build: 'build',
    statics: 'statics',
    tmp: '.tmp'
  };


  // Project configuration.
  grunt.initConfig({
    super: appConfig,
    bower: {
      install: {
        options: {
          targetDir: '<%= super.app %>/<%= super.statics %>/bower_components',
          copy: false,
          cleanBowerDir: false,
        }
      },
      dist: {
        options: {
          targetDir: '<%= super.build %>/<%= super.statics %>/bower_components',
          production: true,
          cleanBowerDir: true,
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= super.app %>/<%= super.statics %>',
          src: ['**/*', '!scss/**', '!bower_components/**', '!scripts/**'],
          dest: '<%= super.build %>/<%= super.statics %>/'
        }, {
          expand: true,
          cwd: '<%= super.app %>',
          src: ['**/*.html'],
          dest: '<%= super.build %>'
        }, {
          expand: true,
          cwd: '<%= super.app %>/<%= super.statics %>/images',
          src: ['**/*'],
          dest: '<%= super.build %>/<%= super.statics %>/images'
        }]
      }
    },
    clean: {
      dist: ['<%= super.build %>/<%= super.statics %>/**', '<%= super.build %>/view/**'],
      server: ['<%= super.tmp %>']
    },
    watch: {
      compass: {
        files: ['<%= super.app %>/<%= super.statics %>/scss/{,*/}*.{scss,sass}'],
        tasks: ['compass:server']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= super.app %>/**/*.{html,jsp}',
          '<%= super.tmp %>/**/*.css',
          '<%= super.app %>/**/*.js'
        ]
      }
    },
    connect: {
      options: {
        port: 9006,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0',
        livereload: 35733
      },
      livereload: {
        options: {
          open: false,
          middleware: function(connect) {
            return [
              connect.static(appConfig.tmp),
              connect.static(appConfig.app)
            ];
          }
        }
      }
    },
    uglify: {
      dist: {
        options: {
          sourceMap: false,
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        },
        files: [{
          expand: true,
          cwd: '<%= super.app %>/<%= super.statics %>/scripts',
          src: ['**/*.js'],
          dest: '<%= super.build %>/<%= super.statics %>/scripts'
        }]
      }
    },
    compass: {
      options: {
        sassDir: '<%= super.app %>/<%= super.statics %>/scss',
        cssDir: '<%= super.app %>/<%= super.statics %>/css',
        generatedImagesDir: '<%= super.tmp %>/<%= super.statics %>/images/generated',
        imagesDir: '<%= super.app %>/<%= super.statics %>/images-source',
        javascriptsDir: '<%= super.app %>/scripts',
        fontsDir: '<%= super.app %>/styles/fonts',
        httpImagesPath: '/<%= super.statics %>/images',
        httpGeneratedImagesPath: '../images/generated',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          cssDir: '<%= super.build %>/<%= super.statics %>/css',
          generatedImagesDir: '<%= super.build %>/<%= super.statics %>/images/generated',
          outputStyle: 'compressed'
        }
      },
      server: {
        options: {
          cssDir: '<%= super.tmp %>/<%= super.statics %>/css',
          httpImagesPath: '/<%= super.statics %>/images',
          httpGeneratedImagesPath: '/<%= super.statics %>/images/generated',
          debugInfo: true
        }
      }
    },
    replace: {
      test: {
        options: {
          patterns: [{
            match: /('")?\/statics/g,
            replacement: function() {
              return 'http://7u2fd1.com2.z0.glb.qiniucdn.com/shetuanyue/statics'; // replaces "foo" to "bar"
            }
          },{
            match: /192.168.0.36:8084/g,
            replacement: function() {
              return 'shetuan.super.cn'; // replaces "foo" to "bar"
            }
          },{
            match: /\.(js|css)/g,
            replacement: function(q,m) {
              return q+"?"+(+Date.now()/1000).toFixed(0); // replaces "foo" to "bar"
            }
          }]
        },
        files: [{
          expand: true,
          cwd: '<%= super.build %>/',
          src: ['**/*.{js,html,css}'],
          dest: '<%= super.build %>/'
        }]
      }
    },
    concurrent: {
      server: [
        'clean:server',
        // 'bower:install',
        'compass:server'
      ]
    }
  });

  grunt.registerTask('serve', 'DEPRECATED TASK. Use the "serve" task instead', function(target) {
    grunt.task.run([
      'concurrent:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', 'DEPRECATED TASK. Use the "serve" task instead', function(target) {
    grunt.task.run([
      'clean:dist',
      // 'bower:dist',
      'compass:dist',
      'uglify:dist',
      'copy:dist'
    ]);
  });
};