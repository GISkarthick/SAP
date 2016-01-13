
app.controller('initiativeCtrl', function($scope, $modal, sapService){
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
	
  sapService.getInitiative(function(data){
    $scope.initiative = data;
  });

})