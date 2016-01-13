app.controller('officeCtrl', function($scope, $modal, sapService){
			 		  
	$scope.open = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'views/office-add.html',
      controller: 'ModalInstanceCtrl',
      size: size
    });

    modalInstance.result.then(function (take_me_outside) {
      $scope.message = take_me_outside;
    });
  	};

  	sapService.getOffice(function(data){
  		$scope.office = data;
  	});
	
	
})