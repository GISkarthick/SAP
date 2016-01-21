app.controller('userCtrl', function($scope, $modal, sapService, $window, toaster, $state){

  $scope.currentPage = 1;
  $scope.limit = 10;

  $scope.listUser = function (){
  	sapService.getUser(null, $scope.searchName, $scope.currentPage, $scope.limit, function(data){
  		$scope.userList = data.data;
      $scope.totalPages = data.pages;
  	});
  }

  $scope.delete = function(id, index) {
    if ($window.confirm("Confirm delete User ?")) {
      sapService.deleteUser(id, function(data){
        
        toaster.pop({"type":"success","title":"User Deleted Successfully"});
        $scope.userList.splice(index, 1);          
      });
    }
    else{
      return false;
    }
  }

  $scope.nextPage = function (page){
    $scope.currentPage = page;
    //List all office
    $scope.listUser();
  }

  $scope.generatePdfJson = function (userList){
    var pdfData = [[ { text: "EmployeeID", bold: true }, { text: "Email", bold: true }
      , { text: "FirstName", bold: true }, { text: "LastName", bold: true }, 
      { text: "UserName", bold: true }, { text: "Status", bold: true }]];

    for (var i = 0; i < userList.length; i++) {
      var user = [];
      user.push(userList[i].EmployeeID);
      user.push(userList[i].EmpEmail);
      user.push(userList[i].FirstName);
      user.push(userList[i].LastName);
      user.push(userList[i].EmpUserName);
      user.push(userList[i].EmpStatus);
      pdfData.push(user);
    };

    var docDefinition = {
      content: [
        {
          table: {
            headerRows: 1,
            widths: [ '*', 'auto', '*', '*', '*', '*' ],
            body: pdfData
          }
        }
      ]
    };
    return docDefinition;
  }

  $scope.generatePdf = function (){
    var docDefinition = $scope.generatePdfJson($scope.userList);
    pdfMake.createPdf(docDefinition).download();
  }

  $scope.send = function() {
    var docDefinition = $scope.generatePdfJson($scope.userList);

    pdfMake.createPdf(docDefinition).getDataUrl(function(buffer) {
      var fd = new FormData();
      fd.append('filedata', buffer);
      fd.append('to', $scope.mail.to);
      fd.append('subject', $scope.mail.subject);
      fd.append('body', $scope.mail.body);

      sapService.sendMail(fd, function(data){
        toaster.pop({"type":"success","title":"Email Sent Successfully"});
        //$state.go('user-list');
      });
    });
    
  }

  $scope.cancel = function() {
    $state.go('user-list');
  }

  //List all Region
  $scope.listUser();
	
})



app.controller('userAddCtrl', function($scope, $modal, sapService, $window, toaster, $state, $stateParams){

  $scope.id = $stateParams.id;

  $scope.populate = function(id) {
    sapService.getUser(id, null, null, null, function(data){
      $scope.user = data;
    });
  }

  $scope.update = function() {
    sapService.editUser($scope.user._id, {data : $scope.user}, function(data){
      toaster.pop({"type":"success","title":"User Updated Successfully"});
      $state.go('user-list');
    });
  }

  $scope.add = function() {
    sapService.addUser({data : $scope.user}, function(data){
      toaster.pop({"type":"success","title":"User Added Successfully"});
      $state.go('user-list');
    });
  }

  $scope.cancel = function() {
    $state.go('user-list');
  }

  if($scope.id){
    //Populate user
    $scope.populate($scope.id);
  }
  
})
