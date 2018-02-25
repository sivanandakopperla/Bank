
angular.module('cli2yang').factory('AuthInterceptor', function ($rootScope, $window, $location) {
  return {

      request: function (config) {
      config.headers = config.headers || {};
      if ($window.localStorage._SDtoken) {
        config.headers.Authorization = 'JWT ' + $window.localStorage._SDtoken;
      }
      alert(JSON.stringify(config));
      return config;
    },

    responseError: function (response) {
      if (response.status === 401) {
        $window.localStorage.removeItem('_SDtoken');
        $window.localStorage.removeItem('user_id');
        //$location.path('/login');
        return;
      }
    }
  };
});
