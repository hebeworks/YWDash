import Ember from 'ember';

export default Ember.Route.extend({
	model: function (params) {
		return this.store.find('statnotice').then(function (data) {
            console.log('Statnotices route > statnotices loaded: ' + data.content);
            return data;
        });
	}
});
