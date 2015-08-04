import AssignmentSerializer from 'smhw-frontend/assignment/serializer';

export default AssignmentSerializer.extend({
  attrs: {
    attachments: {
      serialize: 'ids',
      deserialize: 'ids'
    }
  }
});
