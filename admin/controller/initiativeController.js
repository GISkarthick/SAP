
app.controller('initiativeCtrl', function($scope, sapService, $window, toaster, $state){	
	
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

app.controller('initiativeAddCtrl', function($scope, sapService, $window, toaster, $state, $stateParams){  

  $scope.id = $stateParams.id;

  $scope.populate = function(id) {
    sapService.getInitiative(id, null, function(data){
      $scope.initiative = data;
    });
  }

  $scope.update = function() {
    sapService.editInitiative($scope.initiative._id, {data : $scope.initiative}, function(data){
      toaster.pop({"type":"success","title":"Initiative Updated Successfully"});
      $state.go('initiative-list');
    });
  }

  $scope.add = function() {
    sapService.addInitiative({data : $scope.initiative}, function(data){
      toaster.pop({"type":"success","title":"Initiative Added Successfully"});
      $state.go('initiative-list');
    });
  }

  $scope.cancel = function() {
    $state.go('initiative-list');
  }

  if($scope.id){
    //Populate initiative
    $scope.populate($scope.id);
  }

})