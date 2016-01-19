
app.controller('practiceCtrl', function($scope, sapService, $window, toaster, $state){	
	
  $scope.listPractice = function (){
    sapService.getPractice(null, $scope.searchName, function(data){
      $scope.practiceList = data;
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

  //List all Practice
  $scope.listPractice();

})

app.controller('practiceAddCtrl', function($scope, sapService, $window, toaster, $state, $stateParams){  
  
  $scope.id = $stateParams.id;

  $scope.populate = function(id) {
    sapService.getPractice(id, null, function(data){
      $scope.practice = data;
    });
  }

  $scope.update = function() {
    sapService.editPractice($scope.practice._id, {data : $scope.practice}, function(data){
      toaster.pop({"type":"success","title":"Practice Updated Successfully"});
      $state.go('practice-list');
    });
  }

  $scope.add = function() {
    sapService.addPractice({data : $scope.practice}, function(data){
      toaster.pop({"type":"success","title":"Practice Added Successfully"});
      $state.go('practice-list');
    });
  }

  $scope.cancel = function() {
    $state.go('practice-list');
  }

  if($scope.id){
    //Populate practice
    $scope.populate($scope.id);
  }

})