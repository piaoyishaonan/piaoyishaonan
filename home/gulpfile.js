var gulp = require('gulp');
var uglify = require('gulp-uglify'); 
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var  browserSync = require('browser-sync').create(),
reload = browserSync.reload;
var projectName = "./src/home";
//如果task名称是default的话，直接执行gulp即可(或者gulp default)
// gulp.task('uglify', function() {
//     gulp.src('./src/js/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('./src/jsmin'));
// });

// uglify({
//     mangle: true,//类型：Boolean 默认：true 是否修改变量名
//     compress: true,//类型：Boolean 默认：true 是否完全压缩
//     preserveComments: 'all' //保留所有注释
// })

// gulp.task('uglify', function() {
//     gulp.src(projectName +'/js/*.js')
//         .pipe(uglify())
//         .pipe(rename({suffix:'.min'}))
//         .pipe(gulp.dest(projectName +'/js'));
// });

// var watcher = gulp.watch(projectName +'/js/*.js', ['uglify']);
// watcher.on('change', function(event) {
//   console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
// });

gulp.task('css', function() {
    gulp.src(projectName +'/sass/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(rename({extname:'.css'}))
        .pipe(gulp.dest(projectName +'/css'));
});

var watcher = gulp.watch(projectName +'/sass/**/*.scss', ['css']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});

gulp.task('default', ['css'], function() {
    //更改默认端口
    browserSync.init({
        files: projectName + "/**",
        server: {
            baseDir: projectName +"/",
            index: "jiajuxiangqing.html"
        },
        open: "external",
        port: 9080
    });
    //监听html、sass及js的修改
    gulp.watch(projectName +"/**/*.html").on('change', reload);
    gulp.watch(projectName +"/**/*.css").on('change', reload);
    gulp.watch(projectName +"/**/*.js").on('change', reload);
});