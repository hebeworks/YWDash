import Ember from 'ember';
import Config from './../../../../config/environment';

export default Ember.Component.extend({
	config: Config.APP,

	getData: function (url, cache) {
		var obj = this;
		return new Ember.RSVP.Promise(function (resolve, reject) {
			try
			{
				// Todo: Check if url is a cross domain request 
				if(obj.isCORS(url)) {
					obj.crossDomainAjax(url, function (data) {
						resolve(data);
					}, cache);				
				} else {
					return Ember.$.getJSON(url)
						.then(function(data){
							resolve(data);
						})
				}
			}
			catch (err) {
				reject(err);
			}
		});
	},
	
	isCORS: function(url) {
		return true;
		//Todo: check for CORS request	
	},
	

	crossDomainAjax: function (url, successCallback, cache) {
		// IE8 & 9 only Cross domain JSON GET request
		if ('XDomainRequest' in window && window.XDomainRequest !== null) {
			var xdr = new XDomainRequest(); // Use Microsoft XDR
			xdr.open('get', url);
			xdr.onload = function () {
				var dom = new ActiveXObject('Microsoft.XMLDOM'),
					JSON = $.parseJSON(xdr.responseText);
				dom.async = false;
				if (JSON == null || typeof (JSON) == 'undefined') {
					JSON = $.parseJSON(data.firstChild.textContent);
				}
				successCallback(JSON); // internal function
			};
			xdr.onerror = function () {
				_result = false;
			};
			xdr.send();
		} 

		// IE7 and lower can't do cross domain
		else if (navigator.userAgent.indexOf('MSIE') != -1 &&
			parseInt(navigator.userAgent.match(/MSIE ([\d.]+)/)[1], 10) < 8) {
			throw new Error("IE7 and lower can't do cross domain");
		}    

		// Do normal jQuery AJAX for everything else          
		else {
			$.ajax({
				url: url,
				cache: (cache === true ? true : false),
				dataType: 'json',
				type: 'GET',
				async: false, // must be set to false
				success: function (data, success) {
					successCallback(data);
				}
			});
			
//			   Ember.$.ajax({
//            url: 'http://hebenodeapi.azurewebsites.net/carparks',
//            type: 'GET',
//            crossOrigin: true
//        })
		}
	},
});
