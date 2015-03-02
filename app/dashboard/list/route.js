import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return [
            {
                id: 1,
                title: 'Dash 1',
                category: 'Sports',
                icon: 'assets/images/icons/Sports.png'
            },
            {
                id: 2,
                title: 'Dash 2',
                category: 'Transport',
                icon: 'assets/images/icons/Sports.png'
            }
        ];
    },

    renderTemplate: function() {
        this.render({ outlet: 'body' });
    },

    actions: {
        showTab: function(tab){
            console.log('Route > show tab = '+tab);
            // add dashboard-library-category-view
            this.render('dashboard.list.tabs.'+tab, {
                into: 'dashboard.list'
            });
        }
    }
});
