module App.Timetable {
    export class SidebarController {

        static $inject = ["$scope"];
        constructor($scope: ng.IScope) {
            //cheat
            $('#side-menu')['metisMenu']();
        }
    }

    // angular.module(App.Constants.AppName)
    angular.module("App")
        .controller("App.Shared.SidebarController", SidebarController);
}