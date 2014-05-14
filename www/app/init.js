angular.module('app', [
  'ui.router',
  'hoodie',
  'app.router'
]);

angular.module('app.router', [])
.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('index', {
    url: '/',
    views: {
      header: {},
      main: {},
      footer: {}
    }
  });

});

