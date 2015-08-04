import UserSerializer from 'smhw-frontend/user/serializer';

export default UserSerializer.extend({
  attrs: {
    student: {
      serialize: 'ids',
      deserialize: 'ids'
    }
  }
});