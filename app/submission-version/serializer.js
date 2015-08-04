import ApplicationSerializer from 'smhw-frontend/application/serializer';

export default ApplicationSerializer.extend({
  attrs: {
    attachments: { serialize: 'ids' }
  }
});
