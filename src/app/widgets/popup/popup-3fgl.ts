import { PopupBase } from './popup';

export class Popup3FGL extends PopupBase {

  getDesc() {
    // This function returns the whole template to be displayed in the
    // MapComponent's popups.
    return `

      <div class='popup-info'>

        <h4 style='text-align:center'>` + this.source.Source_Name + `</h4>

          <table>
            <tbody>
              <tr>
                <td>RA:</td>
                <th>` + this.round(this.source.RAJ2000) + `</th>
                <td>DEC:</td>
                <th>` + this.round(this.source.DEJ2000) + `</th>
              </tr>
              <tr>
                <td>GLON:</td>
                <th>` + this.round(this.source.GLON) + `</th>
                <td>GLAT:</td>
                <th>` + this.round(this.source.GLAT) + `</th>
              </tr>
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td>Assoc:</td>
                <th style='width:170px'>` + this.source.ASSOC1 + `</th>
              </tr>
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td>Class:</td>
                <th style='width:170px'>` + this.source.CLASS1 + `</th>
              </tr>
            </tbody>
          </table>

        </div>
        ` + this.getCatLink('3fgl') + `
    `;
  }

}
