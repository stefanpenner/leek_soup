import ApplicationSerializer from 'smhw-frontend/application/serializer';

export default ApplicationSerializer.extend({
  attrs: {
    classGroupToDuplicateIn: {
      serialize: 'ids',
      deserialize: 'ids'
    }
  },

  normalize(type, hash, prop) {
    const currentUser = this.get('currentUser');
    const submissionIds = hash.submission_ids;

    if (['student'].some(type => type === currentUser.get('type'))) {
      const submissionIdsOfCurrentUser = submissionIds.filter(function(value) {
        return value.split('-')[1] === currentUser.get('id');
      });

      hash.submission_ids = submissionIdsOfCurrentUser;
    }

    return this._super(type, hash, prop);
  }
});
