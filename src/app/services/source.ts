
class SourceBase {

  public data;
  constructor(data) {
    this.data = data;
  }

  format(val, precision:boolean, unit:String='') {
    // This method formats every numerical value in the source object data.
    // Boolean `precision` calls either formatp() (true) or formatf() (false).
    // No unit is passed by default. If it's wanted, set the parameter.
    if(val == null) {
      return this.handle_null();
    }
    else {
      if(precision) {
        return `${this.formatp(val)} ${unit}`;
      }
      else {
        return `${this.formatf(val)} ${unit}`;
      }
    }
  }

  format_error(val, val_err, precision:boolean, unit:String='') {
    if(val == null) {
      return this.handle_null();
    }
    else {
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
    return "No data";
  }

  join_entries(arr) {
    var entries = arr.filter(entry => {
      return /\S/.test(entry);
    });
    return entries.toString().replace(/,/g, ', ');
  }

  tevcat_flag() {
    // Only works for 3FHL and 3FGL.
    var flag = this.data.TEVCAT_FLAG;
    if(flag == 'N')
      return "No TeV association";
    else if(flag == 'P')
      return "Small TeV source";
    else if(flag == 'E')
      return "Extended TeV source (diameter > 40 arcmins)";
    else
      return "N/A";
  }

  getTargetString(glon='GLON', glat='GLAT') {
    let formattedGlon = this.format(this.data[glon], false).toString();
    let formattedGlat = this.format(this.data[glat], false).toString();
    let target = formattedGlon + formattedGlat;
    // this.source.format() keeps a hanging space at the end of each value:
    return target.slice(0, -1);
  }

}

export class SourceTeV extends SourceBase {

  public cat = 'tev';

  comma_space(val) {
    return val.split(',').join(', ');
  }

  get_tevcat_url() {
    return `http://tevcat.uchicago.edu/?mode=1;id=${this.data.tevcat_id}`;
  }
  get_tevcat2_url() {
    return `http://tevcat2.uchicago.edu/sources/${this.data.tevcat2_id}`;
  }

  format_stat_sys(val, err_stat, err_syst, precision:boolean, unit:String='') {
    if(val == null) {
      return this.handle_null();
    }
    else {
      return `${this.format(val, precision)} +/- ${this.format(err_stat, precision)} (stat.) +/- ${this.format(err_syst, precision)} (syst.) ${unit}`;
    }
  }

}

export class Source3FHL extends SourceBase {

  public cat = '3fhl';

  join_assoc() {
    var assocs = [this.data.ASSOC1, this.data.ASSOC2, this.data.ASSOC_GAM,
                  this.data.ASSOC_TEV];

    return this.join_entries(assocs);
  }

  bayesian_blocks() {
    var bayesBlocks = this.data.Variability_BayesBlocks;
    var msg;
    if(bayesBlocks == 1)
      msg = '1 (not variable)';
    else if(bayesBlocks == -1)
      msg = 'Could not be tested';
    else
      msg = bayesBlocks.toString();
    return msg;
  }

  is_extended() {
    return this.data.Extended_Source_Name.trim() != '';
  }

}

export class Source3FGL extends SourceBase {

  public cat = '3fgl';

  join_assoc() {
    var assocs = [this.data.ASSOC1, this.data.ASSOC2, this.data.ASSOC_TEV,
    this.data.ASSOC_GAM1, this.data.ASSOC_GAM2, this.data.ASSOC_GAM3];

    return this.join_entries(assocs);
  }

  join_other_names() {
    var other_names = [this.data['0FGL_Name'], this.data['1FGL_Name'],
                       this.data['2FGL_Name'], this.data['1FHL_Name']];

    return this.join_entries(other_names);
  }

}

export class SourceSNRcat extends SourceBase {

  public cat = 'snrcat';

  getSNRcatUrl(snrcatId) {
    return `http://www.physics.umanitoba.ca/snr/SNRcat/SNRrecord.php?id=${snrcatId}`;
  }

}
