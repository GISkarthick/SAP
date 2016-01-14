
app.controller('practiceCtrl', function($scope, $modal, sapService, $window){
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
	
  sapService.getPractice(null, function(data){
    $scope.practiceList = data;
  });

  $scope.populate = function(id) {
      sapService.getPractice(id, function(data){
        console.log(data);
        $scope.practice = data;
      });
    }

    $scope.delete = function(id, index) {
      if ($window.confirm("Confirm delete Practice ?")) {
        sapService.deletePractice(id, function(data){
          
          toaster.pop({"type":"success","title":"Practice Deleted Successfully"});
          $scope.practiceList.splice(index, 1);          
        });
      }
      else{
        return false;
      }
    }


	
})