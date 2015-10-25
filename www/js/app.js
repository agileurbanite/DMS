// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'formlyIonic', 'firebase', 'ui.mask'])

.run(function($ionicPlatform, formlyConfig) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  formlyConfig.setType({
    name: 'maskedInput',
    extends: 'input',
    template: '<label class="item item-input"><i class="icon {{options.templateOptions.icon}}" ng-if="options.templateOptions.icon" ng-class="{\'placeholder-icon\': options.templateOptions.iconPlaceholder}"></i><input ng-model="model[options.key]" /></label>',
    defaultOptions: {
      ngModelAttrs: {
        mask: {
          attribute: 'ui-mask'
        },
        maskPlaceholder: {
          attribute: 'ui-mask-placeholder'
        }
      },
      templateOptions: {
        maskPlaceholder: ''
      }
    }
  });
})
.constant('DMS', {
  'baseUrl': 'http://localhost:3000',
  'firebaseUrl': 'https://dmasolid.firebaseio.com'
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.register', {
    url: '/register',
    views: {
      'menuContent': {
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl as register'
      }
    }
  })
  .state('app.registerCard', {
    url: '/card/:accountId',
    views: {
      'menuContent': {
        templateUrl: 'templates/register-card.html',
        controller: 'CardCtrl as card'
      }
    }
  })
  .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html',
        controller: 'DashboardCtrl as dashboard'
      }
    }
  })

  .state('app.bags', {
    url: '/bags',
    views: {
      'menuContent': {
        templateUrl: 'templates/bags.html',
        controller: 'BagsCtrl as bags'
      }
    }
  })
  .state('app.coin', {
    url: '/coin',
    views: {
      'menuContent': {
        templateUrl: 'templates/coin.html',
        controller: 'CoinCtrl as coin'
      }
    }
  })

  .state('app.pickup', {
    url: '/pickup',
    views: {
      'menuContent': {
        templateUrl: 'templates/pickup.html',
        controller: 'PickupCtrl as pickup'
      }
    }
  })

  .state('app.stores', {
    url: '/stores',
    views: {
      'menuContent': {
        templateUrl: 'templates/shop.html',
        controller: 'ShopCtrl as shop'
      }
    },
    resolve: {
      storeData: function(StoresService, $stateParams) {
        return StoresService.getList($stateParams.storeId);
      }
    }
  })

  .state('app.store', {
    url: '/stores/:storeId',
    views: {
      'menuContent': {
        templateUrl: 'templates/store.html',
        controller: 'StoreCtrl as store'
      }
    },
    resolve: {
      productsData: function(StoresService) {
        return StoresService.getProducts();
      }
    }
  })

  .state('app.bag', {
    url: '/bag',
    views: {
      'menuContent': {
        templateUrl: 'templates/bag.html',
        controller: 'BagCtrl as bag'
      }
    }
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/dashboard');
});
