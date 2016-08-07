
export class Popup {

  private source;
  private catalogName;

  getDesc() {

    // This function returns the whole template to be displayed in the
    // MapComponent's popups.

    return `

      <style>
      .aladin-popup {
        width: 270px;
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
                <th style='width:155px'>` + this.source.assoc + `</th>
              </tr>
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td>` + this.source.lineFourLabel + `</td>
                <th style='width:155px'>` + this.source.lineFour + `</th>
              </tr>
            </tbody>
          </table>

        </div>

        ` + this.getSNRcatUrl() + `

    `;
  }

  getSNRcatUrl() {

    // This function returns the URL link to SNRcat, constructing the URL based
    // on the source's RA and DEC (this is how SNRcat made their source URLs).

    if(this.catalogName == "SNRcat") {

        var glon = this.source.glon.toString();
        var glat = this.source.glat.toString();

        var glonD = glon.substring(0, (glon.length - 3));
        var glonM = glon.substring((glon.length - 2), (glon.length - 1));

        var operation;
        var glatD;
        var glatM = glat.substring((glat.length - 2), (glat.length - 1));
        if(glat.substring(0, 1) == "-") {
          glatD = glat.substring(1, (glat.length - 3));
          operation = "m";
        }
        else {
          glatD = glat.substring(0, (glat.length - 3));
          operation = "p";
        }

        if(glonD.length == 1) {
          glonD = "00" + glonD;
        }
        if(glonD.length == 2) {
          glonD = "0" + glonD;
        }

        if(glatD.length == 1) {
          glatD = "0" + glatD;
        }

        var UrlId = "G" + glonD + "." + glonM + operation + glatD + "." + glatM;

        return `

                <style>
                  div {
                    text-align: right;
                    margin-right: 4px;
                    font-size: 12px;
                  }
                </style>

                <div>
                  <a href='http://www.physics.umanitoba.ca/snr/SNRcat/SNRrecord.php?id=` + UrlId + `' target='_blank'>
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
