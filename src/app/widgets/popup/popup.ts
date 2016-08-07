
export class Popup {

  private source;

  getDesc() {
    return this.source.name;
  }

  constructor(source) {
    this.source = source;
  }

}
