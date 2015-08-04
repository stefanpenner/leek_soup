import { IvyRedactorComponent } from 'ivy-redactor';

export default IvyRedactorComponent.extend({
  classNames: ['smhw-rich-text-editor'],
  _setupRedactorSettings(options) {
    this._super(...arguments);
    if (this.get('minHeight')) {
      options.minHeight = this.get('minHeight');
    }
    options.plugins = ['fullscreen'];
    options.replaceTags = [['em', 'i']];
    options.buttonsHide = ['html', 'formatting', 'outdent', 'indent', 'alignment', 'horizontalrule'];
  }
});
