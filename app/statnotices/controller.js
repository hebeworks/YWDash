import Ember from 'ember';

export default Ember.Controller.extend({
    siteTitle: function(){
        return 'Leeds Gallery Title';
    }.property(),

    galleryNavItems: function() {

        var items = [
            { title: 'Back' },
//            { title: 'Browse' },
//            { title: 'My Collection' },
//            { title: 'Search' }
        ];

        for (var i = 0; i < items.length; i++) {
            var dashed = items[i].title.dasherize();
            items[i].dashed = '-' + dashed;
            items[i].jshook = 'js-gallery-' + dashed;
            items[i].iconclass = 'icon-' + dashed;
            items[i].svgclass = 'svg-' + dashed;
        }

        return items;
    }.property()

});