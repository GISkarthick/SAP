app.controller('userCtrl', function($scope, $modal, sapService, $window, toaster){
			 		  
	$scope.open = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'views/user-add.html',
      controller: 'ModalInstanceCtrl',
      size: size
    });

    modalInstance.result.then(function (take_me_outside) {
      $scope.message = take_me_outside;
    });
  	};

  	sapService.getUser(null, function(data){
  		$scope.userList = data;
  	});

    $scope.populate = function(id) {
      sapService.getUser(id, function(data){
        console.log(data);
        $scope.user = data;
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


	
	
})