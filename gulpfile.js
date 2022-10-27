const { src, dest, series, watch } = require(`gulp`),
    CSSLinter = require(`gulp-stylelint`),
    htmlCompressor = require(`gulp-htmlmin`),
    validateCSS = require(`gulp-clean-css`),
    babel = require(`gulp-babel`),
    jsCompressor = require(`gulp-uglify`),
    jsLinter = require(`gulp-eslint`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

    let browserChoice = `default`;

    async function chrome () {
        browserChoice = `google chrome`;
    }

    let valCSS = () => {
        return src([
            `dev/css/*.css`,
            `dev/css/**/*.css`])
            .pipe(validateCSS(undefined));
    };

   

    let compressHTML = () => {
        return src([`dev/html/*.html`,`dev/html/**/*.html`])
            .pipe(htmlCompressor({collapseWhitespace: true}))
            .pipe(dest(`prod`));
    };
    exports.compressHTML = compressHTML;

    let compressCSS = () => {
        return src([`dev/css/*.css`,`dev/css/**/*.css`])
            .pipe(validateCSS({collapseWhitespace: true}))
            .pipe(dest(`prod/css`));
    }
    exports.compressCSS = compressCSS;

    let validateHTML = () => {
        return src([
            `dev/html/*.html`,
            `dev/html/**/*.html`])
            .pipe(htmlValidator(undefined));
    };
    exports.validateHTML = validateHTML;
    
    let transpileJSForDev = () => {
        return src(`dev/js/*.js`)
            .pipe(babel())
            .pipe(dest(`temp/js`));
    };
    exports.transpileJSForDev = transpileJSForDev;
    
    let transpileJSForProd = () => {
        return src(`dev/js/*.js`)
            .pipe(babel())
            .pipe(jsCompressor())
            .pipe(dest(`prod/js`));
    };
    exports.transpileJSForProd = transpileJSForProd;

    let validateJS = () => {
        return src([`dev/js/*.js`, `dev/js/**/*.js`])
            .pipe(jsLinter())
            .pipe(jsLinter.formatEach(`compact`));
    };
    exports.validateJS = validateJS;

    let lintJS = () => {
        return src(`dev/js/*.js`)
            .pipe(jsLinter())
            .pipe(jsLinter.formatEach(`compact`));
    };
    exports.lintJS = lintJS;

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `temp`,
                `dev`,
                `dev/html`,
                `dev/js`,
                `dev/css`
            ]
        }
    });

/*
testing
*/
    watch(`dev/js/*.js` ,series(lintJS, transpileJSForDev))
        .on(`change`, reload);

    watch(`dev/css/*.css`)
        .on(`change`, reload);

        .on(`change`, reload);

};
exports.chrome = series(chrome, serve);

exports.serve = series(
    validateHTML,
    validateJS,
    transpileJSForDev,
    serve
);
exports.build = series(
    compressHTML,
    compressCSS,
    transpileJSForProd,
);

exports.default = serve;