import Ember from 'ember';
import Config from './../../config/environment';

export default Ember.Controller.extend({
	mapStyle: function () {
		var styles = Config.APP.googleMapStyles.default;
		return styles;
	}.property()
});
