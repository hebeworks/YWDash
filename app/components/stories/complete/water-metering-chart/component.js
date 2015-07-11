/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,


    graphParams: null,
    didInsertElement: function () {
        this.set('title', 'Water Meter Readings');
        this.set('subTitle', 'The increase in automatic meter readings');
        var obj = this;

        var url = 'http://hebenodeapi-preview.azurewebsites.net/yorkshirewater?dataset=yorkshirewatermeterreadings';

        this.getData(url)
            .then(
                function (data) {
                    var graphParams = {
                        data: {
                            columns: [],
                                // ['data1', 30, 200, 100, 400, 150, 250],
                                // ['data2', 130, 100, 140, 200, 150, 50]
                            // ],
                            type: 'bar',
                            colors: {
                                data1: '#4A90E2',
                                data2: '#A2DAFF'
                            }
                        },
                        // axis: {
                        //     x: {
                        //         type: 'timeseries'    
                        //     }
                        // }
                    };
                    
                    var col1 = ['Customer'];
                    var col2 = ['Automatic'];
                    
                    data = _.sortBy(data, 'Date');


                    data.forEach(function(item){
                        var readings = item.Reading_Counts;
                        col1.push(readings["Customer's own reading"])
                        col2.push(readings["Actual Automated Meter Reading"])
                    });
                    
                    graphParams.data.columns.push(col1);
                    graphParams.data.columns.push(col2);

                    obj.set('graphParams', graphParams);
                    
                    setTimeout(() => {
                        obj.set('loaded', true);
                    });
                },
                function(error) {
                    // failure
                },
                function() {
                    // complete
                }
            )

    }
});


    // {
    //                     data: {
    //                         columns: [
    //                             ['data1', 30, 200, 100, 400, 150, 250],
    //                             ['data2', 130, 100, 140, 200, 150, 50]
    //                         ],
    //                         type: 'bar',
    //                         colors: {
    //                             data1: '#7ED321',
    //                             data2: '#2980B9'
    //                         }
    //                     }
    //                 },
        
    
    // data: [
    //     {
    //         x:   '1',
    //         y: 4
    //     },
    //     {
    //         x:   '10',
    //         y: 13
    //     },
    //     {
    //         x:   '15',
    //         y: 40
    //     },
    //     {
    //         x:   '2',
    //         y: 20
    //     }, {
    //         x:   '25',
    //         y: 19
    //     },
    //     {
    //         x:   '30',
    //         y: 44
    //     }, {
    //         x:   '36',
    //         y: 57
    //     },
    //     {
    //         x:   '100',
    //         y: 37
    //     }
    // ],
    



