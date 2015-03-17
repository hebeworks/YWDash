import Ember from 'ember';

export default Ember.Controller.extend({
    siteTitle: function(){
        return 'Leeds Dashboard Title';
    }.property(),

    navItems: function(){

        var items = [
            { title: 'Toolbox', align: 'center', action: 'toggleSubNav' },
            { title: 'Gallery', align: 'right', action: 'toggleGallery' }
        ];

        for (var i = 0; i < items.length; i++) {
            items[i].dashed = '-' + items[i].title.dasherize();
            items[i].iconclass = 'icon' + items[i].dashed;
            items[i].svgclass = 'svg' + items[i].dashed;
        }

        return items;
    }.property(),

    //actions: {
    //    gotoRoute:function(route){
    //        this.get('target').transitionTo(route);
    //    }
    //}

});
