import Ember from 'ember';

export default Ember.Component.extend({
	canvases: null,
	getCanvases: function () {
		var obj = this;
		this.store.find('canvas')
			.then(function (canvases) {
			obj.set('canvases', canvases);
		
			this.setTimeout(function() { 
//				Canvas.init();
	debugger;
	HebeDash.setupDOM(); 
			},1000);

		});
	}.on('init')
});
