
app.controller('initiativeCtrl', function($scope, $modal, sapService, $window){
	$scope.open = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'views/initiative-add.html',
      controller: 'ModalInstanceCtrl',
      size: size
    });

    modalInstance.result.then(function (take_me_outside) {
      $scope.message = take_me_outside;
    });
  };	
	
  sapService.getInitiative(null, function(data){
    $scope.initiativeList = data;
  });

  $scope.populate = function(id) {
      sapService.getInitiative(id, function(data){
        console.log(data);
        $scope.initiative = data;
      });
    }

    $scope.delete = function(id, index) {
      if ($window.confirm("Confirm delete Initiative ?")) {
        sapService.deleteInitiative(id, function(data){
          
          var output={"status":"success","message":"Initiative Deleted Successfully"};
          //sapService.toast(output);
          $scope.initiativeList.splice(index, 1);          
        });
      }
      else{
        return false;
      }
    }


})