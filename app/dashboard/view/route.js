import Ember from 'ember';

export default Ember.Route.extend({
    //model: function(params) {
    //    return this.store.find('dashboard', params.id);
    //}
    renderTemplate: function() {
        this.render({ outlet: 'body' });
    },
});

