const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');

gulp.task('minify-js', function() {
    return gulp.src('lib/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', () => {
    return gulp.src('lib/*.css')
        .pipe(cleanCSS({debug: true}, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(gulp.dest('dist'));
});
