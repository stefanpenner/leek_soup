import AssignmentFactory from './assignment';

export default AssignmentFactory.extend({
  // Attributes
  __type: 'class_test',

  // Relations
  web_links: [],
  attachment_ids: [],
  submission_ids: []
});
