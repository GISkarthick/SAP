app.controller('userCtrl', function($scope, $modal, sapService, $window, toaster, $state){

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

app.controller('userAddCtrl', function($scope, $modal, sapService, $window, toaster, $state, $stateParams){

  $scope.id = $stateParams.id;

  $scope.populate = function(id) {
    sapService.getUser(id, null, function(data){
      $scope.user = data;
    });
  }

  $scope.update = function() {
    sapService.editUser($scope.user._id, {data : $scope.user}, function(data){
      toaster.pop({"type":"success","title":"User Updated Successfully"});
      $state.go('user-list');
    });
  }

  $scope.add = function() {
    sapService.addUser({data : $scope.user}, function(data){
      toaster.pop({"type":"success","title":"User Added Successfully"});
      $state.go('user-list');
    });
  }

  $scope.cancel = function() {
    $state.go('user-list');
  }

  if($scope.id){
    //Populate user
    $scope.populate($scope.id);
  }
  
})