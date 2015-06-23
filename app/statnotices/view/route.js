import Ember from 'ember';

export default Ember.Route.extend({
	model: function (params) {
		if (params != null && params.statnotice_id != null) {
			return this.store.find('statnotice', params.statnotice_id);
		} else {
			return null;
		}
	},
	
	mapStyle: function(){
		return this.get('config').googleMapStyles.default;
	}
});
