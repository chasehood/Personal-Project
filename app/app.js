angular.module('tacoShopSanMarcos', ['ui.router'])

    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.when('', '/')

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: "./views/home.html",
                controller: 'mainCtrl'
            })
            .state('menu', {
                url: '/menu',
                templateUrl: "./views/menu.html"
            })
            .state('catering', {
                url: '/catering',
                templateUrl: "./views/catering.html"
            })
            .state('admin', {
                url: '/admin',
                templateUrl: './views/admin.html',
                controller: 'adminCtrl'
            })
    })