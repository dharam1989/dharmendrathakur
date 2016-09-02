//home page ctlr
app.controller('homepagecontroller', function ($scope,$rootScope, $timeout, ngProgressFactory) {
  $scope.progressbar = ngProgressFactory.createInstance();
 // $scope.progressbar.setHeight('5px');
  $scope.progressbar.setColor('#FF0000');
  $scope.progressbar.start();
  $scope.status = $scope.progressbar.status();
  $scope.myInterval = 3000;
  $rootScope.show =false;
  $scope.slides = [
                  {
                    image: 'http://lorempixel.com/1920/1080/city'
                  },
                  {
                    image: 'http://lorempixel.com/1920/1080/transport'
                  },
                  {
                    image: 'http://lorempixel.com/1920/1080/animals'
                  },
                  {
                    image: 'http://lorempixel.com/1920/1080/people'
                  }
                ];
  
  $timeout(function(){
           $rootScope.show =true;
           $scope.progressbar.complete()}, 2000);
});

/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function ($rootScope/* $scope, $location, $http */) {
  console.log("Blog Controller reporting for duty.");
  $rootScope.show =true;
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function ($rootScope/* $scope, $location, $http */) {
  $rootScope.show =true;
  
});


app.controller('leftNavcontroller', function ($scope) {
   $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };
});
