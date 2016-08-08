//TODO: Each catalog should have its own popup component, with its own links.
//They should also have a "detailed view" button that links from popup to
// CatViewComponent.


export class Popup {

  private source;
  private catalogName;

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

        <h4 style='text-align:center'>` + this.source.prefix + this.source.name + `</h4>

          <table>
            <tbody>
              <tr>
                <td>RA:</td>
                <th>` + this.source.ra + `</th>
                <td>DEC:</td>
                <th>` + this.source.dec + `</th>
              </tr>
              <tr>
                <td>GLON:</td>
                <th>` + this.source.glon + `</th>
                <td>GLAT:</td>
                <th>` + this.source.glat + `</th>
              </tr>
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td>Assoc:</td>
                <th style='width:170px'>` + this.source.assoc + `</th>
              </tr>
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td>` + this.source.lineFourLabel + `</td>
                <th style='width:170px'>` + this.source.lineFour + `</th>
              </tr>
            </tbody>
          </table>

        </div>

        ` + this.getSNRcatUrl() + `

    `;
  }

  getSNRcatUrl() {

    if(this.catalogName == "SNRcat") {

        return `

                <style>
                  div {
                    text-align: right;
                    margin-right: 4px;
                    font-size: 12px;
                  }
                </style>

                <div>
                  <a href='http://www.physics.umanitoba.ca/snr/SNRcat/SNRrecord.php?id=` + this.source.SNRcatID + `' target='_blank'>
                    View source on SNRcat
                  </a>
                </div>`;
      }
      else {
        return "";
      }
  }

  constructor(source, catalogName) {
    this.source = source;
    this.catalogName = catalogName;
  }

}
