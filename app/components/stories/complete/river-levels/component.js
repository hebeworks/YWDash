import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    loaded: false,
    didInsertElement: function() {
        this.set('title', 'River Level');
        this.set('subTitle', 'Water flowing under Crown Point Bridge');
        this.fetchData();
        this.setHeights();
    },
    // invoke a function called 'fetchData'
    fetchData: function() { 
        // declare a variable called 'obj' that has a value of 'this'; setting the scope of the variable to the 'fetchData' function
        var obj = this;
        // request data from the environment agency api for the Crown Point Bridge rivel level monitoring station  
        // see here for more info: http://environment.data.gov.uk/flood-monitoring/doc/reference)
        Ember.$.getJSON('http://environment.data.gov.uk/flood-monitoring/id/stations/L1707')
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
                    object.fetchData, 900000;
                });
                setTimeout(function() {
                    obj.set('loaded', true);
                });
            });
    },
    stripHTML: function(html) {
        var div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    },
    setHeights: function() {
        //var heightCurrentLevel = ((typicalRangeHigh / maxOnRecord) * 100) + " % ";
       var heightCurrentLevel = this.get("latestReading");
       console.log(heightCurrentLevel);
    }.observes("latestReading")
});

// height = 172px (.river-levels-columnChart-container-inner)
// range = maxOnRecord + 5%
// scale = height / 105 (1.6381 == 1%)
// 
// set positions in .river-levels-columnChart-container-inner

// height = 172
// heightCurrentLevel = ((typicalRangeHigh / maxOnRecord)*100) + " % "



