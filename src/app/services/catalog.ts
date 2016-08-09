import { SourceTeV, Source3FGL, Source2FHL, SourceSNRcat } from './source';

/**
 * Helper function to reformat the catalog data into array or source objects.
 */
function make_catalog(data, sourceClass) {
  let sources = [];
  for (let i = 0; i < data.length; i++) {
    let source = new sourceClass(data[i]);
    sources.push(source);
  }
  return sources;
}


class CatalogBase {

  public data;
  public sourceClass;

  constructor(data, sourceClass) {
    this.data = data;
    this.sourceClass = sourceClass;
    console.log("Catalog: ", data);
    console.log(data.columns);
  }

  getID(idx) {
    return this.data.index[idx];
  }

  getLength() {
    return this.data.index.length;
  }

  getVal(idx, colname) {
    return this.getSourceByRowIndex(idx).data[colname];
  }

  getSourceByID(id) {

    let index = this.data.index;

    for (var i = 0; i < index.length; i++) {
      if (index[i] == id) {
        // console.log("idx ", idx);
        return this.getSourceByRowIndex(i);
      }
    }
  }

  getSourceByRowIndex(idx) {
      // console.log('CatalogBase.getSourceByRowIndex idx=', idx);

    let colNames = this.data.columns;
    let rowData = this.data.data[idx];
    // http://stackoverflow.com/a/22015771/498873
    // TODO: use http://underscorejs.org/#object ?
    let sourceData = {
      row_index: idx,
      source_id: this.data.index[idx]
    }
    for (let i = 0; i < colNames.length; i++) {
      sourceData[colNames[i]] = rowData[i];
    }
    let source = new this.sourceClass(sourceData);
    // console.log(this.sourceClass);
    // console.log('CatalogBase.getSourceByRowIndex source=', source);
    return source;
  }

  getColumn(name) {
    for (var idx = 0; idx < this.data.columns.length; idx++) {
      if (this.data.columns[idx] == name) {
        return this.getColumnByColIndex(idx);
      }
    }
  }

  getColumnByColIndex(colIdx) {
      let data = []
      for (var idx = 0; idx < this.data.length; idx++) {
          data.push(this.data[idx][colIdx])
      }
      return data;
  }
}


export class CatalogTeV extends CatalogBase {

  printInfo(idx) {
    let source = this.getSourceByRowIndex(idx);
    console.log(source);
  }

}


export class Catalog3FGL extends CatalogBase {

  printInfo() {
    let source = this.getSourceByRowIndex(0);
    console.log(source);
  }

}

export class Catalog2FHL extends CatalogBase {

  printInfo(idx) {
    let source = this.getSourceByRowIndex(idx);
    console.log(source);
  }

}

export class CatalogSNRcat extends CatalogBase {

  printInfo(idx) {
    let source = this.getSourceByRowIndex(idx);
    console.log(source);
  }

}
