
app.controller('practiceCtrl', function($scope, sapService, $window, toaster){	
	
  sapService.getPractice(null, function(data){
    $scope.practiceList = data;
  });

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

app.controller('practiceAddCtrl', function($scope, sapService, $window, toaster){  
  
  $scope.populate = function(id) {
    sapService.getPractice(id, function(data){
      console.log(data);
      $scope.practice = data;
    });
  }

  $scope.add = function() {
    console.log('test add');
    sapService.addPractice({data : $scope.practice}, function(data){
      console.log(data);
      toaster.pop({"type":"success","title":"Practice Added Successfully"});
    });
  }

  $scope.cancel = function() {
    console.log('test cancel');
  }

})