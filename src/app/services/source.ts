const pos_precision = 3;

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

  // ra_str() {
  //     return this.ra.toFixed(pos_precision) + ' deg';
  //   //   return this._pos_with_err_str('RA');
  // }
  // dec_str() {
  //     return this.dec.toFixed(pos_precision) + ' deg';
  //   //   return this._pos_with_err_str('DEC');
  // }
  // glon_str() { return this.glon.toFixed(pos_precision) + ' deg'; }
  // glat_str() { return this.glat.toFixed(pos_precision) + ' deg'; }

  class_str() {
    return this.data.classes.split(",").join(", ");
  }
  other_names_str() {
    return this.data.other_names.split(",").join(", ");
  }
  gamma_names_str() {
    return this.data.gamma_names.split(",").join(", ");
  }


}

export class Source3FHL {
  public data;
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

  getSNRcatUrl(snrcatId) {
    return "http://www.physics.umanitoba.ca/snr/SNRcat/SNRrecord.php?id=" + snrcatId;
  }

}
