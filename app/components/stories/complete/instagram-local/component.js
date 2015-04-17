import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    loaded: false,
    didInsertElement: function() {
        this.set('title', 'instagram-local TITLE');
        this.set('subTitle', 'instagram-local SUB TITLE');
        this.fetchData();
    },
    fetchData: function() {
        var client_id = 'd2aa97687743475784ecef07442f2e7b';
        var location = App.get('locationCentre');
        debugger;
        var url = 'https://api.instagram.com/v1/media/search?lat='+location.latitude+'&lng='+location.longitude+'&client_id='+client_id;

        Ember.
            Ember.$.ajax({
                url: url,
                type: 'GET',
                crossOrigin: true
            })
            .then(function(data) {
                data.items.forEach(function(item) {
                    // format API data here
                    item.date = moment(item.publishOn).format('MMMM DD, YYYY');
                    item.url = 'http://thecitytalking.com' + item.fullUrl;
                    item.excerpt = this.stripHTML(item.excerpt).substring(0, 100) + '...';
                });
                this.set('items', data.items);
                setTimeout(function() {
                    this.set('loaded', true);
                });
            });
    },
    stripHTML: function(html) {
        var div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    }
});
