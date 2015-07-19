module App {
    import StateProvider = angular.ui.IStateProvider;
    import ProvideService = angular.auto.IProvideService;
    export class Routes {

        static $inject = ["$stateProvider", "$urlRouterProvider", "$provide", '$locationProvider'];
        static configureRoutes($stateProvider: StateProvider,
            $urlRouterProvider: angular.ui.IUrlRouterProvider,
            $provide: ProvideService,
            $locationProvider: ng.ILocationProvider) {

            $stateProvider
                .state('Default',
                {
                    url: '/',
                    views: {
                        'content': {
                            templateUrl: 'html/Timetable/Timetable.html',
                            controller: "App.Timetable.TimetableController"
                        }
                    }
                })
            ;


            $urlRouterProvider.otherwise('/');

            $locationProvider.html5Mode(true);
        }
    }
}



((): void => {
    var modules = ['ui.router'];//[, 'ngMaterial', 'ngMessages'];

    var app = angular.module("App", modules);
    app.config(App.Routes.configureRoutes);
   // app.run(App.Start.run);
})();