
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

}

export class SourceTeV extends SourceBase {

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

}

export class Source3FGL extends SourceBase {

}

export class SourceSNRcat extends SourceBase {

  getSNRcatUrl(snrcatId) {
    return `http://www.physics.umanitoba.ca/snr/SNRcat/SNRrecord.php?id=${snrcatId}`;
  }

}
