var App;
(function (App) {
    var Timetable;
    (function (Timetable) {
        var SidebarController = (function () {
            function SidebarController($scope) {
                //cheat
                $('#side-menu')['metisMenu']();
            }
            SidebarController.$inject = ["$scope"];
            return SidebarController;
        })();
        Timetable.SidebarController = SidebarController;
        // angular.module(App.Constants.AppName)
        angular.module("App").controller("App.Shared.SidebarController", SidebarController);
    })(Timetable = App.Timetable || (App.Timetable = {}));
})(App || (App = {}));

//# sourceMappingURL=../Shared/SidebarController.js.map