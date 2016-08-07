
export class Popup {

  private source;

  getDesc() {
    return `

      <style>

        li {
          background-color: #bababa;
        }

      </style>

      <ul>
        <li>` + this.source.name + `
      </ul>

    `;
  }

  constructor(source) {
    this.source = source;
  }

}
