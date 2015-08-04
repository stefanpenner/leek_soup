import Ember from 'ember';

const { $ } = Ember;

export function initialize({ container }) {
  const session = container.lookup('simple-auth-session:main');
  const metaTag = $('meta[name="meta-auth"]');
  if (metaTag.length) {
    session.authenticate('authenticator:impersonation', metaTag.data());
  }
}

export default {
  name: 'meta-tag-authentication',
  initialize: initialize
};