import Ember from 'ember';

export default Ember.Component.extend({
	canvases: null,
	getCanvases: function () {
		var obj = this;
//		this.store.find('canvas')
//			.then(function (canvases) {
//			obj.set('canvases', canvases);
//		});
	}.on('init')
});
