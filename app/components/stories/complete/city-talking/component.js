import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    didInsertElement: function() {
        this.set('title', 'The City Talking');
        this.set('subTitle', 'Music & art events around Leeds.');
        this.fetchData();
    },
    fetchData: function() {
        Ember.$.getJSON('http://thecitytalking.com/content/?format=json&callback=?').then((data) => {
            data.items.forEach((item) => {
                // format API data here
                item.date = moment(item.publishOn).format('MMMM DD, YYYY');
                item.url = 'http://thecitytalking.com' + item.fullUrl;
                item.excerpt = this.stripHTML(item.excerpt).substring(0, 100) + '...';
            });
            console.log(data.items);
            this.set('items', data.items);
            //this.renderCarousel();
        });
    },
    renderCarousel: function() {
        var $el = Ember.$(this.get('element')).find('.js-story-carousel');
        console.log($el);
        var $pager = $el.next('.story__footer').find('.carousel-pager');
        console.log($pager);
        
        $el.caroufredsel({
            prev:       {
                button: $pager.find('.carousel-pager__btn.-prev')
            },
            pagination: $pager.find('.carousel-pager__numbers'),
            next:       {
                button: $pager.find('.carousel-pager__btn.-next')
            },
            swipe:      {
                onTouch: true,
                onMouse: true
            },
            auto: false
        });
    },
    stripHTML: function(html) {
        var div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    }
});
