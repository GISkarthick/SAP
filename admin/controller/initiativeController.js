
app.controller('initiativeCtrl', function($scope, sapService, $window, toaster){	
	
  $scope.listInitiative = function (){
    sapService.getInitiative(null, $scope.searchName, function(data){
      $scope.initiativeList = data;
    });
  }

  $scope.delete = function(id, index) {
    if ($window.confirm("Confirm delete Initiative ?")) {
      sapService.deleteInitiative(id, function(data){
        
        toaster.pop({"type":"success","title":"Initiative Deleted Successfully"});
        $scope.initiativeList.splice(index, 1);          
      });
    }
    else{
      return false;
    }
  }

  //List all Initiative
  $scope.listInitiative(); 

})

app.controller('initiativeAddCtrl', function($scope, sapService, $window, toaster){  

  $scope.populate = function(id) {
    sapService.getInitiative(id, function(data){
      console.log(data);
      $scope.initiative = data;
    });
  }

  $scope.add = function() {
    console.log('test add');
    sapService.addInitiative({data : $scope.initiative}, function(data){
      console.log(data);
      toaster.pop({"type":"success","title":"Initiative Added Successfully"});
    });
  }

  $scope.cancel = function() {
    console.log('test cancel');
  }

})