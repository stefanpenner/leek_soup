import ApplicationSerializer from 'smhw-frontend/application/serializer';

export default ApplicationSerializer.extend({
  attrs: {
    userPrivateInfo: {
      serialize: 'records',
      deserialize: 'ids'
    }
  }
});
