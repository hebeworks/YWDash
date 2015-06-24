import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'li',
	didInsertElement: function () {
		Ember.run.scheduleOnce('afterRender', this, this.didRenderElement);
	},
	didRenderElement: function(){
        Canvas.init();
        HebeDash.init();
	},
	actions: {
        gotoRoute: function (route) {
	        this.set('action','gotoRoute');
            this.sendAction('action', route);
        }
	}
});
