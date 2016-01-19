
app.controller('mainCtrl', function($scope, $location){
	$scope.currentPath = $location.path();
})
app.controller('SideMenuCtrl', function($scope){
	
	$scope.sideMenu = [
		{'name':'Office', 'src':'office', 'cls':'active', 'fa':'building-o'},
		{'name':'Practice', 'src':'practice', 'fa':'hourglass-1'},
		{'name':'Region', 'src':'region', 'fa':'bank'},
		{'name':'Initiative', 'src':'initiative', 'fa':'bell'},
		{'name':'User', 'src':'user', 'fa':'bell'}
	]
	
})

.controller('loginCtrl', function($scope){

});