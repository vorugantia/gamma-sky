import { SourceTeV } from '../../services/source';

export class PopupTeV {

  private source;
  private sourceTeV;

  getDesc() {

    // This function returns the whole template to be displayed in the
    // MapComponent's popups.

    return `

      <div class='popup-info'>

        <h4 style='text-align:center'>` + this.source.common_name + `</h4>

          <table>
            <tbody>
              <tr>
                <td>RA:</td>
                <th>` + this.round(this.source.ra) + `</th>
                <td>DEC:</td>
                <th>` + this.round(this.source.dec) + `</th>
              </tr>
              <tr>
                <td>GLON:</td>
                <th>` + this.round(this.source.glon) + `</th>
                <td>GLAT:</td>
                <th>` + this.round(this.source.glat) + `</th>
              </tr>
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td>Other names:</td>
                <th style='width:170px'>` + this.sourceTeV.comma_space(this.source.other_names) + `</th>
              </tr>
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td>Class:</td>
                <th style='width:170px'>` + this.sourceTeV.comma_space(this.source.classes) + `</th>
              </tr>
            </tbody>
          </table>

        </div>
        ` + this.getSourceDetailUrl() + `
    `;
  }

  round(val) {
    return (Math.round(val * 100) / 100).toFixed(2);
  }

  getSourceDetailUrl() {

    return `
        <div class='popup-link'>
          <a href="#cat/tev/`+this.source.source_id+`">
            More information
          </a>
        </div>
    `
  }

  constructor(source) {
    this.source = source;
    this.sourceTeV = new SourceTeV(this.source);
  }

}
