export class Count {
  _id = 0;
  _name = "";
  _count = 0;

  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }

  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
  get count() {
    return this._count;
  }
  set count(value) {
    this._count = value;
  }

  constructor(id, name, count) {
    this._id = id;
    this._name = name;
    this._count = count;
  }

  convert() {
    return {
      id: this._id,
      name: this._name,
      count: this._count,
    };
  }
}

export const EMPTY_COUNT = Object.freeze(new Count(-1, "none", 0));
