import Ember from 'ember';

export default Ember.Test.registerHelper('currentParams', function (app) {
  const splitted = currentURL().split('?');
  if (splitted.length > 1) {
    const query = splitted[splitted.length - 1];
    const params = {};
    query.split('&').forEach((pair) => {
      const separatedPair = pair.split('=');
      params[separatedPair[0]] = separatedPair[1];
    });
    return params;
  } else {
    return {};
  }
});