import DS from 'ember-data';

export default DS.Model.extend({
  contentType:  DS.attr('string'),
  filename:     DS.attr('string'),
  fileSize:     DS.attr('string'),
  fileUrl:      DS.attr('string'),

  crocodocUuid: DS.attr('string'),
  crocodocUrl:  DS.attr('string'),
  previewUrl:   DS.attr('string'),
  createdAt:    DS.attr('date'),
  updatedAt:    DS.attr('date'),
  file:         DS.attr('file'),

  assignAttributesFromFile(file) {
    this.set('file', file);
    this.set('filename', file.name);
  },

  // Relations
  user: DS.belongsTo('user', { async: true }), // TODO: Make it polymorphic DS.belongsTo('user', { polymorphic: true, async: true })
  attachable: DS.belongsTo('with-attachments', { async: true, polymorphic: true }),
});
