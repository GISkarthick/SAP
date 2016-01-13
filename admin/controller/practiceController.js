
app.controller('practiceCtrl', function($scope, $modal, sapService){
	$scope.open = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'views/practice-add.html',
      controller: 'ModalInstanceCtrl',
      size: size
    });

    modalInstance.result.then(function (take_me_outside) {
      $scope.message = take_me_outside;
    });
  };	
	
  sapService.getPractice(function(data){
    $scope.practice = data;
  });

	
})