export class Count {
  _id = 0;
  _count = 0;
  _name = "";

  constructor(id, count, name) {
    this._id = id;
    this._name = name;
    this._count = count;
  }

  get count() {
    return this._count;
  }
}

export const EMPTY_COUNT = Object.freeze(new Count(-1, 0, "none"));
