import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function() {
//        this.render('gallery.header',{ outlet: 'fullscreen-header' });
        this.render({ outlet: 'fullscreen' });
    },
    model: function () {
		return this.store.find('statnotice');
	},
    activate: function(){
        
    },
    deactivate: function() {
        
    }

});
