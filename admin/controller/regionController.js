
app.controller('regionCtrl', function($scope, $modal, sapService){
	$scope.open = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'views/region-add.html',
      controller: 'ModalInstanceCtrl',
      size: size
    });

    modalInstance.result.then(function (take_me_outside) {
      $scope.message = take_me_outside;
    });
  };

	sapService.getRegion(function(data){
    $scope.region = data;
  });
	
})