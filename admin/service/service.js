app.service('sapService', function(apiFactory){
	this.getOffice = function(id, calback) {
		var param = '';
		if(id){
			param = '?id=' + id;
		}
	   	apiFactory.get('office' + param).then(function(results) {
	        calback(results);
	    });
   	};
   	this.deleteOffice = function(id, calback) {
	   	apiFactory.delete('office/' + id).then(function(results) {
	        calback(results);
	    });
   	};

   	this.getRegion = function(id, calback) {
   		var param = '';
		if(id){
			param = '?id=' + id;
		}
	   	apiFactory.get('region' + param).then(function(results) {
	        calback(results);
	    });
   	};

   	this.deleteRegion = function(id, calback) {
	   	apiFactory.delete('region/' + id).then(function(results) {
	        calback(results);
	    });
   	};

   	this.getPractice = function(id, calback) {
   		var param = '';
		if(id){
			param = '?id=' + id;
		}
	   	apiFactory.get('practice' + param).then(function(results) {
	        calback(results);
	    });
   	};

   	this.deletePractice = function(id, calback) {
	   	apiFactory.delete('practice/' + id).then(function(results) {
	        calback(results);
	    });
   	};

   	this.getInitiative = function(id, calback) {
   		var param = '';
		if(id){
			param = '?id=' + id;
		}
	   	apiFactory.get('initiative' + param).then(function(results) {
	        calback(results);
	    });
   	}

   	this.deleteInitiative = function(id, calback) {
	   	apiFactory.delete('initiative/' + id).then(function(results) {
	        calback(results);
	    });
   	};
});