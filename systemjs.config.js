/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'client':                     'client', // 'dist',
    '@angular':                   'node_modules/@angular',
    'jquery':                     'node_modules/jquery',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs',
    'socket.io':                  'node_modules/socket.io',
    'express':                    'node_modules/express',
    'angular2-highcharts':        'node_modules/@angular2-highcharts',
    'highcharts/highstock.src':   'node_modules/highcharts/highstock.js',
    'highcharts/highcharts-more.js':'node_modules/highcharts/highcharts-more.js',
    'highcharts/js/modules/solid-gauge.js' : 'node_modules/highcharts/js/modules/solid-gauge.js', 
    'ng2-charts':                 'node_modules/ng2-charts',
    'chart.js':                   'node_modules/chart.js/src',
    'chartjs-color':              'node_modules/chartjs-color',
    'color-convert':              'node_modules/color-convert',
    'color-name':                 'node_modules/color-name',
    'chartjs-color-string':       'node_modules/chartjs-color-string',
    'moment':                     'node_modules/moment/src'
};

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'client':                     { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    'angular2-highcharts':        { main: 'index.js',defaultExtension: 'js'},
    'ng2-charts':                 { main: 'ng2-charts.js',defaultExtension: 'js'},
    'chart.js':                   { main: 'chart.js',defaultExtension: 'js'},
    'chartjs-color':              { main: 'index.js',defaultExtension: 'js'},
    'color-convert':              { main: 'index.js',defaultExtension: 'js'},
    'color-name':                 { main: 'index.js',defaultExtension: 'js'},
    'chartjs-color-string':       { main: 'color-string.js',defaultExtension: 'js'},
    'moment':                     { main: 'moment.js',defaultExtension: 'js'},

  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  var config = {
    map: map,
    packages: packages
  };
  System.config(config);
})(this);
