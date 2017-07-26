import { PopupBase } from './popup';
import { SourceSNRcat } from '../../services/source';

export class PopupSNRcat extends PopupBase {

  private sourceSNRcat = new SourceSNRcat(this.source);

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

}
