var App;
(function (App) {
    var Routes = (function () {
        function Routes() {
        }
        Routes.configureRoutes = function ($stateProvider, $urlRouterProvider, $provide, $locationProvider) {
            $stateProvider.state('Default', {
                url: '/',
                views: {
                    'content': {
                        templateUrl: 'html/Timetable/Timetable.html',
                        controller: "App.Timetable.TimetableController"
                    }
                }
            });
            $urlRouterProvider.otherwise('/');
            $locationProvider.html5Mode(true);
        };
        Routes.$inject = ["$stateProvider", "$urlRouterProvider", "$provide", '$locationProvider'];
        return Routes;
    })();
    App.Routes = Routes;
})(App || (App = {}));
(function () {
    var modules = ['ui.router']; //[, 'ngMaterial', 'ngMessages'];
    var app = angular.module("App", modules);
    app.config(App.Routes.configureRoutes);
    // app.run(App.Start.run);
})();

//# sourceMappingURL=App.module.js.map