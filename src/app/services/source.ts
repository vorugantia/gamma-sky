export class SourceTeV {
  public data;

  // id: number;
  // Source_Name: string;
  // Other_Names: string;
  // Type: string;
  // RA: number;
  // DEC: number;
  // GLON: number;
  // GLAT: number;

  constructor(data) {
    this.data = data;
  }

}


export class Source3FGL {
  public data;

  // id: number;
  // Source_Name: string;
  // RAJ2000: number;
  // DEJ2000: number;
  // GLON: number;
  // GLAT: number;
  // ASSOC1: string;
  // CLASS1: string;

  constructor(data) {
    this.data = data;
  }

}

export class Source2FHL {
  // id: number;
  // Source_Name: string;
  // RAJ2000: number;
  // DEJ2000: number;
  // GLON: number;
  // GLAT: number;
  // ASSOC: string;
  // CLASS: string;

  public data;

  constructor(data) {
    this.data = data;
  }
}

export class SourceSNRcat {
  // id: number;
  // Source_Name: string;
  // RAJ2000: number;
  // DEJ2000: number;
  // GLON: number;
  // GLAT: number;
  // id_alt: string;  // This is the "Assoc" for SNRcat
  // size_radio_mean: number;

  public data;

  constructor(data) {
    this.data = data;
  }

  getSNRcatUrl() {

    // This function returns the URL link to SNRcat, constructing the URL based
    // on the source's RA and DEC (this is how SNRcat made their source URLs).

        var glon = this.data.glon.toString();
        var glat = this.data.glat.toString();

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

        var url = "http://www.physics.umanitoba.ca/snr/SNRcat/SNRrecord.php?id=" + UrlId;
        return url;


  }

}
