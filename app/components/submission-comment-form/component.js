import Ember from 'ember';

export default Ember.Component.extend({
  commentText: '',

  //CP's
  emptyComment: Ember.computed.empty('commentText'),

  actions: {
    submitComment() {
      let user      = this.get('currentUser');
      let text      = this.get('commentText');
      this.get('submissions').forEach((submission) => {
        let comment = submission.get('comments').createRecord({ text, user });
        comment.save().then(() => this.clearComment());
      });
    },
  },

  clearComment() {
    this.set('commentText', '');
  }
});
