
app.controller('mainCtrl', function($scope, $location){
	$scope.currentPath = $location.path();
})
app.controller('SideMenuCtrl', function($scope){
	
	$scope.sideMenu = [
		{'name':'Office', 'src':'office-list', 'cls':'active', 'fa':'building-o'},
		{'name':'Practice', 'src':'practice-list', 'fa':'hourglass-1'},
		{'name':'Region', 'src':'region-list', 'fa':'bank'},
		{'name':'Initiative', 'src':'initiative-list', 'fa':'bell'},
		{'name':'User', 'src':'user-list', 'fa':'bell'}
	]
	
})

.controller('loginCtrl', function($scope){

});