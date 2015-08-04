import UserFactory from './user';

export default UserFactory.extend({
  __type: 'student',
  forename(i) {
    return 'StudentName' + i;
  },

  surname(i) {
    return 'StudentSurname' + i;
  }
});