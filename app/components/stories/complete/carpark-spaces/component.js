import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    loaded: false,
    selectedCarPark: null,
    didInsertElement: function () {
        this.set('title', 'Leeds Carparks');
        this.set('subTitle', 'Registered spaces available in Leeds');
        this.fetchData();
    },
    fetchData: function () {
        // request ckan api for dataset
        var obj = this;
        Ember.$.ajax({
            url: 'http://hebenodeapi.azurewebsites.net/carparks',
            type: 'GET',
            crossOrigin: true
        })
            .then(function (data) {
            var carParks = [];
            data.results.forEach(function (item) {
                // format API data here
                var carPark = {};
                carPark.id = item["carParkIdentity"]
                    .substr(item["carParkIdentity"].indexOf(':') + 1,
                    (item["carParkIdentity"].length - item["carParkIdentity"].indexOf(':')) - 1);
                carPark.title = item["carParkIdentity"].substr(0, item["carParkIdentity"].indexOf(':'));
                carPark.carParkOccupancy = item["carParkOccupancy"];
                carPark.totalCapacity = item["totalCapacity"];
                carPark.available = carPark.totalCapacity - carPark.carParkOccupancy;
                carParks.push(carPark);
            });
            
            carParks = _.sortBy(carParks,'title');

            obj.set('items', carParks);
            obj.set('selectedCarPark',carParks[0].id);
            
            setTimeout(function () {
                obj.set('loaded', true);
            });
        });
    },
    currentCarPark: function () {
        if (this.get('items') != null) {
            return this.get('items').findBy('id', this.get('selectedCarPark'));
        }
    }.property('selectedCarPark'),

    stripHTML: function (html) {
        var div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    }
});
