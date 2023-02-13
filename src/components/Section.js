export default class Section {
  constructor({data, renderer}, selector) {
      this._initialArray = data;
      this._renderer = renderer;
      this._container = document.querySelector(selector);
  };

  setItem(element) {
      this._container.prepend(element);
  };

  prependItem(element) {
    this._container.prepend(element);
};

  setInitData(data) {
    this._initialArray = data;
  }

  renderItems() {
      this._initialArray.reverse().forEach(item => {
          this._renderer(item)});
  };

};