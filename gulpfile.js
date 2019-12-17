let gulp = require('gulp');
let babel = require('gulp-babel');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let sourcemaps = require('gulp-sourcemaps');
let sass = require('gulp-sass');
let prefixer = require('gulp-autoprefixer');
let rename = require('gulp-rename');
let clean = require('gulp-clean');
let imagemin = require('gulp-imagemin');
let pngquant = require('imagemin-pngquant');
let filesize = require('gulp-filesize');

let pathJsFiles = [
    'src/js/showCategoriesList.js',
    'src/js/showCategoryPage.js',
    'src/js/showNewProducts.js',
    'src/js/showProductCard.js',
    'src/js/CarouselNewProd.js',
    'src/js/newProdSlider.js',
    'src/js/sliders.js',
    'src/js/basket.js',
    'src/js/anchor.js',
    'src/js/modal.js',
    'src/js/link.js',
    'src/js/app.js',
];

let pathMinFiles = [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/owl.carousel2/dist/owl.carousel.min.js',
    'node_modules/jquery-ui-dist/jquery-ui.min.js',
    'dist/js/main.js',
]

let pathLibraryFiles = [
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/owl.carousel2/dist/assets/owl.carousel.min.css',
    'node_modules/jquery-ui-dist/jquery-ui.min.css',
]

gulp.task('default', gulp.series(
    gulp.series(scripts, scriptsFinish, cleanDist),
    gulp.parallel(styleLibrary, moveData, style, images, moveFonts)
));

function scripts() {
    return gulp.src(pathJsFiles)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
}

function scriptsFinish() {
    return gulp.src(pathMinFiles)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('build/js'));
}

function moveData() {
    return gulp.src('src/data/*.json')
        .pipe(gulp.dest('build/data'));
};

function moveFonts() {
    return gulp.src('src/fonts/*.*')
        .pipe(gulp.dest('build/fonts'));
};

function style() {
    return gulp.src('src/sass/main.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
        })
            .on('error', sass.logError))
        .pipe(prefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/css'));
};

function styleLibrary() {
    return gulp.src(pathLibraryFiles)
        .pipe(concat('library.css'))
        .pipe(gulp.dest('build/css'));
}

function images() {
    return gulp.src('src/images/**/*.*')
        .pipe(filesize())
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(filesize())
        .pipe(gulp.dest('build/images/'));
};

// Clean folder after build
gulp.task('clean', gulp.parallel(cleanCss, cleanJs, cleanData, cleanImages, cleanFonts));

function cleanCss(done) {
    gulp.src('build/css', { read: false })
        .pipe(clean());
    done();
};

function cleanJs(done) {
    gulp.src('build/js', { read: false })
        .pipe(clean());
    done();
};

function cleanData(done) {
    gulp.src('build/data', { read: false })
        .pipe(clean());
    done();
};

function cleanImages(done) {
    gulp.src('build/images', { read: false })
        .pipe(clean());
    done();
};

function cleanFonts(done) {
    gulp.src('build/fonts', { read: false })
        .pipe(clean());
    done();
};

// clean temporary folder
function cleanDist(done) {
    gulp.src('dist', { read: false })
        .pipe(clean());
    done();
};