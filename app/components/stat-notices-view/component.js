import Ember from 'ember';
import Config from './../../config/environment';

export default Ember.Component.extend({
	didInsertElement:function(){
			debugger;
	},
	mapStyle: function () {
		var styles = Config.APP.googleMapStyles.default;
		return styles;
	}.property()
});
