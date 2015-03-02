import Ember from 'ember';

export default Ember.ArrayController.extend({

    siteTitle: function(){
        return 'Leeds Dashboard Title';
    }.property(),

    navItems: function(){
        return [{ title: 'Toolbox', align: 'center' },{ title: 'Library', align: 'right', route: 'dashboard.list' }];
    }.property(),

    actions: {
        gotoRoute:function(route){
            this.get('target').transitionTo(route);
        }
    }
});
