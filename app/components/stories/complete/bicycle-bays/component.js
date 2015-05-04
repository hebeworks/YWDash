import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    loaded: false,
    didInsertElement: function() {
        this.set('title', 'Bicyle Bays');
        this.set('subTitle', 'bicycle-bays SUB TITLE');
        this.fetchData();
    },
    fetchData: function() {
        Ember.$.getJSON('http://www.leedsdatamill.org/api/action/datastore_search?resource_id=c2bb0c3e-52fd-4183-8727-6b9f40b829f0').then((data) => {
            var items = [];
            data.result.records.forEach((tmpItem) => {
                var item = {
                    street: tmpItem.Street,
                    ward: tmpItem.Ward,
                    lat: tmpItem.Lat,
                    lng: tmpItem.Long,
                    type: tmpItem.Type,
                    colour: tmpItem.Colour
                };
                items.push(item);
            });
            this.set('items', items);
            setTimeout(() => {
                this.set('loaded', true);
            });
        });
    }
});
