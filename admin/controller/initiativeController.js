
app.controller('initiativeCtrl', function($scope, sapService, $window, toaster, $state){	
	
  $scope.currentPage = 1;
  $scope.limit = 10;

  $scope.listInitiative = function (){
    sapService.getInitiative(null, $scope.searchName, $scope.currentPage, $scope.limit, function(data){
      $scope.initiativeList = data.data;
      $scope.totalPages = data.pages;
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

  $scope.nextPage = function (page){
    $scope.currentPage = page;
    //List all office
    $scope.listInitiative();
  }

  //List all Initiative
  $scope.listInitiative(); 

})

app.controller('initiativeAddCtrl', function($scope, sapService, $window, toaster, $state, $stateParams){  

  $scope.id = $stateParams.id;

  $scope.populate = function(id) {
    sapService.getInitiative(id, null, null, null, function(data){
      $scope.initiative = data;
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
    if($scope.validate($scope.initiative)){
      sapService.editInitiative($scope.initiative._id, {data : $scope.initiative}, function(data){
        toaster.pop({"type":"success","title":"Initiative Updated Successfully"});
        $state.go('initiative-list');
      });
    }
  }

  $scope.add = function() {
    $scope.submitted="true";
    if($scope.validate($scope.initiative)){
      sapService.addInitiative({data : $scope.initiative}, function(data){
        toaster.pop({"type":"success","title":"Initiative Added Successfully"});
        $state.go('initiative-list');
      });
    }
  }

  $scope.cancel = function() {
    $state.go('initiative-list');
  }

  if($scope.id){
    //Populate initiative
    $scope.populate($scope.id);
  }

})