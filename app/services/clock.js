import Ember from 'ember';
const { computed, run } = Ember;
const syncTime = 15000; // 15s
const sampleSpaceSize = 3;

export default Ember.Service.extend({
  // Hooks
  init() {
    this.adapter = this.container.lookup('adapter:application');
    this.lastCorrections = [];
    this.interval = 333;
    this.reset();
    this.tickInterval = setInterval(this.tick.bind(this), this.interval);
    this.tick();
    if (!Ember.testing) {
      this.syncInterval = setInterval(this.sync.bind(this), syncTime);
      this.sync();
    }
  },

  willDestroy() {
    window.clearInterval(this.tickInterval);
    window.clearInterval(this.syncInterval);
  },

  // CPs
  now: computed(function() {
    return new Date(+new Date() + this.get('timeCorrection'));
  }).volatile(),

  // When a value is set it automatically averages with the last 3 values.
  timeCorrection: computed({
    get() { return 0; },
    set(_, v) {
      let len = this.lastCorrections.push(v);
      if (len > sampleSpaceSize) { this.lastCorrections.shift(); }
      return this.lastCorrections.reduce((sum, n) => sum + n, 0) / this.lastCorrections.length;
    }
  }),

  // Methods
  reset() {
    const second = 0;
    const minute = 0;
    const hour   = 0;
    this.setProperties({ second, minute, hour });
  },

  tick() {
    const now = this.get('now');
    const second = now.getSeconds();
    const minute = now.getMinutes();
    const hour   = now.getHours();
    if (Ember.testing) {
      const self = this;
      run(function() {
        self.setProperties({ second, minute, hour });
      });
    } else {
      this.setProperties({ second, minute, hour });
    }
  },

  sync() {
    const initialTime = +new Date();
    this.adapter.ajax(Ember.String.singularize(this.adapter.buildURL('/heartbeat')))
      .then(({ time }) => {
        const now = +new Date();
        this.set('timeCorrection', +new Date(time) - now - (initialTime - now) / 2);
      })
      .catch(console.log.bind(console));
  }
});
