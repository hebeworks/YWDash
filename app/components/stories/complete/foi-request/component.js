import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    
    setup: function () {
        this.setProperties({
        });
    }.on('init'),

    didInsertElement: function () {
        this.set('title', '');
        this.set('subTitle', 'In the city centre');
        var obj = this;
//1ffffdba-ef32-40de-b73a-7026969d35b2
        this.getData(this.get('datamillUrl') + '/api/action/datastore_search?resource_id=c2bb0c3e-52fd-4183-8727-6b9f40b829f0')
            .then(function (data) {
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

});
