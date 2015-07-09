/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    didInsertElement: function() {
        this.set('title', 'compare-water-quality TITLE');
        this.set('subTitle', 'compare-water-quality SUB TITLE');
        this.getDataByPostcode('result1',this.get('postcode1'));
    },
    
    result1: null,
    result2: null,
    
    _postcode1: 'LS1 5NS',
    postcode1: Ember.computed("_postcode1", {
        get: function() {
            return this.get("_postcode1");
        },
        set: function(key, newVal) {
            this.set('_postcode1', newVal);
            return newVal;
        }
    }),
    
    _postcode2: null,
    postcode2: Ember.computed("_postcode2", {
        get: function() {
            return this.get("_postcode2");
        },
        set: function(key, newVal) {
            this.set('_postcode2', newVal);
            return newVal;
        }
    }),
    
    updateResult1: function(){
        this.getDataByPostcode('result1', this.get('postcode1'));
    }.observes('postcode1'),
    
    updateResult2: function(){
        this.getDataByPostcode('result2', this.get('postcode2'));
    }.observes('postcode2'),

    getDataByPostcode: function(resultID, postcode) {
        var obj = this;
        var url = 'http://www.ywonline.co.uk/web/postcodeanywhere.nsf/newxmllu?openagent&filt=wq&pc=' + postcode;
            url = hebeutils.Base64.encode(url);
        var apiUrl = 'http://hebenodeapi.azurewebsites.net/apiproxy?url=' + url + '&toJSON=true';
        this.getData(apiUrl)
            .then(
                function(data){
                    // success
                    console.log('compare-water-quality > getData > success');
                    // data is the response Object/Array from the AJAX request
                    var propsToInclude = [
                        'TotalHardness',
                        'Fluoride',
                        'Calcium',
                        'Iron'
                    ];
                    
                    var props = [];
                    var values = data.PC_LOOKUP.RESULTS[0].LIST[0].ITEM[0];
                    for(var prop in values) {
                        var key = prop;
                        if(propsToInclude.indexOf(prop) > -1) {
                            var value = values[prop];
                            props.push({
                               name: key,
                               value: value[0]
                            });
                        }
                    };
                    
                    var result = {
                        location: {
                            postcode: postcode,
                            name: data.PC_LOOKUP.LOCATION[0]
                        },
                        props: props
                    };
                    obj.set(resultID, result);
                },
                function(error) {
                    // failure
                    console.log('compare-water-quality > getData > error: ' + error);
                },
                function(){
                    // complete
                }
            )
    }
});
