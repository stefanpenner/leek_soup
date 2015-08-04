import Ember from 'ember';

const { camelize } = Ember.String;

export default Ember.Mixin.create({
  becameInvalid(instance) {
    let collectionErrors = [];

    instance.eachRelationship((name, descriptor) => {
      if (descriptor.kind === 'hasMany') {
        collectionErrors.push(this.get(`errors.${name}.firstObject`));
        this.get('errors').remove(name);
      }
    });

    collectionErrors.compact().forEach(errorObject => {
      const attribute = camelize(errorObject.attribute);
      const message   = errorObject.message;

      this.get(attribute).toArray().forEach((element, index) => {
        let localErrors = message[index];
        if (localErrors) {
          for (let key in localErrors) {
            if (localErrors.hasOwnProperty(key)) {
              element.get('errors').add(camelize(key), localErrors[key]);
            }
          }
          element.becameInvalid(element);
        }
      });
    });
  },
});
