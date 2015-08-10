import ApplicationAdapter from '../application/adapter';
import Config from './../config/environment';

export default ApplicationAdapter.extend({
    host: Config.APP.statnoticeURL,
    // host: 'http://localhost:8080', // DEV
    // host: 'http://statnotices.azurewebsites.net/', // LIVE
});
