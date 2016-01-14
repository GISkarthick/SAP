app.controller('officeCtrl', function($scope, $modal, sapService, $window, toaster){
			 		  
	$scope.openAddWindow = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'views/office-add.html',
      controller: 'officeCtrl',
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

    $scope.add = function() {
      console.log('test add');
      sapService.addOffice($scope.office, function(data){
        console.log(data);
        toaster.pop({"type":"success","title":"Office Added Successfully"});
      });
    }

    $scope.delete = function(id, index) {
      if ($window.confirm("Confirm delete Office ?")) {
        sapService.deleteOffice(id, function(data){
          
          toaster.pop({"type":"success","title":"Office Deleted Successfully"});
          $scope.officeList.splice(index, 1);          
        });
      }
      else{
        return false;
      }
    }


	
	
})