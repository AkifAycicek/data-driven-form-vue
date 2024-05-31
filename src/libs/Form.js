import { diff, updatedDiff } from 'deep-object-diff';
import Validator from 'validatorjs';
import Errors from 'validatorjs/src/errors';
import en from 'validatorjs/src/lang/en.js';

Validator.setMessages('en', en);
Validator.useLang('en', Validator.getMessages('en'));

Validator.setAttributeFormatter((attr) => {
  return attr
    .split('.')
    .map((e) => {
      if (Number.isNaN(Number.parseInt(e))) return e;
    })
    .join(' ');
});

export class Form extends Collection {
  rules = undefined;
  stopAutoValidation = () => {};
  errors = reactive(new Errors());
  isValid = true;
  _autoValidating = false;

  constructor({ data, rules, autoValidate = false }) {
    super(data);
    this.defaults(data);
    this.rules = rules;

    if (autoValidate === true) {
      this.setupAutoValidation();
    }
  }

  setupAutoValidation() {
    if (!this._autoValidating) {
      this._autoValidating = true;

      const terminate = watch(
        () => this.changedData,
        () => {
          this.isValid = this.validate(updatedDiff(this.changedData, this.rules));
        },
        { deep: true, immediate: true, flush: 'post' },
      );

      this.stopAutoValidation = () => {
        if (this._autoValidating) {
          terminate();
          this._autoValidating = false;
        }
      };
    }
    return this;
  }
  validate(rules = this.rules) {
    const validation = new Validator(this._state, rules);
    assign(this.errors, validation.errors);
    const passed = validation.passes();
    this.isValid = passed;

    return passed;
  }

  reset(attrs = this._defaults) {
    super.reset(attrs);
    this.errors = reactive(new Errors());
    return this;
  }

  setRules(rules = {}) {
    this.rules = rules;
    return this;
  }

  get changedData() {
    return diff(this._defaults, this._state);
  }
}
