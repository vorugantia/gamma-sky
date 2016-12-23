
export class Popup2FHL {

  private source;

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

        <h4 style='text-align:center'>` + this.source.data.Source_Name + `</h4>

          <table>
            <tbody>
              <tr>
                <td>RA:</td>
                <th>` + this.round(this.source.data.RAJ2000) + `</th>
                <td>DEC:</td>
                <th>` + this.round(this.source.data.DEJ2000) + `</th>
              </tr>
              <tr>
                <td>GLON:</td>
                <th>` + this.round(this.source.data.GLON) + `</th>
                <td>GLAT:</td>
                <th>` + this.round(this.source.data.GLAT) + `</th>
              </tr>
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td>Assoc:</td>
                <th style='width:170px'>` + this.source.data.ASSOC + `</th>
              </tr>
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td>Class:</td>
                <th style='width:170px'>` + this.source.data.CLASS + `</th>
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
  }

}
