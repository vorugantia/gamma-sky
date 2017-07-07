"""
Prepare catalog data for the website.
"""
from pathlib import Path
import click
import numpy as np
from astropy.table import Table
import json
from gammapy.catalog import SourceCatalog3FHL, SourceCatalogGammaCat, SourceCatalog3FGL
from .utils import table_to_list_of_dict

__all__ = [
    'make_tev_catalog_data',
    'make_3fhl_catalog_data',
    'make_3fgl_catalog_data',
    # 'make_2fhl_catalog_data',
    'make_snrcat_catalog_data'
]

TO_JSON_KWARGS = dict(orient='split', double_precision=5)

def make_3fhl_catalog_data():
    click.secho('Making 3FHL catalog data...', fg='green')

    out_dir = Path('src/app/data/cat')
    out_dir.mkdir(parents=True, exist_ok=True)

    cat = SourceCatalog3FHL()
    # Indexing table - this is all the data we need for MapView.
    cols = ['Source_Name', 'RAJ2000', 'DEJ2000',
            'GLON', 'GLAT', 'ASSOC1', 'CLASS']
    cat.table = cat.table[cols]

    filename = 'src/app/data/cat/cat_3fhl.json'
    click.secho('Writing 3fhl {}'.format(filename), fg='green')
    with open(filename, 'w') as fh:
        # TODO can we handle np.nan, np.inf in Gammapy?
        data = json.dumps(cat._data_python_list)
        mask = data.replace('NaN', 'null')
        json.dump(json.loads(mask), fh)

def make_tev_catalog_data():
    click.secho('Making TeV catalog data (from gamma-cat)...', fg='green')

    out_dir = Path('src/app/data/cat')
    out_dir.mkdir(parents=True, exist_ok=True)

    cat = SourceCatalogGammaCat()
    cols = ['common_name', 'ra', 'dec', 'glon', 'glat',
            'other_names', 'classes']
    cat.table = cat.table[cols]

    filename = 'src/app/data/cat/cat_tev.json'
    click.secho('Writing tev {}'.format(filename), fg='green')
    with open(filename, 'w') as fh:
        data = json.dumps(cat._data_python_list)
        mask = data.replace('NaN', 'null') # Or "'Nan'" or ""?
        json.dump(json.loads(mask), fh)

def make_3fgl_catalog_data():
    click.secho('Making 3FGL catalog data...', fg='green')

    out_dir = Path('src/app/data/cat')
    out_dir.mkdir(parents=True, exist_ok=True)

    cat = SourceCatalog3FGL()
    cols = ['Source_Name', 'RAJ2000', 'DEJ2000', 'GLON',
            'GLAT', 'ASSOC1', 'CLASS1']
    cat.table = cat.table[cols]

    filename = 'src/app/data/cat/cat_3fgl.json'
    click.secho('Writing 3fgl {}'.format(filename), fg='green')
    with open(filename, 'w') as fh:
        data = json.dumps(cat._data_python_list)
        mask = data.replace('NaN', 'null') # Or "'Nan'" or ""?
        mask = mask.replace('-Infinity', '"-inf"')
        json.dump(json.loads(mask), fh)

# def make_2fhl_catalog_data(nrows=None):
#     click.secho('Making 2FHL catalog data ...', fg='green')
#
#     out_dir = Path('src/app/data/cat')
#     out_dir.mkdir(parents=True, exist_ok=True)
#
#     url = 'https://github.com/gammapy/gammapy-extra/blob/master/datasets/catalogs/fermi/gll_psch_v08.fit.gz?raw=true'
#     table = Table.read(url)
#     table['Source_ID'] = np.arange(len(table), dtype=int)
#     cols = [
#         'Source_ID',
#         'Source_Name',
#         'RAJ2000',
#         'DEJ2000',
#         'GLON',
#         'GLAT',
#         'ASSOC',
#         'CLASS',
#     ]
#
#     if nrows:
#         row_ids = np.linspace(0, len(table), nrows, dtype=int, endpoint=False)
#         table = table[row_ids]
#
#     # Making empty Assoc cells say "None"
#     assoc_mask = table['ASSOC'].data == ""
#     table['ASSOC'][assoc_mask] = "None"
#
#     click.echo('Converting table to pandas dataframe ...')
#     df = table[cols].to_pandas()
#     df.index = df['Source_ID'].astype('int')
#     del df['Source_ID']
#     text = df.to_json(**TO_JSON_KWARGS)
#
#     filename = 'src/app/data/cat/cat_2fhl.json'
#     click.secho('Writing 2fhl {}'.format(filename), fg='green')
#     with open(filename, 'w') as fh:
#         fh.write(text)

def make_snrcat_catalog_data():
    click.secho('Making SNRcat catalog data...', fg='green')

    out_dir = Path('src/app/data/cat')
    out_dir.mkdir(parents=True, exist_ok=True)

    url = 'https://github.com/gammapy/gammapy-extra/blob/master/datasets/catalogs/snrcat.fits.gz?raw=true'
    cols = ['Source_Name', 'RAJ2000', 'DEJ2000', 'GLON', 'GLAT',
            'id_alt', 'size_radio_mean']
    table = Table.read(url)
    table = table[cols]
    table['snrcat_id'] = [
    _.replace('+', 'p').replace('-', 'm')
    for _ in table['Source_Name']
    ]
    list_of_dict = table_to_list_of_dict(table.filled())

    filename = 'src/app/data/cat/cat_snrcat.json'
    click.secho('Writing SNRcat {}'.format(filename), fg='green')
    with open(filename, 'w') as fh:
        data = json.dumps(list_of_dict)
        mask = data.replace('NaN', 'null')
        json.dump(json.loads(mask), fh)
