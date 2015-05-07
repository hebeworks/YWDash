export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
}

export default {
  name: 'inject-store-to-components',
  initialize: function(container, application){
      container.register('store:main', 'app.store');
      container.injection('component', 'store', 'store:main'); 
  }
};