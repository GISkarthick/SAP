
app.controller('mainCtrl', function($scope, $location){
	$scope.currentPath = $location.path();
})
app.controller('SideMenuCtrl', function($scope){
	
	$scope.sideMenu = [
		{'name':'Office', 'src':'office', 'cls':'active', 'fa':'building-o'},
		{'name':'Practice', 'src':'practice', 'fa':'hourglass-1'},
		{'name':'Region', 'src':'region', 'fa':'bank'},
		{'name':'Initiative', 'src':'initiative', 'fa':'bell'}
	]
	
})

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
 $scope.take_me_outside = "asdfasdf";
  
  $scope.ok = function (take_me_outside) {
    console.log($modalInstance);
    $modalInstance.close(take_me_outside);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
})


.controller('loginCtrl', function($scope){

});