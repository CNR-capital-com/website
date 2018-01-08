import { isUndefined } from 'underscore';

var Categorizable = require('domain_abstract/model/Categorizable');

module.exports = Categorizable.extend({

  defaults: { ...Categorizable.prototype.defaults, 
    type: 'text', // text, number, range, select
    label: '',
    name: '',
    min: '',
    max: '',
    value: '',
    target: '',
    default: '',
    placeholder: '',
    changeProp: 0,
    options: [],
    // category open by defaut?
    categoryOpen: false,
    categoryType: 'block'
  },


  initialize() {
    Categorizable.prototype.initialize.apply(this, arguments);

    const target = this.get('target');
    const name = this.get('name');
    const changeProp = this.get('changeProp');

    if (target) {
      this.target = target;
      this.unset('target');
      const targetEvent = changeProp ? `change:${name}` : `change:attributes:${name}`;
      this.listenTo(target, targetEvent, this.targetUpdated);
    }
  },


  targetUpdated() {
    const value = this.getTargetValue();
    !isUndefined(value) && this.set({ value }, { fromTarget: 1 });
  },


  getTargetValue() {
    const name = this.get('name');
    const target = this.target;
    const prop = this.get('changeProp');
    if (target) return prop ? target.get(name) : target.getAttributes()[name];
  },


  setTargetValue(value) {
    const target = this.target;
    const name = this.get('name');
    if (isUndefined(value)) return;

    if (this.get('changeProp')) {
      target.set(name, value);
    } else {
      const attrs = { ...target.get('attributes') };
      attrs[name] = value;
      target.set('attributes', attrs);
    }
  },


  /**
   * Get the initial value of the trait
   * @return {string}
   */
  getInitValue() {
    const target = this.target;
    const name = this.get('name');
    let value;

    if (target) {
      const attrs = target.get('attributes');
      value = this.get('changeProp') ? target.get(name) : attrs[name];
    }

    return value || this.get('value') || this.get('default');
  }

});
