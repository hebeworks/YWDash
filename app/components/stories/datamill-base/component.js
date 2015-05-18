import Ember from 'ember';
import Config from './../../../config/environment';

export default Ember.Component.extend({
	inserted: function () {
		var datamillUrl = Config.APP.dataMillUrl;
		this.set('datamillUrl', datamillUrl);
	}.on('didInsertElement')
});
