import { SourceSNRcat } from '../../services/source';

export class PopupSNRcat {

  private source;
  private sourceSNRcat;

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
                <th style='width:170px'>` + this.source.id_alt + `</th>
              </tr>
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td>Radius:</td>
                <th style='width:170px'>` + this.source.size_radio_mean + `&#176</th>
              </tr>
            </tbody>
          </table>

        </div>
        ` + this.getSNRcatUrl() + `

    `;
  }

  round(val) {
    return (Math.round(val * 100) / 100).toFixed(2);
  }

  getSNRcatUrl() {

    return `
        <div class='popup-link'>
            <a href='` + this.sourceSNRcat.getSNRcatUrl(this.getSNRcatId()) + `' target='_blank'>
            View source on SNRcat
            </a>
        </div>
              `;

  }

  getSNRcatId() {
    return this.source.snrcat_id;
  }

  constructor(source) {
    this.source = source;
    this.sourceSNRcat = new SourceSNRcat(this.source);
  }

}
