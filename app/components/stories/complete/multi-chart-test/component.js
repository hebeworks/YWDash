import Ember from 'ember';

export default Ember.Component.extend({
    title: 'Testing Line Component',
    subTitle: 'Line chart',
    lineData : [{
        x: 'Jan',
        y: 5
    }, {
        x: 'Feb',
        y: 20
    }, {
        x: 'Mar',
        y: 10
    }, {
        x: 'Apr',
        y: 40
    }, {
        x: 'May',
        y: 5
    }, {
        x: 'Jun',
        y: 60
    }],
    barData:[
        {
            x:   'A',
            y: 4
        },
        {
            x:   'B',
            y: 13
        },
        {
            x:   'C',
            y: 40
        },
        {
            x:   'D',
            y: 20
        }, {
            x:   'E',
            y: 19
        },
        {
            x:   'F',
            y: 44
        }, {
            x:   'G',
            y: 57
        },
        {
            x:   'H',
            y: 37
        }
    ]
});
