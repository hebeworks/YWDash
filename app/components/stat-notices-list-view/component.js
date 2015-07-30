import DefaultStory from '../stories/story-types/default-story/component'
export default DefaultStory.extend({

	currentFilter: {},
	
	filterPlace:null,
	places:null,
	
	onInit:function() {
		this.get('places');
		this.get('filterPlace');
	}.on('init'),

	onSelectedPlaceChange: function() {
		// this.getItems();
		// 	location": {
	    //   "coordinates": [
	    //     53.60857506915007,
	    //     -1.0128832985975176
	    //   ]
	    // }
		if(this.get('filterPlace') != null) {
			var location = this.get('filterPlace.location.coordinates');
			var lat = location[0];
			var lng = location[1];
			
			location = { 
				lat: lat,
				lng: lng
			};
			
			console.log('location: ' + location);
			
			this.set('location',location);
		} else {
			this.set('location',null);
		}
	}.observes('filterPlace'),

	getItems: function () {
		var obj = this;
		
		this.sendGoogleTrackingEvent('','StatNoticeSearch','Filter',this.get('filterType'));
		
		var query = {};
		if(this.get('filterType') != null && this.get('filterType') != "All" && this.get('filterType.length') > 0) {
			query.type = this.get('filterType');
		}
		
		if(this.get('location') != null) {
			query.lat = this.get('location.lat');
			query.lng = this.get('location.lng');
		}
		
		console.log('filter query = ' + query); 
		
		this.store.find('statnotice', query)
			.then(function(data){
				obj.set('items', data);
			});
		
		
//		var url = 'http://statnotices.azurewebsites.net/api/statnotices/';
//
//		// add filtering
//		if (this.get('filterType') != null && this.get('filtertype') != "") {
//			url += '?type=' + this.get('filterType');
//		}
//		this.getData(url)
//			.then(
//				function (data) {
//					data.forEach(function (item) {
//						// todo: make notices an ember data scheme
//						// hook in to the rest api automatically
//						// the transformed properties below can be appended to the models
////						item._publicationDate = moment(data[0].publicationdate).calendar();
//					});
//					obj.set('items', data);
//				},
//				function (error) {
//					console.log('ERROR:' + error);
//				}
//			)
			
			
			
	}.observes('filterType', 'location'),

	filterTypeValue: "All",
    filterType: Ember.computed("filterType", {
		get: function() {
			console.log('getting filterTypeValue: ' + this.get('filterTypeValue'));
			return this.get('filterTypeValue');
	    },
	    set: function(key, value) {
			console.log('setting filterTypeValue: ' + value);
			if (this.get('filterTypeValue') != value) {
				this.set('filterTypeValue', value);
			}
			return value;
	    }
	}),
	
	sendGoogleTrackingEvent: function(account,category,action,label,value) {
		console.log('sendGoogleTrackingEvent: ' + account + ' - ' + category  + ' - ' + action + ' - ' + label + ' - ' + value);
	// https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide	
		account = 
		'UA-63204812-2'; // statnotices
		// 'UA-63204812-1' // dashboard
		_gaq.push(
		  ['_setAccount', account],
		  ['_setDomainName', 'statnotices.leedsdatamill.org'],
		  // ['_setCustomVar', 1, 'Section', 'Life & Style', 3],
		  // _trackEvent(category, action, opt_label, opt_value, opt_noninteraction)
		  ['_trackEvent',category,action,label,value]
		  // ['_trackPageview']
		);	
	},



	actions: {
		filterByType: function (params) {
			console.log('Stat notices: setting filterType');
			this.set('filterType', params);
		},
		findPlaces: function(query, deferred) {
			var obj = this;
			if(query != null && query.term != null && query.term.length > 3) {
				var url = 'http://statnotices.azurewebsites.net/api/places?searchTerm='+query.term;
				// console.log(url);
				this.getData(url)
			        .then(
						function(data) {
							// var items = [];
							data.forEach(function(item){
								item.id = item._id;
							// 	var tmp = Ember.Object.create(item);
							// 	items.push(tmp);
							});
							
							obj.set('places',data);
							deferred.resolve(obj.get('places'));//{data: data, more: false});
						}
						,deferred.reject);
			}
	    },
		clearPlace: function() {
			this.set('filterPlace', null);
		},
		notifyMe: function() {
			this.set('notifyMeVisible', true);
		},
		notifyMeSubmit: function() {
			var currentFilter = {
				email: this.get('userEmail'),
				type: this.get('filterType'),
				lat: this.get('location.lat'),
				lng: this.get('location.lng'),
				place: this.get('filterPlace.NAME1')
			};
			
			// Todo: submit registration to API
			debugger;
			$.post("http://localhost:8080/api/notifications", currentFilter, function(result){
			// $.post("http://statnotices.azurewebsites.net/api/notifications", currentFilter, function(result){
		        debugger;
		    });
			
			console.log(currentFilter);
		}
	}
});
