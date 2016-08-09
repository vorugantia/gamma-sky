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

  getSNRcatUrl(snrcat_id) {
    return "http://www.physics.umanitoba.ca/snr/SNRcat/SNRrecord.php?id=" + this.data[snrcat_id];
  }

}
