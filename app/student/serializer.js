import UserSerializer from 'smhw-frontend/user/serializer';

export default UserSerializer.extend({
  attrs: {
    parents: {
      serialize: 'ids',
      deserialize: 'ids'
    }
  }
});