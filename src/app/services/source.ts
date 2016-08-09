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

  _pos_with_err_str(name) {
    let s = '(' + this.data[name].toFixed(pos_precision);
    s += ' ± ' + this.data[name + '_Err_Stat'].toFixed(pos_precision) + ' stat';
    s += ' ± ' + this.data[name + '_Err_Sys'].toFixed(pos_precision) + ' sys';
    s += ') deg';
    return s;
  }
  ra_str() { 
      return this.data.RA.toFixed(pos_precision) + ' deg';
    //   return this._pos_with_err_str('RA'); 
  }
  dec_str() { 
      return this.data.DEC.toFixed(pos_precision) + ' deg';
    //   return this._pos_with_err_str('DEC'); 
  }
  glon_str() { return this.data.GLON.toFixed(pos_precision) + ' deg'; }
  glat_str() { return this.data.GLAT.toFixed(pos_precision) + ' deg'; }

  ext_str() {
    if (this.data.Is_Extended === true) {
      return 'Source is extended.'
    } else {
      return 'Source is not extended.'
    }
  }

  _ext_with_err_str(name) {
    let s = '(' + this.data[name].toFixed(pos_precision);
    s += ' ± ' + this.data[name + '_Err'].toFixed(pos_precision);
    s += ') deg';
    return s;
  }
  semimajor_str() {
      return this.data['Semimajor'];
    //   return this._ext_with_err_str('Semimajor');
  }
  semiminor_str() {
      return this.data['Semiminor'];
    //   return this._ext_with_err_str('Semiminor');
  }

  _flux_str(name, unit, scale) {
    const precision = 3
    let val = (this.data[name] / scale).toFixed(precision)
    let err_stat = (this.data[name + '_Err_Stat'] / scale).toFixed(precision)
    let err_sys = (this.data[name + '_Err_Sys'] / scale).toFixed(precision)
    let s = '(' + val + ' ± ' + err_stat + ' stat' + ' ± ' + err_sys + ' sys';
    s += ') ' + scale + ' ' + unit;
    return s;
  }
  flux_diff_str() { 
      // TODO: doesn't work, sometimes values are None! Need if?
    //   return this._flux_str('Flux_Diff', 'cm^-2 s^-1 TeV^-1', 1e-11);
    return this.data['Flux_Diff'];
  }
  flux_int_str() { 
    return this.data['Flux_Int'];
  }

  spectral_index_str() {
      return this.data['Spectral_Index'];
  }

  flux_crab_str() { return (100 * this.data.Flux_Crab).toFixed(1) + ' % Crab'; }

  distance_str() { return this.data.Distance + ' kpc'; }
  distance2_str() { return this.data.Distance2 + ' '; }


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
