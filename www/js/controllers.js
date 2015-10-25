angular.module('starter')

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.controller('DashboardCtrl', function($scope) {
  var vm = this;
  angular.extend(vm, {
    bags: [
      {
        id: 1,
        title: 'Target',
        status: 'pending'
      },
      {
        id: 1,
        title: 'Best Buy',
        status: 'picked'
      }
    ]
  })
})
.controller('BagsCtrl', function($scope, $state, Bags, BagFire) {
  var vm = this,
    currentBags = Bags('/');

    angular.extend(vm, {
      currentBags: Bags('/'),
      bagContents: Bags('bestbuy/2ac65183-3693-4086-8697-f68c3f2ccac5'),
      pickup: function() {
        $state.go('app.pickup')
      }
    });
    vm.currentBags.$loaded(function(data) {
      vm.items = data[0]['2ac65183-3693-4086-8697-f68c3f2ccac5'];
    })
    // console.log(vm.currentBags[0]);
})
.controller('ShopCtrl', function($scope, storeData) {
  var vm = this;
  angular.extend(vm, {
    stores: storeData
  })
})
.controller('StoreCtrl', function($scope, $state, productsData, Products) {
  var vm = this;
  angular.extend(vm, {
    title: 'Best Buy',
    products: productsData.data.products,
    productsFire: Products('bestbuy'),
    addToCart: function(product) {
      vm.productsFire.$add(product);
    },
    checkout: function() {
      $state.go('app.bag');
    }
  })
})
.controller('BagCtrl', function($scope, $state, Products, Bags, BagsUpdate) {
  var vm = this;
  angular.extend(vm, {
    title: 'Best Buy',
    products: Products('bestbuy'),
    showCancel: false,
    cancel: function() {
      vm.showCancel = false;
    },
    destroy: function() {
      $state.go('app.dashboard');
    },
    request: function() {
      var accountId = '2ac65183-3693-4086-8697-f68c3f2ccac5',
        bag = {};
      bag.status = 'pending';
      bag.items = vm.products;
      BagsUpdate('bestbuy/' + accountId + '/status', bag.status);
      BagsUpdate('bestbuy/' + accountId + '/items', bag.items);
      $state.go('app.coin');
      vm.showCancel = true;
    }
  })
})
.controller('CoinCtrl', function($state, CoinService) {
  var vm = this;
  angular.extend(vm, {
    model: {},
    fields: [
      {
        key: 'phone',
        type: 'maskedInput',
        id: 'phone',
        templateOptions: {
          type: 'text',
          label: 'Phone Number',
          mask: '(999) 999-9999',
          icon: "ion-iphone",
          iconPlaceholder: true,
          required: true
        }
      },
      {
        key: 'pwd',
        type: 'input',
        id: 'pwd',
        templateOptions: {
          type: 'password',
          label: 'Password',
          placeholder: 'Password',
          icon: "ion-lock-combination",
          iconPlaceholder: true,
          required: true
        }
      },
      {
        key: 'email',
        type: 'input',
        id: 'email',
        templateOptions: {
          type: 'email',
          label: 'Email',
          placeholder: 'Email',
          icon: "ion-email",
          iconPlaceholder: true
        }
      }
    ],
    submit: function() {

    }
  })
})
.controller('RegisterCtrl', function($state, UserService, Users) {
  var vm = this;
  angular.extend(vm, {
    model: {},
    fields: [
      {
        key: 'phone',
        type: 'maskedInput',
        id: 'phone',
        templateOptions: {
          type: 'text',
          label: 'Phone Number',
          mask: '(999) 999-9999',
          icon: "ion-iphone",
          iconPlaceholder: true,
          required: true
        }
      },
      {
        key: 'pwd',
        type: 'input',
        id: 'pwd',
        templateOptions: {
          type: 'password',
          label: 'Password',
          placeholder: 'Password',
          icon: "ion-lock-combination",
          iconPlaceholder: true,
          required: true
        }
      },
      {
        key: 'email',
        type: 'input',
        id: 'email',
        templateOptions: {
          type: 'email',
          label: 'Email',
          placeholder: 'Email',
          icon: "ion-email",
          iconPlaceholder: true
        }
      }
    ],
    submit: function() {
      UserService.register(vm.model).then(function(data) {
        if(data.data.status_code === 1) {

          var phoneNumber = vm.model.phone,
            resData = data.data.response_data,
            fireUser = {};
          angular.extend(vm.model, data.data.response_data);
          fireUser = vm.model;
          Users(phoneNumber).$add(fireUser);
          $state.go('app.registerCard', {
            accountId: resData.account_id
          });
        }
      });
    }
  })
})

.controller('CardCtrl', function(CardService, DMS, User, $stateParams) {
  var vm = this;
  angular.extend(vm, {
    model: {},
    fields: [
      {
        key: 'card_number',
        type: 'maskedInput',
        id: 'card_number',
        templateOptions: {
          type: 'text',
          label: 'Card Number',
          mask: '9999 9999 9999 9999',
          icon: "ion-card",
          iconPlaceholder: true,
          required: true
        }
      },
      {
        key: 'card_security',
        type: 'maskedInput',
        id: 'card_security',
        templateOptions: {
          type: 'text',
          label: 'CVVS',
          mask: '999',
          icon: "ion-lock-combination",
          iconPlaceholder: true,
          required: true
        }
      },
      {
        key: 'expiry',
        type: 'input',
        id: 'expiry',
        templateOptions: {
          type: 'text',
          label: 'Expiry',
          icon: 'ion-calendar',
          placeholder: 'Expiry',
          iconPlaceholder: true,
          required: true
        }
      },
      {
        key: 'zip_code',
        type: 'input',
        id: 'zip_code',
        templateOptions: {
          type: 'text',
          label: 'Zip Code',
          icon: 'ion-location',
          placeholder: 'Zip Code',
          iconPlaceholder: true,
          required: true
        }
      }
    ],
    submit: function() {
      angular.extend(vm.model, {
        account_id: $stateParams.accountId
      });
      CardService.add(vm.model).then(function(data) {
        if(data.data.status_code === 1) {
          $state.go('app.dashboard');
        }
      });
    }
  });

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});