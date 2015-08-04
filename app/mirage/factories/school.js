import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name(i) {
    return "School " + i;
  },

  subdomain(i) {
    return 'school-' + i;
  },

  address(i) {
    return `${i + 1} Some Street, London`;
  },

  school_private_info_id() {
    return server.create('school_private_info').id;
  },

  announcement_category_ids() {
    return [server.create('announcement_category').id];
  },

  town: 'London',
  post_code: 'W12 8PH',
  time_zone: 'London',
  expires_on: '2015-11-24T18:00:00+00:00',
  teacher_ids: [],
  school_type: 'secondary_school',
  tag_line: 'Powering Learning',
  country: 'United Kingdom',
  prospectus_id(){
    return server.create('attachment').id;
  },
  logo_id(){
    return server.create('attachment').id;
  },
  banner_id(){
    return server.create('attachment').id;
  },
  description: 'This school is quite nice',
  twitter: '@schoolTwitterHandle',
  website: 'http://google.com',
  homepageActive: false,
  class_group_ids: []
  // This is not working because `i` doesn't necessarily match the id of the school. Has to be done
  // manuall until https://github.com/samselikoff/ember-cli-mirage/pull/82 is merged
  // links(i) {
  //   return {
  //     students: '/students?school_id=' + i,
  //     parents: '/parents?school_id=' + i,
  //     employees: '/employees?school_id=' + i
  //   };
  // }
});
