import appSerializer from '../application/serializer';


export default appSerializer.extend({
	attrs: {
        stories: { embedded: 'always' }
    }
});
