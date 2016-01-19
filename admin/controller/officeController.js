app.controller('officeCtrl', function($scope, sapService, $window, toaster){

  $scope.listOffice = function (){
    sapService.getOffice(null, $scope.searchName, function(data){
      $scope.officeList = data;
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

  //List all office
  $scope.listOffice(); 
	
})

app.controller('officeAddCtrl', function($scope, sapService, $window, toaster){

  $scope.populate = function(id) {
    sapService.getOffice(id, function(data){
      console.log(data);
      $scope.office = data;
    });
  }

  $scope.add = function() {
    console.log('test add');
    sapService.addOffice({data : $scope.office}, function(data){
      console.log(data);
      toaster.pop({"type":"success","title":"Office Added Successfully"});
    });
  }

  $scope.cancel = function() {
    console.log('test cancel');
  }
  
})