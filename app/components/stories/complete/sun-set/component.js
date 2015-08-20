/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    didInsertElement: function() {
        this.set('title', '');
        this.set('subTitle', '');
        this.loadAPIData();
    },

    loadAPIData: function() {
      var obj = this;
      var url = 'http://api.sunrise-sunset.org/json?lat=53.8007554&lng=-1.5490774&date=today&formatted=0';
      this.getData(url)
          .then(
              function(tmpItem){
                  console.log('sun-rise > getData > success');
                      var id = hebeutils.guid();
                      var item = {
                          id: id,
                          sunset: tmpItem.results.sunset,
                      };
                  
                  // fetch the data again once the current sunrise has passed
                  //debugger;
                  var millisecondsUntilNextRefresh =  moment(new Date()).diff(moment(new Date(item.sunset)));
                  setTimeout(function(){ obj.loadAPIData(); },millisecondsUntilNextRefresh);

                  item.sunsetFormatted = moment(new Date(item.sunset)).locale('en').format('hh:mm A');
                  obj.set('item', item);
                  setTimeout(() => {
                      obj.set('loaded', true);
                  });
              },
              function(error) {
                  // failure
                  console.log('sun-rise > getData > error: ' + error);
              },
              function(){
                  // complete
              }
          )

    },

    setCountdown: function() {
      var obj = this;
      setTimeout(function(){
        obj.setCountdown();
      }, 1000)
      var timeUntilsunset =  moment(moment(new Date(obj.get('item.sunset'))).diff(moment(new Date()))).format('hh:mm:ss');;
      this.set('sunsetCountdown',timeUntilsunset);
    }.observes('item.sunset')
});