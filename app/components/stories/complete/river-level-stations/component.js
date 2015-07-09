/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    didInsertElement: function() {
        this.set('title', 'Leeds River Levels');
        this.set('subTitle', "The most recent levels for Leeds' rivers");
        var obj = this;
        var url = 'http://environment.data.gov.uk/flood-monitoring/id/stations?town=Leeds';
        this.getData(url)
            .then(
                function(data){
                    var stations = [];
                    data.items.forEach((item) => {
                        var station = Ember.Object.create({
                            id: item.stationReference,
                            label: item.label,
                            currentMeasure: { date: null, value: 'loading' }
                        })  ;
        
                        stations.push(station);
                    });
                    obj.set('stations', stations);
                    obj.loadMeasures();
                    
                    setTimeout(() => {
                        obj.set('loaded', true);
                    });
                },
                function(error) {
                    // failure
                    console.log('river-level-stations > getData > error: ' + error);
                },
                function(){
                    // complete
                }
            )
    },
    
    loadMeasures: function(){ 
        var obj = this;
        var stations = this.get('stations');
        if(stations != null) {
           stations.forEach(function(station){
               obj.getMeasures(station.id, function(measure){
                   station.set('currentMeasure', measure);
               }); 
            });
        }
    },
    
    getMeasures: function(stationID, callback) {
        var obj = this;
        var url = 'http://environment.data.gov.uk/flood-monitoring/id/stations/' + stationID;
        console.log('URL: ' + url);
        obj.getData(url,true)
            .then(function(data){
                    var measure = {
                        date: moment(data.items.measures.latestReading.dateTime),
                        value: data.items.measures.latestReading.value
                    }
                    callback(measure);
                },
                function(error) {
                    // failure
                    console.log('river-level-stations > getData > error: ' + error.message);
                },
                function(){
                    // complete
                }
            )
    }
});
