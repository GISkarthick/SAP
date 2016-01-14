app.service('sapService', function(apiFactory){
	this.getOffice = function(id, callback) {
		var param = '';
		if(id){
			param = '?id=' + id;
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

   	this.getRegion = function(id, callback) {
   		var param = '';
		if(id){
			param = '?id=' + id;
		}
	   	apiFactory.get('region' + param).then(function(results) {
	        callback(results);
	    });
   	};

   	this.deleteRegion = function(id, callback) {
	   	apiFactory.delete('region/' + id).then(function(results) {
	        callback(results);
	    });
   	};

   	this.getPractice = function(id, callback) {
   		var param = '';
		if(id){
			param = '?id=' + id;
		}
	   	apiFactory.get('practice' + param).then(function(results) {
	        callback(results);
	    });
   	};

   	this.deletePractice = function(id, callback) {
	   	apiFactory.delete('practice/' + id).then(function(results) {
	        callback(results);
	    });
   	};

   	this.getInitiative = function(id, callback) {
   		var param = '';
		if(id){
			param = '?id=' + id;
		}
	   	apiFactory.get('initiative' + param).then(function(results) {
	        callback(results);
	    });
   	}

   	this.deleteInitiative = function(id, callback) {
	   	apiFactory.delete('initiative/' + id).then(function(results) {
	        callback(results);
	    });
   	};

   	this.getUser = function(id, callback) {
		var param = '';
		if(id){
			param = '?id=' + id;
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
});