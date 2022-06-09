
const {src, dest, watch, parallel} = require("gulp");

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require("gulp-plumber");

// IMAGENES
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");
function css(done) {
    // 1. se identifica el archivo sass
    src("src/scss/**/*.scss")
        .pipe(plumber())
        // 2. compilar los archivos sass
        .pipe(sass())
        // 3. se almacenan los archivos compilados en un css
        .pipe(dest("build/css"));
    done();
}

function javascript(done) {
    src("src/js/**/*js")
        .pipe(dest("build/js"));
    done();
}

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src("src/img/**/*.{jpg,png}")
        .pipe(cache(imagemin(opciones)))
        .pipe(dest("build/img"));
    done();
}

function versionWebp(done) {
    const opciones = {
        quality: 50
    };
    src("src/img/**/*.{jpg,png}")
        .pipe(webp(opciones))
        .pipe(dest("build/img"));
    done();
}

function versionAvif(done) {
    const opciones = {
        quality: 50
    };
    src("src/img/**/*.{jpg,png}")
        .pipe(avif(opciones))
        .pipe(dest("build/img"));
    done();
}


function dev(done) {
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javascript);
    done();
}

exports.css = css;
exports.dev = dev;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);

