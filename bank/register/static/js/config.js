
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/index/dashboard");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });



    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "/static/views/common/content.html",
        })
        .state('index.norpc', {
            url: "/norpc",
            templateUrl: "/static/views/norpc.html",
            data: { pageTitle: 'Python Project' }
        })

        .state('index.schema', {
            url: "/schema",
            templateUrl: "/static/views/schema.html",
            data: { pageTitle: 'Test' }
        })
        .state('index.dashboard', {
            url: "/dashboard",
            templateUrl: "/static/views/dashboard.html",
            data: { pageTitle: 'dashboard' }
        })
        .state('index.cxrnorpc', {
            url: "/cxrnorpc",
            templateUrl: "/static/views/cxrnorpc.html",
            data: { pageTitle: 'test1' }
        })
        .state('index.cxrschema', {
            url: "/cxrschema",
            templateUrl: "/static/views/cxrschema.html",
            data: { pageTitle: 'test2' }
        })
        .state('index.ncs5knorpc', {
            url: "/ncs5knorpc",
            templateUrl: "/static/views/ncs5knorpc.html",
            data: { pageTitle: 'test3' }
        })
        .state('index.ncs5kschema', {
            url: "/ncs5kschema",
            templateUrl: "/static/views/ncs5kschema.html",
            data: { pageTitle: 'test4' }
        })
        .state('index.fretncs5500norpc', {
            url: "/fretncs5500norpc",
            templateUrl: "/static/views/fretncs5500norpc.html",
            data: { pageTitle: 'test5' }
        })
        .state('index.fretncs5500schema', {
            url: "/fretncs5500schema",
            templateUrl: "/static/views/fretncs5500schema.html",
            data: { pageTitle: 'test6' }
        })
}
angular
    .module('cli2yang')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
    if (sessionStorage.restorestate == "true") {
        $rootScope.$broadcast('restorestate'); //let everything know we need to restore state
        sessionStorage.restorestate = false;
    }
});

//let everthing know that we need to save state now.
window.onbeforeunload = function (event) {
    $rootScope.$broadcast('savestate');
};


    });




