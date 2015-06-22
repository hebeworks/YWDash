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
    filterType: function (key, value) {
        if (arguments.length > 1) {
			if (this.get('filterTypeValue') != value) {
				this.set('filterTypeValue', value);
			}
        }
		return this.get('filterTypeValue');
    }.property('filterType'),

	actions: {
		filterByType: function (params) {
			console.log('Stat notices: setting filterType');
			this.set('filterType', params);
		}
	}
});
