import Ember from 'ember';

export default Ember.Controller.extend({
    siteTitle: function(){
        return 'Leeds Dashboard Title';
    }.property(),

    navItems: function(){
        return [
            { title: 'Toolbox', align: 'center', action: 'toggleSubNav' },
            { title: 'Library', align: 'right', route: 'dashboard.list', action: 'gotoRoute' }
        ];
    }.property(),

    //actions: {
    //    gotoRoute:function(route){
    //        this.get('target').transitionTo(route);
    //    }
    //}

});
