import { SourceTeV } from '../../services/source';

export class PopupTeV {

  private source;
  private sourceTeV;

  getDesc() {

    // This function returns the whole template to be displayed in the
    // MapComponent's popups.

    return `

      <style>
      .aladin-popup {
        width: 280px;
        text-align: left;
      }

      table, table tbody {
        width: 270px;
        text-align: left;
      }

      table th {
        height: 30px;
      }

      </style>

      <div>

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
                <th style='width:170px'>` + this.sourceTeV.other_names_str() + `</th>
              </tr>
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td>Class:</td>
                <th style='width:170px'>` + this.sourceTeV.class_str() + `</th>
              </tr>
            </tbody>
          </table>

        </div>

    `;

  }

  round(val) {
    return (Math.round(val * 100) / 100).toFixed(2);
  }

  constructor(source) {
    this.source = source;
    this.sourceTeV = new SourceTeV(this.source);
  }

}
