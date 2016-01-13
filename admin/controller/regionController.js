
app.controller('regionCtrl', function($scope, $modal, sapService, $window){
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

	sapService.getRegion(null, function(data){
    $scope.regionList = data;
  });

  $scope.populate = function(id) {
    sapService.getRegion(id, function(data){
      console.log(data);
      $scope.region = data;
    });
  }

  $scope.delete = function(id, index) {
    if ($window.confirm("Confirm delete Region ?")) {
      sapService.deleteRegion(id, function(data){
        
        var output={"status":"success","message":"Region Deleted Successfully"};
        //sapService.toast(output);
        $scope.regionList.splice(index, 1);          
      });
    }
    else{
      return false;
    }
  }

	
})