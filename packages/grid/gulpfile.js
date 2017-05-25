'use strict'

const gulp = require( 'gulp' )
const babel = require( 'gulp-babel' )


gulp.task( 'default', () =>
  gulp.start( 'babelify', 'typings' )
)

gulp.task( 'babelify', () =>
  gulp.src( 'src/**/*.js' )
    .pipe( babel( { presets: [ 'es2015' ] }) )
    .pipe( gulp.dest( 'dist' ) )
)

gulp.task( 'typings', () =>
  gulp.src( 'typings/**/*.d.ts' )
    .pipe( gulp.dest( 'dist' ) )
)
