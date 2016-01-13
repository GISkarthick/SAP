app.service('sapService', function(apiFactory){
	this.getOffice = function(calback) {
	   	apiFactory.get('office').then(function(results) {
	        calback(results);
	    });
   	};
   	this.getRegion = function(calback) {
	   	apiFactory.get('region').then(function(results) {
	        calback(results);
	    });
   	};
   	this.getPractice = function(calback) {
	   	apiFactory.get('practice').then(function(results) {
	        calback(results);
	    });
   	};
   	this.getInitiative = function(calback) {
	   	apiFactory.get('initiative').then(function(results) {
	        calback(results);
	    });
   	}
});