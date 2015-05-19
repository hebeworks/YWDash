import Ember from 'ember';


export default Ember.Component.extend({
	tagName: 'div',
	loaded: false,
	allMonthsLoaded: false,
	selectedMonth: '',
	months: [],
	loadedMonths: 0,
	didInsertElement: function () {
		this.set('title', 'House prices in Leeds');
		this.set('subTitle', 'Enquiries dealt with by Leeds City Council');
		this.getPast12Months();
		
		//		this.getData('http://landregistry.data.gov.uk/data/hpi/region/leeds/month/2014-02.json').then(function(){
		//			alert('test');
		//		})
	},

	getData: function (url) {
		var obj = this;
		return new Ember.RSVP.Promise(function (resolve) {
			try
			{
				obj.crossDomainAjax(url, function (data) {
					resolve(data);
				});
			}
			catch (err) {
				reject(err);
			}
		});
	},

	crossDomainAjax: function (url, successCallback) {
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
			return false;
		}    

		// Do normal jQuery AJAX for everything else          
		else {
			$.ajax({
				url: url,
				cache: false,
				dataType: 'json',
				type: 'GET',
				async: false, // must be set to false
				success: function (data, success) {
					successCallback(data);
				}
			});
		}
	},



	//	fetchData: function (date) {
	//		// http://landregistry.data.gov.uk/data/hpi/region/leeds/month/2015-01
	//		var obj = this;
	//		var thisMonth = moment().add(-2, 'month').format('YYYY-MM');
	//		var previousMonth = moment().add(-3, 'month').format('YYYY-MM');
	//
	//		this.getMonthData(thisMonth).then(function (month) {
	//			obj.set('currentMonth', month);
	//			setTimeout(() => {
	//				obj.set('loaded', true);
	//			});
	//		});
	//
	//		this.getMonthData(previousMonth).then(function (month) {
	//			obj.set('previousMonth', month);
	//		});
	//	}.observes('selectedMonth'),



	getPast12Months: function () {
		var obj = this;
		this.set('monthsToLoad', 13);
		for (var i = 1; i <= this.get('monthsToLoad'); i++) {
			var monthsToSubtract = i + 1; // seem to only have data starting 2 months back so start from there
			this.getMonthData(moment().add(-(monthsToSubtract), 'month').format('YYYY-MM'))
				.then(function (month) {
					obj.get('months').push(month);
					obj.set('loadedMonths', obj.get('loadedMonths') + 1);
				});
		}
	},

	monthLoaded: function () {
		console.log('loadedMonths: ' + this.get('loadedMonths'));
		if (this.get('loadedMonths') === this.get('monthsToLoad')) {
			this.set('allMonthsLoaded',true);
		}
		
		if (this.get('months') != null) {
			if (this.get('months').length > 0) {
				this.set('currentMonth', this.get('months')[0]);
			}
			if (this.get('months').length > 1) {
				this.set('previousMonth', this.get('months')[1]);
			}
		}
	}.observes('loadedMonths'),


	getMonthData: function (date) {
		//		return Ember.$.getJSON('http://landregistry.data.gov.uk/data/hpi/region/leeds/month/' + date + '.json')
		return this.getData('http://landregistry.data.gov.uk/data/hpi/region/leeds/month/' + date + '.json')
			.then((data) => {
			var item = data.result.primaryTopic;
			var resource = {
				annualChange: item.annualChange,
				averageDetached: item.averagePricesDetachedSASM,
				averageFlat: item.averagePricesFlatMaisonetteSASM,
				averageSA: item.averagePricesSA,
				averageSASM: item.averagePricesSASM,
				averageSemi: item.averagePricesSemiDetachedSASM,
				averageTerraced: item.averagePricesTerracedSASM,
				dataSet: item.dataSet,
				indices: item.indices,
				indicesSA: item.indicesSA,
				indicesSASM: item.indicesSASM,
				monthlyChange: item.monthlyChange
			};
			return resource;
		});
	},

	changeDetached: function () {
		return hebeutils.evenRound(100 - ((this.get('currentMonth.averageDetached') / this.get('previousMonth.averageDetached')) * 100), 2);
	}.property('currentMonth.averageDetached', 'previousMonth.averageDetached'),

	changeFlat: function () {
		return hebeutils.evenRound(100 - ((this.get('currentMonth.averageFlat') / this.get('previousMonth.averageFlat')) * 100), 2);
	}.property('currentMonth.averageFlat', 'previousMonth.averageFlat'),

	changeSemi: function () {
		return hebeutils.evenRound(100 - ((this.get('currentMonth.averageSemi') / this.get('previousMonth.averageSemi')) * 100), 2);
	}.property('currentMonth.averageSemi', 'previousMonth.averageSemi'),

	changeTerraced: function () {
		return hebeutils.evenRound(100 - ((this.get('currentMonth.averageTerraced') / this.get('previousMonth.averageTerraced')) * 100), 2);
	}.property('currentMonth.averageTerraced', 'previousMonth.averageTerraced')
});
