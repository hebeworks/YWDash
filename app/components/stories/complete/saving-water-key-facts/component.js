/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    
    // onInit: function() {
    //     var width = this.randomNumber();
    //     var height = (width == 1 ? 2 : 1);
    //     console.log('WIDTH:'+width+', HEIGHT:'+height);
    //     this.set('width', '-w' + width.toString())
    //     this.set('height', '-h' + height.toString());
    // }.on('init'),
    
    didInsertElement: function() {
        this.set('title', 'Tips to save');
    //     this.set('subTitle', '');
    //     var obj = this;
    //     var quotes = [
    //         'Using a washing up bowl could save you £30 a year',
    //         'Putting a full load in the washing machine can save you up to £15 a year',
    //         'Only boiling the amount of water you need could save £7 a year',
    //         'Fixing that dripping tap could save £18 a year',
    //         'Spending 1 minute less in the shower could save £100 a year', 
    //         'Using a water efficient showerhead could save £160 a year', 
    //         'Fitting a dual flush toilet mechanism could save £150 a year',
    //         'Using a watering can instead of a hose could save £15 a year',
    //         'Using all the suggested tips, a family of 4 would save £495'
    //     ]
        
    //     // randomize
    //     quotes = _.shuffle(quotes);
        
    //     this.set('items', quotes);
        
    //     this.set('randomItem',quotes[0]);
        
    //     setTimeout(function () {
    //         obj.set('loaded', true);
    //     });
    },
    // randomNumber: function() {
    //     return Math.floor(Math.random() * 2) + 1;
    // }
});
