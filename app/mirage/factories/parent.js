import UserFactory from './user';

export default UserFactory.extend({
  __type: 'parent',
  forename(i) {
    return 'ParentName' + i;
  },

  surname(i) {
    return 'ParentSurname' + i;
  }
});
