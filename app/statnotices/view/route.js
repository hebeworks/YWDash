import Ember from 'ember';

export default Ember.Route.extend({
	model: function (params) {
		if (params != null && params.params.statnotice_id != null) {
			return this.store.find('statnotice', params.statnotice_id);
		} else {
			return null;
		}
	}
});
