module.exports = (grunt) ->

  grunt.registerTask "build", 
                     "Build the browserified bundle for browser use",
                     [ "browserify" ]

  grunt.registerTask "release", "Build, bump, and release", (bumpArg) ->
    if bumpArg?
      bumpArg = ":#{bumpArg}" 
    else
      bumpArg = ""
    grunt.task.run('build', "bump#{bumpArg}", "publish")

  grunt.initConfig

    browserify: 
      all:
        src: "index.js"
        dest: "dist/bible.js"
      options:
        transform: [ "coffeeify" ]
        ignore: [ require.resolve("coffee-script/register") ]
        browserifyOptions:
          standalone: "bible"
          extensions: [ ".coffee" ]

    bump:
      options:
        files: ['package.json', 'bower.json']
        commitFiles: ['package.json', 'bower.json']
        pushTo: 'origin'


  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-bump')
  grunt.loadNpmTasks('grunt-npm')