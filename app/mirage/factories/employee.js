import UserFactory from './user';

export default UserFactory.extend({
  employeeType: 'teacher',
  __type: 'employee',
  forename(i) {
    return 'EmployeeName' + i;
  },

  surname(i) {
    return 'EmployeeSurname' + i;
  }
});
