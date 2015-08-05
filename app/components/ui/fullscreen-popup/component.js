import Ember from 'ember';

export default Ember.Component.extend({
	
	onVisibleChange: function() {
		var obj = this;
		if(this.get('visible') == true) {
			// perform DOM actions
	        Ember.run.scheduleOnce('afterRender', this, obj.onPopupActivate);
		}
	}.observes('visible'),
	
	onPopupActivate: function() {
		setTimeout(function(){
			grunticon.embedSVG();
		}, 200);	
	},
	
	actions: {
		close:function() {
			this.set('visible',false);
		}
	}
});
