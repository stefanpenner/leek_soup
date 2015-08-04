import AssignmentFactory from './assignment';

export default AssignmentFactory.extend({
  // Attributes
  hand_in_online: true,
  duration: 30,
  duration_units: 'hours',
  __type: 'homework',

  // Relations
  web_links: [],
  attachment_ids: [],
  submission_ids: []
});
