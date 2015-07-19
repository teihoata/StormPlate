'use strict';
var GulpConfig = (function () {
    function GulpConfig(project, fs) {
        this.bowerPath = "./bower_components/";
        this.libPath = "./" + project.webroot + "/lib/";

        this.source = './';
        this.sourceApp = this.source + 'App/';

        this.tsOutputPath = this.source + '/wwwroot/js';
        this.allJavaScript = [this.source + '/wwwroot/js/**/*.js'];
        this.allTypeScript = this.sourceApp + '/**/*.ts';

        this.typings = './typings/';
        this.libraryTypeScriptDefinitions = './typings/**/*.ts';
        this.appTypeScriptReferences = this.typings + 'tsd.d.ts';

        this.allHtml = this.sourceApp + '/**/*.html';
        this.allHtmlOutput = this.source + '/wwwroot/html';
        this.htmlCacheFile = this.tsOutputPath + '/test.js';
    }
    return GulpConfig;
})();
module.exports = GulpConfig;