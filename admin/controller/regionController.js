
app.controller('regionCtrl', function($scope, sapService, $window, toaster, $state){

  $scope.currentPage = 1;
  $scope.limit = 10;

  $scope.listRegion = function (){
  	sapService.getRegion(null, $scope.searchName, $scope.currentPage, $scope.limit, function(data){
      $scope.regionList = data.data;
      $scope.totalPages = data.pages;
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

  $scope.nextPage = function (page){
    $scope.currentPage = page;
    //List all office
    $scope.listRegion();
  }

  //List all Region
  $scope.listRegion();

})

app.controller('regionAddCtrl', function($scope, sapService, $window, toaster, $state, $stateParams){

  $scope.id = $stateParams.id;

  $scope.populate = function(id) {
    sapService.getRegion(id, null, null, null, function(data){
      $scope.region = data;
    });
  }

  $scope.validate = function(object){
    var valid = true;
    if(!object){
      valid = false;
    }
    else if(!object.ID){
      valid = false;
    }
    return valid;
  }

  $scope.update = function() {
    $scope.submitted="true";
    if($scope.validate($scope.region)){
      sapService.editRegion($scope.region._id, {data : $scope.region}, function(data){
        toaster.pop({"type":"success","title":"Region Updated Successfully"});
        $state.go('region-list');
      });
    }
  }

  $scope.add = function() {
    $scope.submitted="true";
    if($scope.validate($scope.region)){
      sapService.addRegion({data : $scope.region}, function(data){
        toaster.pop({"type":"success","title":"Region Added Successfully"});
        $state.go('region-list');
      });
    }
  }

  $scope.cancel = function() {
    $state.go('region-list');
  }

  if($scope.id){
    //Populate region
    $scope.populate($scope.id);
  }
 
})