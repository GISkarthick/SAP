
app.controller('regionCtrl', function($scope, sapService, $window, toaster){

	sapService.getRegion(null, function(data){
    $scope.regionList = data;
  });

  $scope.delete = function(id, index) {
    if ($window.confirm("Confirm delete Region ?")) {
      sapService.deleteRegion(id, function(data){
        
        toaster.pop({"type":"success","title":"Region Deleted Successfully"});
        $scope.regionList.splice(index, 1);          
      });
    }
    else{
      return false;
    }
  }

})

app.controller('regionAddCtrl', function($scope, sapService, $window, toaster){

  $scope.populate = function(id) {
    sapService.getRegion(id, function(data){
      console.log(data);
      $scope.region = data;
    });
  }

  $scope.add = function() {
    console.log('test add');
    sapService.addRegion({data : $scope.region}, function(data){
      console.log(data);
      toaster.pop({"type":"success","title":"Region Added Successfully"});
    });
  }

  $scope.cancel = function() {
    console.log('test cancel');
  }
 
})