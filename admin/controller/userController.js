app.controller('userCtrl', function($scope, $modal, sapService, $window, toaster){

  $scope.listUser = function (){
  	sapService.getUser(null, $scope.searchName, function(data){
  		$scope.userList = data;
  	});
  }

  $scope.delete = function(id, index) {
    if ($window.confirm("Confirm delete User ?")) {
      sapService.deleteUser(id, function(data){
        
        toaster.pop({"type":"success","title":"User Deleted Successfully"});
        $scope.userList.splice(index, 1);          
      });
    }
    else{
      return false;
    }
  }

  //List all Region
  $scope.listUser();
	
})

app.controller('userAddCtrl', function($scope, $modal, sapService, $window, toaster){

  $scope.populate = function(id) {
    sapService.getUser(id, function(data){
      console.log(data);
      $scope.user = data;
    });
  }

  $scope.add = function() {
    sapService.addUser({data : $scope.user}, function(data){
      console.log(data);
      toaster.pop({"type":"success","title":"User Added Successfully"});
    });
  }

  $scope.cancel = function() {
    console.log('test cancel');
  }
  
})