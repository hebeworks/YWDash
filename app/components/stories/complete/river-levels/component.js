import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    loaded: false,
    selectedStation: null,
    didInsertElement: function() {
        this.set('title', 'Live River Level');
        this.set('subTitle', 'Water flowing under Crown Point Bridge');
        //this.fetchStations();
        this.fetchData();
    },

    // fetchStations: function() {
    //     var obj = this;
    //     Ember.$.getJSON('http://environment.data.gov.uk/flood-monitoring/id/stations?town=Leeds')
    //         .then(function (data){
    //             var results = [];
    //             data.items.forEach(function (item){
    //                 var items = {};
    //                 items.id = item["@id"];
    //                 items.name = item["label"];
    //                 results.push(items);
    //             });
    //             results = _.sortBy(results, "name");
    //             obj.set('stations', results);
                
    //             var firstObj = obj.get('stations')[0];
    //             obj.set('selectedStation', firstObj);

    //             setTimeout(function () {
    //                 obj.set('loaded', true);
    //             });

    //             console.log("the selected stations is " + selectedStation);
    //     });
    // },
    
    fetchData: function() { 
        var obj = this;
        // var stationUrl = 'http://environment.data.gov.uk/flood-monitoring/id/stations/L1707';
        // var selectedStation = obj.get('selectedStation');
        // if(selectedStation != null) {
        //     stationUrl = obj.get('selectedStation').id;
        // }
        // console.log('fetchData selectedStation: ' + stationUrl);

        Ember.$.getJSON('http://environment.data.gov.uk/flood-monitoring/id/stations/L1707')
        //Ember.$.getJSON(stationUrl)
            // format the api response data here
            .then(function(station){
                var item = station.items; 
                var latestReading = item.measures.latestReading;
                var maxOnRecord = item.stageScale.maxOnRecord;
                var minOnRecord = item.stageScale.minOnRecord;
                var highestRecent = item.stageScale.highestRecent;
                var typicalRangeHigh = item.stageScale.typicalRangeHigh;
                var typicalRangeLow = item.stageScale.typicalRangeLow;
                obj.setProperties({
                    latestReading: latestReading,
                    maxOnRecord: maxOnRecord,
                    minOnRecord: minOnRecord,
                    highestRecent: highestRecent,
                    typicalRangeHigh: typicalRangeHigh,
                    typicalRangeLow: typicalRangeLow,
                });
                // check for changes to the api data every fifteen minutes
                setTimeout(function() {
                    obj.fetchData, 900000;
                });
                setTimeout(function() {
                    obj.set('loaded', true);
                });
            });
    }.observes('selectedStation'),

    setHeights: function() {
        var obj = this;
        var heightLowest = ((this.get("minOnRecord.value") / this.get("maxOnRecord.value")) * 100);
        console.log("height lowest = " + heightLowest);
        var heightTypicalHigh = (((this.get("typicalRangeHigh") / this.get("maxOnRecord.value")) * 100) - heightLowest);
        console.log("height typical high = " + heightTypicalHigh);
        var heightHighestRecent = (((this.get("highestRecent.value") / this.get("maxOnRecord.value")) * 100) - (heightLowest + heightTypicalHigh));
        console.log("height highest = " + heightHighestRecent);
        var heightMax = (100 - (heightLowest + heightTypicalHigh + heightHighestRecent));
        console.log("height max = " + heightMax);
        obj.setProperties({
            heightLowest: heightLowest,
            heightTypicalHigh: heightTypicalHigh,
            heightHighestRecent: heightHighestRecent,
            heightMax: heightMax,
        });
        var heightLowestString = heightLowest.toString() + '%';
        this.$( ".river-levels-columnChart-container-inner--lowestLevel" ).height( heightLowestString );
        var heightTypicalHighString = heightTypicalHigh.toString() + '%';
        this.$( ".river-levels-columnChart-container-inner--typicalHighLevel" ).height( heightTypicalHighString );
        var heightHighestRecentString = heightHighestRecent.toString() + '%';
        this.$( ".river-levels-columnChart-container-inner--highestLevelRecent" ).height( heightHighestRecentString );
        var heightMaxString = heightMax.toString() + '%';
        this.$( ".river-levels-columnChart-container-inner--maxLevel" ).height( heightMaxString );

    }.observes("minOnRecord.value", "typicalRangeHigh","maxOnRecord.value","highestRecent"),

        stripHTML: function(html) {
        var div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    }

});




