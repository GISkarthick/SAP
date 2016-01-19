
app.controller('regionCtrl', function($scope, sapService, $window, toaster, $state){

  $scope.listRegion = function (){
  	sapService.getRegion(null, $scope.searchName, function(data){
      $scope.regionList = data;
    });
  }

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

  //List all Region
  $scope.listRegion();

})

app.controller('regionAddCtrl', function($scope, sapService, $window, toaster, $state, $stateParams){

  $scope.id = $stateParams.id;

  $scope.populate = function(id) {
    sapService.getRegion(id, null, function(data){
      $scope.region = data;
    });
  }

  $scope.update = function() {
    sapService.editRegion($scope.region._id, {data : $scope.region}, function(data){
      toaster.pop({"type":"success","title":"Region Updated Successfully"});
      $state.go('region-list');
    });
  }

  $scope.add = function() {
    sapService.addRegion({data : $scope.region}, function(data){
      toaster.pop({"type":"success","title":"Region Added Successfully"});
      $state.go('region-list');
    });
  }

  $scope.cancel = function() {
    $state.go('region-list');
  }

  if($scope.id){
    //Populate region
    $scope.populate($scope.id);
  }
 
})