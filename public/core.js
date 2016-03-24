
var controllers = angular.module('controllers', []);

var app = angular.module('app', ['ngRoute', 'controllers']);
app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/home', {
				templateUrl: 'home.html',
				controller: 'HomeController'
			}).
			when('/login', {
				templateUrl: 'login.html',
				controller: 'LoginController'
			}).
			otherwise({
				redirectTo: '/home'
			});
	}]);
app.run(function($rootScope, $location, AuthService){
	$rootScope.$on('$routeChangeStart', function(event){
		if(!AuthService.isLoggedIn()){
			//event.preventDefault();
			$location.path('/login');
		}else{
			$location.path('/home');
		}
	});
});

app.factory('AuthService', function($q, $timeout, $http){
	var user;
	return {
		login: function(username, password){
			var deferred = $q.defer();
			$http.post('/login', {
				username: username,
				password: password
			})
			.success(function(data, status){
				if(status == 200 && data.status){
					user = true;
					deferred.resolve();
				}else{
					user = false;
					deferred.reject();
				}
			})
			.error(function(data){
				user = false;
				deferred.reject();
			});

			return deferred.promise;
		},
		logout: function(){
			var deferred = $q.defer();
			$http.post('/logout')
			.success(function(data, status){
				user = false;
				deferred.resolve();
			})
			.error(function(data){
				user = false;
				deferred.reject();
			});

			return deferred.promise;

		},
		isLoggedIn: function(){
			return user || false;
		},
		getUserStatus: function(){
			return user;
		}
	}
});

app.controller('MainController', function($scope, $location, AuthService){

  $scope.$watch(AuthService.isLoggedIn, function (value, ovalue){

    if(!value && ovalue){
		console.log("Disconnect");
		$location.path('/login');
    }

    if(value){
      console.log("Connect");
    }

  }, true);

});

controllers.controller('HomeController', function($scope, $http){
    $scope.staff = {
    	loginTime: moment().format('MMM D,YY HH:mm:ss'),
    	name: '',
    	logout: function(){

    	}
    }
});

controllers.controller('LoginController', function($scope, $http, AuthService){

    $scope.staff = {
    	username: 'joe.liao@sleeep.io',
    	password: 'EXPerience',
    	login: function(){
			AuthService.login($scope.staff.username, $scope.staff.password);
		}
    };

});
