import ApplicationSerializer from 'smhw-frontend/application/serializer';

export default ApplicationSerializer.extend({
  attrs: {
    teachers: {
      serialize: 'ids',
      deserialize: 'ids'
    },
    students: {
      serialize: 'ids',
      deserialize: 'ids'
    }
  }
});
