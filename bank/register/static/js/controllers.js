

var data = [];
function MainCtrl($scope,$http,$state,$stateParams,$window,$filter,$timeout,AuthInterceptor,userService) {

    this.userName = 'Bank';
    this.helloText = 'Welcome';
    this.descriptionText = 'Test';
  $scope.devproflist = {};
	$scope.datas = 'data'; 
	$scope.trig={};
	$scope.stat='';
  $scope.user_name=$window.localStorage.username;
  $scope.uid = $window.localStorage.user_id; 
    $scope.trigresp=' ';
    $scope.user = userService;
  $scope.testproduct = {};

  $scope.select = function() {
        $scope.devproflist  = $scope.selectedItem;  
    };




    //generate request schema for excel sheet

	$scope.excel = function(){

	$state.transitionTo($state.current, $stateParams, {
		reload: true,
		inherit: false,
		notify: true
	});
    var request = $http({
                method: "post",
                url: "/xls/"+ $scope.uid+"/",
                data: "json",
				        responseType: 'arraybuffer',
                headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                         }
				
            });
     request.success(function(data, status, headers, config) {
			 var blob = new Blob([data], {type: 'application/vnd.ms-excel'});
			 var objectUrl = URL.createObjectURL(blob);
			 $window.open(objectUrl);
			 //saveAs(blob, 'File_Name_With_Some_Unique_Id_Time' + '.xlsx');	
            });
            request.error(function(response){
            });
	};



// register function here
  $scope.reg={}
  $scope.reglog = '';
  $scope.registerfunc = function(){
   
    params=$scope.reg;
  $state.transitionTo($state.current, $stateParams, {
    reload: true,
    inherit: false,
    notify: true
  });
    var request = $http({
                method: "post",
                url: 'register/',
                data: "data="+JSON.stringify(params),
                headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
            });
     request.success(function(data, status, headers, config) {

        $scope.reglog=data.status;


        
            });
            request.error(function(response){
                
            });
  };

// login function here
  $scope.login={}
  $scope.loginres = '';
  $scope.loginfunc = function(){
    params=$scope.login;
    var user=params.userid
    var pass=params.passwd
    var url1 = 'api-token-auth/'
    // var url = '/'+ endpoint
    var params = {username: user , password:pass}

    var request = $http.post(url1, 'username=' + user + '&password=' + pass, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

      request.success(function (response,data,config) {

     
        var token = response.token;
        var user_data =(JSON.parse($window.atob(token.split('.')[1].replace('-', '+').replace('_', '/'))))
        var username=user_data.username
        var user_id=user_data.user_id


        if (token && user) {

          $window.localStorage._SDtoken = token;
          $window.localStorage.username = username;
          $window.localStorage.user_id = user_id;
          $window.localStorage.trigloc = 1;

          $scope.regstat='registered  successfully';
        } else {
          $scope.regstat='Invalid data received from server';
        }
          $scope.token = $window.localStorage._SDtoken;
          $scope.user_id = $window.localStorage.user_id;
          $scope.user_name=$window.localStorage.username;
          //user.id = $window.localStorage.user_id

          

                //get device profile functions
          //get tmpnorpcdata


          $window.location = '/homepage';
            });
            request.error(function(response,data,status){

                $scope.loginres = response.non_field_errors[0]
            });
  };




//create dev profile
  $scope.devprof={}
  $scope.devprofresp = '';
  $scope.createDevprof = function(){
    params=$scope.devprof;

  $state.transitionTo($state.current, $stateParams, {
    reload: true,
    inherit: false,
    notify: true
  });
    var request = $http({
                method: "post",
                url: 'createdev/',
                data: "data="+JSON.stringify(params),
                headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
            });
     request.success(function(data, status, headers, config) {

      $scope.showcreatemsg = true;
        $scope.devprofresp =data.status;

        $timeout(function(){
          $scope.showcreatemsg = false;
       }, 3000);
        
            });
            request.error(function(response){
 
            });
  };

//edit dev profile
  $scope.editdevprofresp = '';
  $scope.editdev = function(){
    params=$scope.devproflist;

  $state.transitionTo($state.current, $stateParams, {
    reload: true,
    inherit: false,
    notify: true
  });
    var request = $http({
                method: "post",
                url: 'editdev/',
                data: "data="+JSON.stringify(params),
                headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
            });
     request.success(function(data, status, headers, config) {

       $scope.showeditmsg = true;
       $scope.editdevprofresp =data.status;
        $timeout(function(){
          $scope.showeditmsg = false;
       }, 3000);

        
            });
            request.error(function(response){
            });
  };

//log out function below

            $scope.logout = function(){
                /* var params = {};
                 dataService.post("/logout/", params).then(function(data){
                 if(data.message=="success"){
                 $window.localStorage.removeItem('_SDtoken');
                 $window.location = '/';
                 }
                 }
                 );*/
                $window.localStorage.removeItem('_SDtoken');
                $window.localStorage.removeItem('user_id');
                $window.localStorage.removeItem('trgid');
                $window.localStorage.removeItem('trigloc');

                $window.localStorage.removeItem('$scope.userd_d1.first_name');
                $window.localStorage.removeItem('$scope.userd_d1.last_name');
                $window.localStorage.removeItem('$scope.userd_d1.mobile_no');
                $window.localStorage.removeItem('$scope.userd_d1.hometown');
                $window.location = '/';
            }




    //get log data
    $scope.logdata=''
    $scope.logfunc = function(){
      var logurl = "/log/"+ $scope.uid+"/"
    $http.get(logurl, 'GET').success(function(data, status, headers, config) {
             $scope.logdata = data;
          }).
          error(function(data, status, headers, config) {
          });
    };


//admin 

    $scope.profile = function(){
      $window.open('/admin');

    };

//devprofile 

    $scope.devprofile = function(){
      $window.open('/devprofile');

    };

    //hide profile data
    $scope.IsHiddenrpc = true;
    $scope.ShowHiderpc = function () {
        //If DIV is hidden it will be visible and vice versa.
        $scope.IsHiddenrpc = $scope.IsHiddenrpc ? false : true;
    }

    //hide Account details data
    $scope.IsHiddenrpc1 = true;
    $scope.ShowHiderpc1 = function () {
        //If DIV is hidden it will be visible and vice versa.
        $scope.IsHiddenrpc1 = $scope.IsHiddenrpc1 ? false : true;
    }

//
// get profile data
    $scope.u_data = 'data';
  $scope.cxrnorpcfunc = function(AuthInterceptor){

    var cxrnorpcurl = "/userd/"+ $window.localStorage.user_id+"/"
    $http.get(cxrnorpcurl, 'GET',{
            headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }

    }



    ).success(function(data, status, headers, config) {
            $scope.u_data = data;
             $scope.u_data1 = $scope.u_data.data[0]
             $scope.u_data2 = $scope.u_data.data1[0]

      }).
      error(function(data, status, headers, config) {
      });
  };
	
// get Account data
    $scope.acc_data = 'data';
  $scope.getAccountfunc = function(AuthInterceptor){

    var cxrnorpcurl = "/getAccount/"
    $http.get(cxrnorpcurl, 'GET',{
            headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }

    }



    ).success(function(data, status, headers, config) {
            console.log(data)
            $scope.acc_data = data.data;
            console.log($scope.acc_data.data[0].account_no)

      }).
      error(function(data, status, headers, config) {
      });
  };
//Add Account Details

  $scope.Accprof={}
  $scope.Accdevprofresp = '';
  $scope.createAccprof = function(){
    params1=$scope.Accprof;

  $state.transitionTo($state.current, $stateParams, {
    reload: true,
    inherit: false,
    notify: true
  });
    var request = $http({
                method: "post",
                url: '/createAcc/',
                data: "data="+JSON.stringify(params1),
                headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
            });
     request.success(function(data, status, headers, config) {

      $scope.showcreatemsg = true;
        $scope.Accdevprofresp =data.status;

        $timeout(function(){
          $scope.showcreatemsg = false;
       }, 3000);
        
            });
            request.error(function(response){
 
            });
  };

//Delete Account Details

  $scope.DeleteAccprof={}
  $scope.DeleteAccdevprofresp = '';
  $scope.deleteAccprof = function(){
    params2=$scope.DeleteAccprof;

  $state.transitionTo($state.current, $stateParams, {
    reload: true,
    inherit: false,
    notify: true
  });
    var request = $http({
                method: "post",
                url: '/deleteAcc/',
                data: "data="+JSON.stringify(params2),
                headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
            });
     request.success(function(data, status, headers, config) {

      $scope.showcreatemsg = true;
        $scope.DeleteAccdevprofresp =data.status;

        $timeout(function(){
          $scope.showcreatemsg = false;
       }, 3000);
        
            });
            request.error(function(response){
 
            });
  };

};

function AuthInterceptor($rootScope,$q, $window, $location) {
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
      return $q.reject(response);
    }
  };
};
AuthInterceptor();



//service restore

angular.module('cli2yang').factory('userService', ['$rootScope', function ($rootScope) {

    var service = {






        SaveState: function () {
            sessionStorage.userService = angular.toJson(service.model);
        },

        RestoreState: function () {
            service.model = angular.fromJson(sessionStorage.userService);
        }
    }

    $rootScope.$on("savestate", service.SaveState);
    $rootScope.$on("restorestate", service.RestoreState);

    return service;
}]);



function dashcontroler($scope,$http,$state,$stateParams,$window,$filter,AuthInterceptor,userService) {


  $scope.trig={};
  $scope.stat='';

  $scope.dashselect = function() {
    };


$scope.doSomething = function(){


    if ($window.localStorage.trgid == 1){


    
       }




};
  $scope.trigger = function(){

    $window.localStorage.trgid = 1;

    

    $scope.trig.uid = $scope.uid
    $scope.trig.devprofile = $scope.selectedItem.profilename

    params=$scope.trig;
    var request = $http({
                method: "post",
                // url: 'http://127.0.0.1:8001/trigger',
                url: '/trigger',
                data: "data="+JSON.stringify(params),
                headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
            });
     request.success(function(data, status, headers, config) {

        // $window.localStorage.trgid = 0;
         // $("div#logid").show();
         // $("div#loading").hide()

        $scope.trigresp = data
    $scope.stat='Trigger finished. Please Check below logs';
            });
            request.error(function(response){

            });

  };






}


angular
    .module('cli2yang')
    .controller('MainCtrl', MainCtrl)
    .controller('dashcontroler',dashcontroler)
    .factory('AuthInterceptor',AuthInterceptor)