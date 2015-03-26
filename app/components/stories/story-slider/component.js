import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    className: 'story__carousel-wrapper',
    loaded: false,
    loadedChanged: function() {
        if (this.loaded) {
            this.renderCarousel();
        }
    }.observes('loaded'),
    renderCarousel: function() {
        var $el = Ember.$(this.get('element')).find('.js-story-carousel');
        console.log($el);
        var $pager = $el.next('.story__footer').find('.carousel-pager');

        $el.caroufredsel({
            prev: {
                button: $pager.find('.carousel-pager__btn.-prev')
            },
            pagination: $pager.find('.carousel-pager__numbers'),
            next: {
                button: $pager.find('.carousel-pager__btn.-next')
            },
            swipe: {
                onTouch: true,
                onMouse: true
            },
            auto: false
        });
    }
});
