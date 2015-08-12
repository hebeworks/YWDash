import Ember from 'ember';

export default Ember.Component.extend({
	isResponsive: false,
	
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
		
		this.ensureWidth();	
	},
	
	ensureWidth: function(){ 
		// Check for max width & height
		var body = {
			width: this.$('body').width(),
			height: this.$('body').height()
		};
		
		var dimensions = {
			width: this.$().width(),
			height: this.$().height()
		};
		
		if(dimensions.width > body.width) {
			this.set('isResponsive',true);
		} else {
			this.set('isResponsive',true);
		}
		this.ensureTop();			
	},
	
	ensureTop: function() {
		var obj = this;
		setTimeout(function(){
			if(obj.$('.fullscreen-popup').offset().top < 100) {
				var newTop = (obj.$('.fullscreen-popup').height() / 2) + 10;
				obj.$('.fullscreen-popup').css({
					top: newTop + 'px',
				});
			} else {
				obj.$('.fullscreen-popup').css({
					top:'50%',
					marginTop: '-12em'
				});
			}
		}, 2000);
	},
	
	actions: {
		close:function() {
			this.set('visible',false);
		}
	}
});
