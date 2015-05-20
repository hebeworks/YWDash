import Ember from 'ember';

export default Ember.Component.extend({
    svgClass: function(){
        return 'svg-house-price-icon-' + this.get('icon');
    }.property(),
    
    graphParams: {
        data: {
            columns: [
                ['leeds', 190, 193, 192, 195, 196, 199, 198, 200],
                ['national', 210, 210, 210, 210, 210, 210, 210, 210],
                ['x', 'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August']
//                ['data1', 30, 200, 100, 400, 150, 250],
//                ['data2', 130, 100, 140, 200, 150, 50]
            ],
            type: 'line',
            colors: {
                data1: '#7ED321',
                data2: '#2980B9'
            },
            axis: {
                x: {
                    type: 'timeseries'
                }
            }
        }
    }

});
