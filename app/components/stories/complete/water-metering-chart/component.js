/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    
    
        graphParams: {
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 130, 100, 140, 200, 150, 50]
            ],
            type: 'bar',
            colors: {
                data1: '#7ED321',
                data2: '#2980B9'
            }
        }
    },
    
    data: [
        {
            x:   '1',
            y: 4
        },
        {
            x:   '10',
            y: 13
        },
        {
            x:   '15',
            y: 40
        },
        {
            x:   '2',
            y: 20
        }, {
            x:   '25',
            y: 19
        },
        {
            x:   '30',
            y: 44
        }, {
            x:   '36',
            y: 57
        },
        {
            x:   '100',
            y: 37
        }
    ],
    
    didInsertElement: function() {
        this.set('title', 'Water Meter Readinfs');
        this.set('subTitle', 'The increase in automatic meter readings');
        var obj = this;

        var url = this.get('datamillUrl') + '/api/action/datastore_search?resource_id=c2bb0c3e-52fd-4183-8727-6b9f40b829f0';



/*
        this.getData(url)
            .then(
                function(data){
                    setTimeout(() => {
                        obj.set('loaded', true);
                    });
                },
                function(error) {
                    // failure
                },
                function(){
                    // complete
                }
            )
*/
    }
});





