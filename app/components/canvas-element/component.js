import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'li',
	getStories: function () {
		//		var obj = this;
		//        var model = this.get('model');
		//		debugger;
		//		if(model != null && model.get('stories') != null){
		//			
		//		} else {
		//			this.store.find('story').then(function (stories) {
		//                obj.set('stories', stories);
		//            });
		//		}
	}.on('init'),

	didInsertElement: function () {
		//		debugger;
		//		Canvas.init();
	},
	actions: {
        gotoRoute: function (route) {
	        this.set('action','gotoRoute');
            this.sendAction('action', route);
        }
	}
});
