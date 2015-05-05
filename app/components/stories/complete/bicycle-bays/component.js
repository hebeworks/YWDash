import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    setup: function () {
        this.setProperties({
            lat: 53.801277,
            lng: -1.548567,
            zoom:12,
            markers: Ember.A([]),
            selectedItem: null
        });
    }.on('init'),

    didInsertElement: function () {
        this.set('title', 'Bicyle Bays');
        this.set('subTitle', 'In the city centre');
        this.fetchData();
    },

    fetchData: function () {
        var obj = this;
        Ember.$.getJSON('http://www.leedsdatamill.org/api/action/datastore_search?resource_id=c2bb0c3e-52fd-4183-8727-6b9f40b829f0').then((data) => {
            var items = [];
            data.result.records.forEach((tmpItem) => {
                var id = hebeutils.guid();
                var item = {
                    id: id,
                    street: tmpItem.Street,
                    ward: tmpItem.Ward,
                    lat: (tmpItem.Lat == null ? tmpItem["Lat "] : tmpItem.Lat),
                    lng: tmpItem.Long,
                    type: tmpItem.Type,
                    colour: tmpItem.Colour
                };

                items.push(item);
            });

            obj.set('items', items);

            setTimeout(() => {
                obj.set('loaded', true);
            });
        });
    },

    setupMarkers: function () {
        var item = this.get('selectedItem');
        if (item != null) {
            var markers = Ember.A([
                { title: item.street, lat: item.lat, lng: item.lng, body: item.street }
            ]);
            this.set('lat',item.lat);
            this.set('lng',item.lng);
            this.set('markers', markers);
            this.set('zoom',16);
        }
    }.observes('selectedItem')
});
