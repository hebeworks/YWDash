import Ember from 'ember';

export function statnoticeTypeIcon(params/*, hash*/) {
    if(params != null){
      return 'svg-stat-notices-icon-' + params[0].toLowerCase();      
    }
}

export default Ember.HTMLBars.makeBoundHelper(statnoticeTypeIcon);