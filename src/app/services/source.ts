class SourceBase {

  public data;

  constructor(data) {
    this.data = data;
  }

  format(val, precision: boolean, unit: String = '') {
    // This method formats every numerical value in the source object data.
    // Boolean `precision` calls either formatp() (true) or formatf() (false).
    // No unit is passed by default. If it's wanted, set the parameter.
    if (val == null) {
      return this.handle_null();
    } else {
      if (precision) {
        return `${this.formatp(val)} ${unit}`;
      } else {
        return `${this.formatf(val)} ${unit}`;
      }
    }
  }

  format_error(val, val_err, precision: boolean, unit: String = '') {
    if (val == null) {
      return this.handle_null();
    } else {
      return `${this.format(val, precision)} +/- ${this.format(val_err, precision)} ${unit}`;
    }
  }

  formatp(val) {
    return val.toPrecision(3);
  }

  formatf(val) {
    return val.toFixed(3);
  }

  handle_null() {
    return 'No data';
  }

  join_entries(arr) {
    const entries = arr.filter(entry => {
      return /\S/.test(entry);
    });
    return entries.toString().replace(/,/g, ', ');
  }

  tevcat_flag() {
    // Only works for 3FHL and 3FGL.
    const flag = this.data.TEVCAT_FLAG;
    if (flag === 'N') {
      return 'No TeV association';
    } else if (flag === 'P') {
      return 'Small TeV source';
    } else if (flag === 'E') {
      return 'Extended TeV source (diameter > 40 arcmins)';
    } else {
      return 'N/A';
    }
  }

  getTargetString(glon = 'GLON', glat = 'GLAT') {
    let formattedGlon = this.format(this.data[glon], false).toString();
    let formattedGlat = this.format(this.data[glat], false).toString();
    let target = formattedGlon + formattedGlat;
    // Replace whitespace + separate coordinates with a comma
    return target.slice(0, -1).replace(/\s/g, ',')
  }

}

export class SourceTeV extends SourceBase {

  public cat = 'tev';
  public spec_type = this.data.spec_type

  comma_space(val) {
    return val.split(',').join(', ');
  }

  get_tevcat_url() {
    return `http://tevcat.uchicago.edu/?mode=1;id=${this.data.tevcat_id}`;
  }

  get_tevcat2_url() {
    return `http://tevcat2.uchicago.edu/sources/${this.data.tevcat2_id}`;
  }

  format_stat_sys(val, err_stat, err_syst, precision: boolean, unit: String = '') {
    if (val == null) {
      return this.handle_null();
    } else {
      return `
        ${this.format(val, precision)} +/- ${this.format(err_stat, precision)} (stat.)
        +/- ${this.format(err_syst, precision)} (syst.) ${unit}
        `;
    }
  }

}

export class Source3FHL extends SourceBase {

  public cat = '3fhl';
  public spec_type = this.data.SpectrumType.trim()

  join_assoc() {
    return this.join_entries([
      this.data.ASSOC1,
      this.data.ASSOC2,
      this.data.ASSOC_GAM,
      this.data.ASSOC_TEV
    ]);
  }

  bayesian_blocks() {
    const bayesBlocks = this.data.Variability_BayesBlocks;
    if (bayesBlocks === 1) {
      return '1 (not variable)';
    } else if (bayesBlocks === -1) {
      return 'Could not be tested';
    } else {
      return bayesBlocks.toString();
    }
  }

  is_extended() {
    return this.data.Extended_Source_Name.trim() !== '';
  }

}

export class Source3FGL extends SourceBase {

  public cat = '3fgl';
  public spec_type = this.data.SpectrumType.trim();

  join_assoc() {
    return this.join_entries([
      this.data.ASSOC1,
      this.data.ASSOC2,
      this.data.ASSOC_TEV,
      this.data.ASSOC_GAM1,
      this.data.ASSOC_GAM2,
      this.data.ASSOC_GAM3
    ]);
  }

  join_other_names() {
    return this.join_entries([
      this.data['0FGL_Name'],
      this.data['1FGL_Name'],
      this.data['2FGL_Name'],
      this.data['1FHL_Name']
    ]);
  }

  getUrl(image) {

    let name = this.data.Source_Name;
    name = name.substring(6);
    if (name.indexOf(' ') > 0) {
      name = name.substring(0, name.length - 1);
    }

    const string1 = name.substring(0, 4);
    const string2 = name.substring(5, 6);
    const operation = name.substring(6, 7);
    const string3 = name.substring(7);

    let operationLetter;
    if (operation === '+') {
      operationLetter = 'p';
    } else {
      operationLetter = 'm';
    }

    const urlEnd = string1 + 'd' + string2 + operationLetter + string3;

    return ('http://fermi.gsfc.nasa.gov/ssc/data/access/lat/4yr_catalog/3FGL-table/data/3FGL_'
      + image + '_v5/3FGL_J' + urlEnd + '_' + image + '.png');
  }


}

export class SourceSNRcat extends SourceBase {

  public cat = 'snrcat';

  getSNRcatUrl(snrcatId) {
    return `http://www.physics.umanitoba.ca/snr/SNRcat/SNRrecord.php?id=${snrcatId}`;
  }

}
