module.exports = function(grunt){
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
        less: {
            files: ['static/less/*.less'],
            tasks:['less:task1'],
            options: {livereload:false}
        },
        css: {
            files: ['static/css/*.css'],
            options: {livereload:true}
        }
    },
    less: {
        task1:{
            options: {
                compress: true,
                yuicompress: false
            },
            files: {
              "static/css/common.css": "static/less/common.less",
              "static/css/home.css": "static/less/home.less"
              //...
            }
        }
    },
});

grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-less');

grunt.registerTask('default',['watch']);
grunt.registerTask('lessc',['less:task1']);
};