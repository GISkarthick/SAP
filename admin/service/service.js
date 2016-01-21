app.service('sapService', function(apiFactory){
	
	//Office CRUD operation
	this.getOffice = function(id, name, page, limit, callback) {
		var param = '';
		if(id){
			param = '?id=' + id;
		}
		else{
			param = '?page=' + page + '&limit=' + limit;
			if(name){
				param = param + '&name=' + name;
			}
		}
	   	apiFactory.get('office' + param).then(function(results) {
	        callback(results);
	    });
   	};

   	this.addOffice = function (data, callback){
   		apiFactory.put('office', data).then(function(results) {
	        callback(results);
	    });
   	};

   	this.editOffice = function (id, data, callback){
   		apiFactory.post('office/' + id, data).then(function(results) {
	        callback(results);
	    });
   	};

   	this.deleteOffice = function(id, callback) {
	   	apiFactory.delete('office/' + id).then(function(results) {
	        callback(results);
	    });
   	};

   	// Region CRUD operation
   	this.getRegion = function(id, name, page, limit, callback) {
   		var param = '';
		if(id){
			param = '?id=' + id;
		}
		else{
			param = '?page=' + page + '&limit=' + limit;
			if(name){
				param = param + '&name=' + name;
			}
		}
	   	apiFactory.get('region' + param).then(function(results) {
	        callback(results);
	    });
   	};

   	this.addRegion = function (data, callback){
   		apiFactory.put('region', data).then(function(results) {
	        callback(results);
	    });
   	};

   	this.editRegion = function (id, data, callback){
   		apiFactory.post('region/' + id, data).then(function(results) {
	        callback(results);
	    });
   	};

   	this.deleteRegion = function(id, callback) {
	   	apiFactory.delete('region/' + id).then(function(results) {
	        callback(results);
	    });
   	};

	// Practice CRUD operation
   	this.getPractice = function(id, name, page, limit, callback) {
   		var param = '';
		if(id){
			param = '?id=' + id;
		}
		else{
			param = '?page=' + page + '&limit=' + limit;
			if(name){
				param = param + '&name=' + name;
			}
		}
	   	apiFactory.get('practice' + param).then(function(results) {
	        callback(results);
	    });
   	};

   	this.addPractice = function (data, callback){
   		apiFactory.put('practice', data).then(function(results) {
	        callback(results);
	    });
   	};

   	this.editPractice = function (id, data, callback){
   		apiFactory.post('practice/' + id, data).then(function(results) {
	        callback(results);
	    });
   	};

   	this.deletePractice = function(id, callback) {
	   	apiFactory.delete('practice/' + id).then(function(results) {
	        callback(results);
	    });
   	};

   	// Initiative CRUD operation
   	this.getInitiative = function(id, name, page, limit, callback) {
   		var param = '';
		if(id){
			param = '?id=' + id;
		}
		else{
			param = '?page=' + page + '&limit=' + limit;
			if(name){
				param = param + '&name=' + name;
			}
		}
	   	apiFactory.get('initiative' + param).then(function(results) {
	        callback(results);
	    });
   	};

   	this.addInitiative = function (data, callback){
   		apiFactory.put('initiative', data).then(function(results) {
	        callback(results);
	    });
   	};

   	this.editInitiative = function (id, data, callback){
   		apiFactory.post('initiative/' + id, data).then(function(results) {
	        callback(results);
	    });
   	};

   	this.deleteInitiative = function(id, callback) {
	   	apiFactory.delete('initiative/' + id).then(function(results) {
	        callback(results);
	    });
   	};

   	// User CRUD operation
   	this.getUser = function(id, name, page, limit, callback) {
		var param = '';
		if(id){
			param = '?id=' + id;
		}
		else{
			param = '?page=' + page + '&limit=' + limit;
			if(name){
				param = param + '&name=' + name;
			}
		}
	   	apiFactory.get('profile' + param).then(function(results) {
	        callback(results);
	    });
   	};

   	this.addUser = function (data, callback){
   		apiFactory.put('profile', data).then(function(results) {
	        callback(results);
	    });
   	};

   	this.editUser = function (id, data, callback){
   		apiFactory.post('profile/' + id, data).then(function(results) {
	        callback(results);
	    });
   	};

   	this.deleteUser = function(id, callback) {
	   	apiFactory.delete('profile/' + id).then(function(results) {
	        callback(results);
	    });
   	};

   	this.sendMail = function (data, callback){
   		apiFactory.postjsonupload('sendmail', data).then(function(results) {
	        callback(results);
	    });
   	};
});