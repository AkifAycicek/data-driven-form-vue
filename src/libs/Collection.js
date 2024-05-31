export class Collection {
  _state = {};
  _defaults = {};
  constructor(data = {}) {
    if (!isNil(data)) {
      this._state = reactive(data);
    }
    this.defaults(data);
    this.reset();
  }

  static create(attributes = {}) {
    const instance = new this(attributes || {});
    const proxy = new Proxy(instance, {
      ownKeys(target) {
        return Reflect.ownKeys(target);
      },
      get(target, key, receiver) {
        if (Reflect.has(target, key)) {
          return Reflect.get(target, key, receiver);
        }
        return get(target._state, key);
      },
      set(target, key, value, receiver) {
        if (Reflect.has(target, key)) {
          return Reflect.set(target, key, value, receiver);
        }
        return set(target._state, key, value);
      },
    });
    return proxy;
  }

  defaults(attributes) {
    this._defaults = cloneDeep(attributes);

    return this;
  }

  reset(attrs = this._defaults) {
    assign(this._state, cloneDeep(attrs));

    return this;
  }

  cleaned(isCleaned) {
    this._cleaned = isCleaned;

    return this;
  }

  get(key, defaultValue = null) {
    return get(this._state, key, defaultValue);
  }

  set(key, value = null) {
    if (typeof key === 'object') {
      this._state = key;
    } else {
      set(this._state, key, value);
    }

    return this;
  }

  merge(attributes = {}) {
    merge(this._state, attributes);

    return this;
  }

  only(...keys) {
    return pick(this.toObject(), keys);
  }

  toObject() {
    const reducerFn = (acc, value, key) => {
      if (this._cleaned && !value) {
        return acc;
      }

      set(acc, key, value);

      return acc;
    };

    const obj = cloneDeep(reduce(this._state, reducerFn, {}));

    return obj.data ? obj.data : obj;
  }

  toJson(indent = 3) {
    return JSON.stringify(...[this.toObject(), null, indent]);
  }
}
