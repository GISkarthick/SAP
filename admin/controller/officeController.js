app.controller('officeCtrl', function($scope, sapService, $window, toaster, $state){

  $scope.currentPage = 1;
  $scope.limit = 10;

  $scope.listOffice = function (){
    sapService.getOffice(null, $scope.searchName, $scope.currentPage, $scope.limit, function(data){
      $scope.officeList = data.data;
      $scope.totalPages = data.pages;
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

  $scope.nextPage = function (page){
    $scope.currentPage = page;
    //List all office
    $scope.listOffice();
  }

  //List all office
  $scope.listOffice(); 
	
})

app.controller('officeAddCtrl', function($scope, sapService, $window, toaster, $state, $stateParams){

  $scope.id = $stateParams.id; 
  
  $scope.populate = function(id) {
    sapService.getOffice(id, null, null, null, function(data){
      $scope.office = data;
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
    if($scope.validate($scope.office)){
      sapService.editOffice($scope.office._id, {data : $scope.office}, function(data){
        toaster.pop({"type":"success","title":"Office Updated Successfully"});
        $state.go('office-list');
      });
    }
  }

  $scope.add = function() {
    $scope.submitted="true";
    if($scope.validate($scope.office)){
      sapService.addOffice({data : $scope.office}, function(data){
        toaster.pop({"type":"success","title":"Office Added Successfully"});
        $state.go('office-list');
      });
    }
  }

  $scope.cancel = function() {
    $state.go('office-list');
  }

  if($scope.id){
    //Populate office
    $scope.populate($scope.id);
  }
  
})