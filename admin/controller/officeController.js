app.controller('officeCtrl', function($scope, $modal, sapService, $window){
			 		  
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

  	sapService.getOffice(null, function(data){
  		$scope.officeList = data;
  	});

    $scope.populate = function(id) {
      sapService.getOffice(id, function(data){
        console.log(data);
        $scope.office = data;
      });
    }

    $scope.delete = function(id, index) {
      if ($window.confirm("Confirm delete Office ?")) {
        sapService.deleteOffice(id, function(data){
          
          var output={"status":"success","message":"Office Deleted Successfully"};
          //sapService.toast(output);
          $scope.officeList.splice(index, 1);          
        });
      }
      else{
        return false;
      }
    }


	
	
})