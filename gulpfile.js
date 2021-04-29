const { src, dest, parallel, series, watch } = require( 'gulp' );

const merge = require( 'merge-stream' );
const fileinclude = require( 'gulp-file-include' );
const plumber = require( 'gulp-plumber' );
const sourcemap = require( 'gulp-sourcemaps' );
const pug = require( 'gulp-pug' );
const sass = require( 'gulp-sass' );
const postcss = require( 'gulp-postcss' );
const autoprefixer = require( 'autoprefixer' );
const server = require( 'browser-sync' ).create();
const csso = require( 'gulp-csso' );
const rename = require( 'gulp-rename' );
const imagemin = require( 'gulp-imagemin' );
const spritesmith = require( 'gulp.spritesmith' );
const webp = require( 'gulp-webp' );
const del = require( 'del' );
const deploy = require('gulp-gh-pages');

function scss() {
  return src( 'source/sass/style.scss' )
    .pipe( plumber() )
    .pipe( sourcemap.init() )
    .pipe( sass() )
    .pipe( postcss( [ autoprefixer() ] ) )
    .pipe( csso() )
    .pipe( rename( 'style.min.css' ) )
    .pipe( sourcemap.write( '.' ) )
    .pipe( dest( 'build/css' ) )
    .pipe( server.stream() );
};

function css() {
  return src( 'source/css/**/*.css' )
    .pipe( postcss( [ autoprefixer() ] ) )
    .pipe( csso() )
    .pipe( rename( {
      suffix: ".min"
    } ) )
    .pipe( dest( 'build/css' ) );
};

function sync() {
  server.init( {
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  } );

  watch( 'source/sass/**/*.{scss,sass}', series( scss ) );
  watch( 'source/*.html', series( html, refresh ) );
  watch( 'source/pug/**/*.pug', series( getPug, html, refresh ) );
};

function refresh( done ) {
  server.reload();
  done();
};

function images() {
  return src( 'source/img/**/*.{png,jpg,svg}' )
    .pipe( imagemin( [
      imagemin.optipng( { optimizationLevel: 3 } ),
      imagemin.jpegtran( { progressive: true } ),
      imagemin.svgo()
    ] ) )

    .pipe( dest( 'source/img' ) );

};

function getWebp() {
  return src( 'source/img/*.{png,jpg}' )
    .pipe( webp( { quality: 90 } ) )
    .pipe( dest( 'source/img' ) );
};

function sprite() {
  const spriteData = src( 'source/img/icons/icon-*.png' )
    .pipe( spritesmith( {
      retinaSrcFilter: 'source/img/icons/icon-*@2x.png',
      imgName: 'sprite@1x.png',
      imgPath: '/img/sprite@1x.png',
      retinaImgName: 'sprite@2x.png',
      retinaImgPath: '/img/sprite@2x.png',
      cssName: 'sprite.scss',
    } ) );

  const imgStream = spriteData.img
    .pipe( dest( 'source/img/' ) );

  const cssStream = spriteData.css
    .pipe( dest( 'source/sass/' ) );

  return merge( imgStream, cssStream );
};

function html() {
  return src( 'source/*.html' )
    .pipe( fileinclude() )
    .pipe( dest( 'build' ) );
};

function getPug() {
  return src( 'source/pug/*.pug' )
    .pipe( pug( {
      pretty: true
    } ) )
    .pipe( dest( 'source/includes' ) );
};

function copy() {
  return src( [
    'source/fonts/**/*.{woff,woff2}',
    'source/img/*.{png,jpg,svg,webp}',
    'source/js/**',
    'source/*.*'
  ], {
    base: 'source'
  } )
    .pipe( dest( 'build' ) );
};

function clean() {
  return del( 'build' );
};

function deployProject() {
  return src('build/**/*')
      .pipe(deploy());
};

exports.deploy = deployProject;
exports.img = series( getWebp, images, sprite );
exports.build = series( clean, copy, scss, css, getPug, html );
exports.start = series( exports.build, sync );
