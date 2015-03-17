import Ember from 'ember';

export default Ember.Controller.extend({
    siteTitle: function(){
        return 'Leeds Dashboard Title';
    }.property(),

    navItems: function(){

        var items = [
            { title: 'Toolbox' },//, action: 'toggleSubNav' },
            { title: 'Gallery' }//, action: 'toggleGallery' }
        ];

        for (var i = 0; i < items.length; i++) {
            var dashed = items[i].title.dasherize();
            items[i].dashed = '-' + dashed;
            items[i].jshook = 'js-open-' + dashed;
            items[i].iconclass = 'icon-' + dashed;
            items[i].svgclass = 'svg-' + dashed;
        }

        return items;
    }.property(),

    topDrawerNavItems: function(){

        var items = [
            { title: 'Change Canvas', jshook: 'js-toolbox-change-canvas', iconclass: 'icon-change-canvas', svgclass: 'svg-change-canvas' },
            { title: 'Add a story', jshook: 'js-add-story', iconclass: 'icon-add-a-story', svgclass: 'svg-add-a-story' },
            { title: 'Duplicate', jshook: 'js-toolbox-duplicate', iconclass: 'icon-duplicate', svgclass: 'svg-duplicate' },
            { title: 'Edit meta', jshook: 'js-toolbox-edit-meta', iconclass: 'icon-edit-meta', svgclass: 'svg-edit-meta', isSeparator: true },
            { title: 'Share', jshook: 'js-toolbox-share', iconclass: 'icon-share', svgclass: 'svg-share' },
            { title: 'Presentation', jshook: 'js-toolbox-presentation', iconclass: 'icon-presentation', svgclass: 'svg-presentation' },
            { title: 'Help', jshook: 'js-toolbox-help', iconclass: 'icon-help', svgclass: 'svg-help' }
        ];

        return items;
    }.property(),

    //actions: {
    //    gotoRoute:function(route){
    //        this.get('target').transitionTo(route);
    //    }
    //}

});
