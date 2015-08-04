import Ember from 'ember';

const { computed, run, isBlank } = Ember;

export function nullifyCP() {
  return computed({
    get() { return null; },
    set(_,v) { return isBlank(v) ? null : v; }
  });
}

export function debouncedCP(dependentKey, callback) {
  return computed(dependentKey, {
    get() {
      return this.get(dependentKey) || null;
    },
    set(_, v, oldVal) {
      if (v !== oldVal) {
        run.debounce(this, callback, dependentKey, v, 200);
      }
      return oldVal || null;
    }
  });
}

export function breadCrumbCP(key, options) {
  return computed(function() {
    let model = this.modelFor(this.routeName);
    if(options && options.useModel && model) {
      return Object.assign({ title: model.get(key) }, options);
    } else {
      return Object.assign({ title: this.i18n.t(key) }, options);
    }
  });
}

export function nullifyCPWithDependant(dependentKey) {
  return computed(dependentKey, {
    get() { return null; },
    set(_,v) {
      this.set(dependentKey, null);
      if (isBlank(v)) {
        return null;
      } else {
        return v;
      }
    }
  });
}

export function undefinedCPWithDependant(dependentKey) {
  return computed(dependentKey, {
    get() { return undefined; },
    set(_,v) {
      this.set(dependentKey, undefined);
      if (isBlank(v)) {
        return undefined;
      } else {
        return v;
      }
    }
  });
}

export function clearErrorsCP() {
  return computed({
    get() { return; },
    set(key, value) {
      this.get('errors').remove(key);
      return value;
    }
  });
}

export function highlightCP(sourceKey, segmentKey) {
  return computed(sourceKey, segmentKey, function() {
    const text    = this.get(sourceKey);
    const segment = this.get(segmentKey);
    if (text) {
      const highlighted = text.replace(new RegExp(`(${segment})`, "gi"), "<em>$1</em>");
      return Ember.String.htmlSafe(highlighted);
    }
  });
}
