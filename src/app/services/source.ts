
class SourceBase {

  public data;
  constructor(data) {
    this.data = data;
  }

  formatf(val) {
    // Value has fixed number of digits
    if(val != null)
      return val.toFixed(3);
    else
      return val;
  }

  formatp(val) {
    // Value to a certain precision
    if(val != null)
      return val.toPrecision(3);
    else
      return val;
  }


  format_error(val, val_err) {
    return `${this.formatp(val)} +- ${this.formatp(val_err)}`;
  }

}

export class SourceTeV extends SourceBase {

  class_str() {
    return this.data.classes.split(",").join(", ");
  }

  gamma_names_str() {
    return this.data.gamma_names.split(",").join(", ");
  }
  fermi_names_str() {
    return this.data.fermi_names.split(",").join(", ");
  }
  other_names_str() {
    return this.data.other_names.split(",").join(", ");
  }

  get_spec_parameters() {
    var spec = this.data.spec_type;
    var markup;

    if(spec == 'pl') {
      markup = `
      <ul>
        <li>Spectrum type: pl</li>
        <li>norm: ${this.format_error(this.data.spec_pl_norm, this.data.spec_pl_norm_err)} cm-2 s-1 TeV-1 (statistical)</li>
        <li>norm: ${this.format_error(this.data.spec_pl_norm, this.data.spec_pl_norm_err_sys)} cm-2 s-1 TeV-1 (systematic)</li>
        <li>index: ${this.format_error(this.data.spec_pl_index, this.data.spec_pl_index_err)} (statistical)</li>
        <li>index: ${this.format_error(this.data.spec_pl_index, this.data.spec_pl_index_err_sys)} (systematic)</li>
        <li>reference: ${this.formatp(this.data.spec_pl_e_ref)}</li>
      </ul>
      `;
    }
    else if(spec == 'pl2') {
      markup = `
      <ul>
        <li>Spectrum type: pl2 (integral pl)</li>
        <li>flux: ${this.format_error(this.data.spec_pl2_flux, this.data.spec_pl2_flux_err)} cm-2 s-1 (statistical)</li>
        <li>flux: ${this.format_error(this.data.spec_pl2_flux, this.data.spec_pl2_flux_err_sys)} cm-2 s-1 (systematic)</li>
        <li>index: ${this.format_error(this.data.spec_pl2_index, this.data.spec_pl2_index_err)} (statistical)</li>
        <li>index: ${this.format_error(this.data.spec_pl2_index, this.data.spec_pl2_index_err_sys)} (systematic)</li>
        <li>e_min: ${this.formatp(this.data.spec_pl2_e_min)} TeV</li>
        <li>e_max: ${this.formatp(this.data.spec_pl2_e_max)} TeV</li>
      `;
    }
    else if(spec == 'ecpl') {
      markup =`
      <ul>
        <li>Spectrum type: ecpl</li>
        <li>norm: ${this.format_error(this.data.spec_ecpl_norm, this.data.spec_ecpl_norm_err)} cm-2 s-1 TeV-1 (statistical)</li>
        <li>norm: ${this.format_error(this.data.spec_ecpl_norm, this.data.spec_ecpl_norm_err_sys)} cm-2 s-1 TeV-1 (systematic)</li>
        <li>index: ${this.format_error(this.data.spec_ecpl_index, this.data.spec_ecpl_index_err)} (statistical)</li>
        <li>index: ${this.format_error(this.data.spec_ecpl_index, this.data.spec_ecpl_index_err_sys)} (systematic)</li>
        <li>e_cut: ${this.format_error(this.data.spec_ecpl_e_cut, this.data.spec_ecpl_e_cut_err)} TeV (statistical)</li>
        <li>e_cut: ${this.format_error(this.data.spec_ecpl_e_cut, this.data.spec_ecpl_e_cut_err_sys)} TeV (systematic)</li>
        <li>reference: ${this.formatp(this.data.spec_ecpl_e_ref)}</li>
      `;
    }
    else {
      markup = "Spectral model printout not yet implemented.";
    }

    document.getElementById('spec').innerHTML = markup;

  }

}

export class Source3FHL extends SourceBase {

}

export class Source3FGL extends SourceBase {

}

export class SourceSNRcat extends SourceBase {

  getSNRcatUrl(snrcatId) {
    return "http://www.physics.umanitoba.ca/snr/SNRcat/SNRrecord.php?id=" + snrcatId;
  }

}
