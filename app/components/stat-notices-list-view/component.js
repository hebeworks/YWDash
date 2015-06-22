import DefaultStory from '../stories/story-types/default-story/component'
export default DefaultStory.extend({
	didInsertElement: function () {
		//this.getItems();
	},

	getItems: function () {
		var obj = this;
		var url = 'http://statnotices.azurewebsites.net/api/statnotices/';
		
		// add filtering
		if (this.get('filterType') != null && this.get('filtertype') != "") {
			url += '?type=' + this.get('filterType');
		}
		
		console.log(url);

		this.getData(url)
			.then(
				function (data) {
					data.forEach(function (item) {
						// todo: make notices an ember data scheme
						// hook in to the rest api automatically
						// the transformed properties below can be appended to the models
						item._publicationDate = moment(data[0].publicationdate).calendar();
	
					});
					obj.set('items', data);
				},
				function (error) {
					console.log('ERROR:' + error);
				}
			)
	}.observes('filterType'),

	filterTypeValue: null,
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





	actions: {
		filterByType: function (params) {
			console.log('Stat notices: setting filterType');
			this.set('filterType', params);
		}
	}
});
