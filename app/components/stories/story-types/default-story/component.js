import Ember from 'ember';
import Config from './../../../../config/environment';

export default Ember.Component.extend({
	config: Config.APP,

	getData: function (url, cache) {
		var obj = this;
		return new Ember.RSVP.Promise(function (resolve, reject, complete) {
			try
			{
				var useCache = (cache != null && cache === true ? true : false);
				 $.support.cors = true;
				$.ajax({
					url: url,
					cache: useCache,
					dataType: 'json',
					crossOrigin: true,
					type: 'GET',
					// async: false //false, // must be set to false ?????? NS
				})
					.done(resolve)
					.fail(reject)
					.always(complete);
					//Ember.$.ajax({
					//	url: url
					//})
					//.done(resolve)
					//.fail(reject)
					//.always(complete);

			}
			catch (err) {
				reject(err);
			}
			finally {
				if (complete != null) {
					complete();
				}
			}
		});
	}
});


//import Ember from 'ember';
//import Config from './../../../../config/environment';
//
//export default Ember.Component.extend({
//	config: Config.APP,
//
//	getData: function (url, cache) {
//		var obj = this;
//		return new Ember.RSVP.Promise(function (resolve, reject) {
//			try
//			{
//				// Todo: Check if url is a cross domain request 
//				if (obj.isCORS(url)) {
//					obj.crossDomainAjax(url, function (data) {
//						resolve(data);
//					}, cache);
//				} else {
//					return Ember.$.getJSON(url)
//						.then(function (data) {
//						resolve(data);
//					})
//				}
//			}
//			catch (err) {
//				reject(err);
//			}
//		});
//	},
//
//	isCORS: function (url) {
//		return true;
//		//Todo: check for CORS request	
//	},
//
//
//	crossDomainAjax: function (url, successCallback, cache) {
//		// IE8 & 9 only Cross domain JSON GET request
//		console.log('crossDomainAjax');
//		if ('XDomainRequest' in window && window.XDomainRequest !== null
//			&& navigator.userAgent.indexOf('MSIE') != -1
//			&& parseInt(navigator.userAgent.match(/MSIE ([\d.]+)/)[1], 10) < 10) {
//			console.log('XDomainRequest');
//			var xdr = new XDomainRequest(); // Use Microsoft XDR
//			xdr.open('get', url);
//			xdr.onload = function () {
//				console.log('xdr.load');
//				var dom = new ActiveXObject('Microsoft.XMLDOM'),
//					JSON = $.parseJSON(xdr.responseText);
//				dom.async = true;
//				if (JSON == null || typeof (JSON) == 'undefined') {
//					JSON = $.parseJSON(data.firstChild.textContent);
//				}
//				successCallback(JSON); // internal function
//			};
//			xdr.onerror = function (err) {
//				console.log('xdr.error:' + err);
//				_result = false;
//			};
//			console.log('xdr.send');
//
//			xdr.send();
//		} 
//
//		// IE7 and lower can't do cross domain
//		else if (navigator.userAgent.indexOf('MSIE') != -1 &&
//			parseInt(navigator.userAgent.match(/MSIE ([\d.]+)/)[1], 10) < 8) {
//			throw new Error("IE7 and lower can't do cross domain");
//		}    
//
//		// Do normal jQuery AJAX for everything else          
//		else {
//			var useCache = (cache != null && cache === true ? true : false);
//			$.ajax({
//				url: url,
//				cache: useCache,
//				dataType: 'json',
//				type: 'GET',
//				async: false, // must be set to false
//				success: function (data, success) {
//					successCallback(data);
//				}
//			});
//			
//			//			   Ember.$.ajax({
//			//            url: 'http://hebenodeapi.azurewebsites.net/carparks',
//			//            type: 'GET',
//			//            crossOrigin: true
//			//        })
//		}
//	},
//});






//import Ember from 'ember';
//import Config from './../../../../config/environment';
//
//export default Ember.Component.extend({
//	config: Config.APP,
//
//	getData: function (url, cache) {
//		var obj = this;
//		return new Ember.RSVP.Promise(function (resolve, reject, complete) {
//			try
//			{
//				// Todo: Check if url is a cross domain request 
//				if (obj.isCORS(url)) {
//					// ignore the IE stuff and just make normal request
//				}
//				
//				// IE7 and lower can't do cross domain
//				if (navigator.userAgent.indexOf('MSIE') != -1 &&
//					parseInt(navigator.userAgent.match(/MSIE ([\d.]+)/)[1], 10) < 8) {
//					reject(new Error("IE7 and lower can't do cross domain"));
//				}    
//
//				// Do normal jQuery AJAX for everything else          
//				else {
//					console.log('getData Normal AJAX call: ' + url);
//					var useCache = (cache != null && cache === true ? true : false);
//					$.support.cors = true;
//					$.ajax({
//						url: url,
//						//cache: useCache,
//						dataType: 'json',
//						crossOrigin: true,
//						type: 'GET',
//						async: false //false, // must be set to false ?????? NS
//					})
//						.done(resolve)
//						.fail(reject)
//						.always(complete);
//				}
//			}
//			catch (err) {
//				reject(err);
//			}
//			finally {
//				if (complete != null) {
//					complete();
//				}
//			}
//		});
//	},
//
//	isCORS: function (url) {
//		return true;
//		//Todo: check for CORS request	
//	}
//});
