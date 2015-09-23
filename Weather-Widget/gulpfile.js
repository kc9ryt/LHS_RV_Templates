/* jshint node: true */

(function () {
  "use strict";


  var bump = require("gulp-bump");
  var del = require("del");
  var factory = require("widget-tester").gulpTaskFactory;
  var gulp = require("gulp");
  var gutil = require("gulp-util");
  var jshint = require("gulp-jshint");
  var minifyCSS = require("gulp-minify-css");
  var path = require("path");
  var rename = require("gulp-rename");
  var runSequence = require("run-sequence");
  var sourcemaps = require("gulp-sourcemaps");
  var uglify = require("gulp-uglify");
  var usemin = require("gulp-usemin");

  var appJSFiles = [
    "src/**/*.js",
    "!./src/components/**/*"
  ];

  gulp.task("clean", function (cb) {
    del(["./dist/**"], cb);
  });

  gulp.task("config", function() {
    var env = process.env.NODE_ENV || "dev";
    gutil.log("Environment is", env);

    return gulp.src(["./src/config/" + env + ".js"])
      .pipe(rename("config.js"))
      .pipe(gulp.dest("./src/config"));
  });

  gulp.task("bump", function(){
    return gulp.src(["./package.json", "./bower.json"])
      .pipe(bump({type:"patch"}))
      .pipe(gulp.dest("./"));
  });

  gulp.task("lint", function() {
    return gulp.src(appJSFiles)
      .pipe(jshint())
      .pipe(jshint.reporter("jshint-stylish"))
      .pipe(jshint.reporter("fail"));
  });

  gulp.task("source", ["lint"], function () {
    return gulp.src(["./src/settings.html", "./src/current.html",
      "./src/three-day.html", "./src/current-and-three-day.html"])
      .pipe(usemin({
        css: [sourcemaps.init(), minifyCSS(), sourcemaps.write()],
        js: [sourcemaps.init(), uglify(), sourcemaps.write()]
      }))
      .pipe(gulp.dest("dist/"));
  });

  gulp.task("unminify", function () {
    return gulp.src(["./src/settings.html", "./src/current.html",
      "./src/three-day.html", "./src/current-and-three-day.html"])
      .pipe(usemin({
        css: [rename(function (path) {
          path.basename = path.basename.substring(0, path.basename.indexOf(".min"))
        }), gulp.dest("dist")],
        js: [rename(function (path) {
          path.basename = path.basename.substring(0, path.basename.indexOf(".min"))
        }), gulp.dest("dist")]
      }))
  });

  gulp.task("fonts", function() {
    return gulp.src("src/components/common-style/dist/fonts/**/*")
      .pipe(gulp.dest("dist/fonts"));
  });

  gulp.task("images", function() {
    return gulp.src(["src/components/rv-bootstrap-formhelpers/img/bootstrap-formhelpers-googlefonts.png", "src/img/**/*"])
      .pipe(gulp.dest("dist/img"));
  });

  gulp.task("i18n", function(cb) {
    return gulp.src(["src/components/rv-common-i18n/dist/locales/**/*"])
      .pipe(gulp.dest("src/locales"))
      .pipe(gulp.dest("dist/locales"));
  })

  gulp.task("watch",function(){
    gulp.watch("./src/**/*", ["build"]);
  });

  gulp.task("webdriver_update", factory.webdriveUpdate());

  // e2e testing
  gulp.task("html:e2e", factory.htmlE2E({
    files: ["./src/settings.html", "./src/current.html", "./src/three-day.html",
      "./src/current-and-three-day.html"],
    e2eWeather: ["../node_modules/widget-tester/mocks/gadgets.io-mock.js", "../test/data/weather-api-mock-data.js"],
    e2eCurrent: "../test/data/current-mock-data.js",
    e2eThreeDay: "../test/data/three-day-mock-data.js",
    e2eCurrentAndThreeDay: "../test/data/current-and-three-day-mock-data.js",
  }));

  gulp.task("e2e:server", ["config", "html:e2e"], factory.testServer());

  gulp.task("test:e2e:settings", ["webdriver_update"], factory.testE2EAngular({
    testFiles: "test/e2e/settings-scenarios.js"
  }));

  gulp.task("test:e2e:current", factory.testE2E({
    testFiles: "test/e2e/current-scenarios.js"
  }));

  gulp.task("test:e2e:three-day", factory.testE2E({
    testFiles: "test/e2e/three-day-scenarios.js"
  }));

  gulp.task("test:e2e:current-and-three-day", factory.testE2E({
    testFiles: "test/e2e/current-and-three-day-scenarios.js"
  }));

  gulp.task("e2e:server-close", factory.testServerClose());

  gulp.task("test:e2e", function(cb) {
    runSequence(["html:e2e", "e2e:server"], "test:e2e:settings", "test:e2e:current", "test:e2e:three-day", "test:e2e:current-and-three-day", "e2e:server-close", cb);
  });

  // Unit testing
  gulp.task("test:unit:settings", factory.testUnitAngular({
    testFiles: [
      "src/components/jquery/dist/jquery.js",
      "src/components/q/q.js",
      "src/components/angular/angular.js",
      "src/components/angular-translate/angular-translate.js",
      "src/components/angular-translate-loader-static-files/angular-translate-loader-static-files.js",
      "src/components/angular-route/angular-route.js",
      "src/components/angular-mocks/angular-mocks.js",
      "node_modules/widget-tester/mocks/common-mock.js",
      "src/components/bootstrap-sass-official/assets/javascripts/bootstrap.js",
      "src/components/angular-bootstrap/ui-bootstrap-tpls.js",
      "src/components/rv-common-i18n/dist/i18n.js",
      "src/components/component-storage-selector/dist/storage-selector.js",
      "src/components/widget-settings-ui-components/dist/js/**/*.js",
      "src/components/widget-settings-ui-core/dist/*.js",
      "src/components/bootstrap-form-components/dist/js/**/*.js",
      "src/config/test.js",
      "src/settings/settings-app.js",
      "src/settings/**/*.js",
      "test/unit/settings/**/*spec.js"]
    }
  ));

gulp.task("test:unit:widget", factory.testUnitAngular({
    testFiles: [
      "node_modules/widget-tester/mocks/gadget-mocks.js",
      "node_modules/widget-tester/mocks/gadgets.io-mock.js",
      "node_modules/widget-tester/mocks/geolocation-mock.js",
      "test/data/current-mock-data.js",
      "test/data/weather-api-mock-data.js",
      "src/components/jquery/dist/jquery.js",
      "src/components/widget-common/dist/common.js",
      "src/components/i18next/i18next.js",
      "src/config/test.js",
      "src/widget/weather.js",
      "src/widget/provider.js",
      "src/widget/geolocation.js",
      "src/widget/display-address.js",
      "src/widget/custom-address.js",
      "src/widget/main.js",
      "test/unit/widget/**/*spec.js"
    ]
  }));

  gulp.task("test:unit", function(cb) {
    runSequence("test:unit:settings", "test:unit:widget", cb);
  });

  // Need to build before running tests in order to get translations to work.
  gulp.task("test", function(cb) {
    runSequence("build", "test:e2e", "test:unit", cb);
  });

  gulp.task("build", function (cb) {
    runSequence(["clean", "config"], ["source", "fonts", "images", "i18n"], ["unminify"], cb);
  });

  gulp.task("default", function(cb) {
    runSequence("test", "build", cb);
  });
})();
