class PopupBase {

  public source;

  constructor(source) {
    this.source = source;
  }

  public round(val) {
    return val.toFixed(3);
  }

  public getCatLink(cat) {

    let url = '#cat/' + cat + '/' + this.source.source_id;

    return `
        <div class='popup-link'>
          <a href=` + url + `>
            Go to details page
          </a>
        </div>
    `
  }

}

export { PopupBase };
