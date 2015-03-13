import Ember from 'ember';

export default Ember.Controller.extend({
    siteTitle: function(){
        return 'Leeds Dashboard Title';
    }.property(),

    navItems: function(){
        return [
            { title: 'Toolbox', align: 'center', action: 'toggleSubNav' },
            { title: 'Gallery', align: 'right', action: 'toggleGallery' }
        ];
    }.property(),

    //actions: {
    //    gotoRoute:function(route){
    //        this.get('target').transitionTo(route);
    //    }
    //}

});
