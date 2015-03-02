import Ember from 'ember';

export default Ember.View.extend({
    showSubNav: false,
    actions: {
        gotoRoute:function(){
            this.sendAction();
        }
    },
    toggleSubNav : function(){
        alert('test');
        this.set('showSubNav',true);
    },
    infoView: Ember.View.extend({
        templateName: 'navigation-sub-nav',

        posts: 25,
        hobbies: "Riding bicycles"
    })
});
