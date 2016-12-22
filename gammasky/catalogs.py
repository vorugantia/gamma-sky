"""
Prepare catalog data for the website.
"""
from pathlib import Path
import click
import numpy as np
from astropy.table import Table

__all__ = [
    'make_tev_catalog_data',
    'make_3fgl_catalog_data',
    'make_2fhl_catalog_data',
    'make_snrcat_catalog_data'
]

TO_JSON_KWARGS = dict(orient='split', double_precision=5)


def make_tev_catalog_data(nrows=None):
    click.secho('Making TeV catalog data (from gamma-cat)...', fg='green')

    out_dir = Path('src/app/data/cat')
    out_dir.mkdir(parents=True, exist_ok=True)

    url = 'https://github.com/gammapy/gamma-cat/raw/master/docs/data/gammacat.fits.gz'
    table = Table.read(url)
    # gamma-cat already has a source_id column
    cols = [
        'source_id',
        'common_name',
        'gamma_names',
        'other_names',
        'ra',
        'dec',
        'glon',
        'glat',
    ]

    if nrows:
        row_ids = np.linspace(0, len(table), nrows, dtype=int, endpoint=False)
        table = table[row_ids]

    # TODO: Make empty gamma_names and other_names cols say "None"

    click.echo('Converting table to pandas dataframe...')
    df = table[cols].to_pandas()
    df.index = df['source_id'].astype('int')
    del df['source_id']
    # Renaming "common_name" column to "Source_Name" for simplicity
    df.rename(columns={'common_name': 'Source_Name'}, inplace=True)
    text = df.to_json(**TO_JSON_KWARGS)

    filename = 'src/app/data/cat/cat_tev.json'
    click.secho('Writing tev {}'.format(filename), fg='green')
    with open(filename, 'w') as fh:
        fh.write(text)


# def make_tev_catalog_data(nrows=None): # Old function
#
#     click.secho('Skipping TeV catalog ... need to switch to gamma-cat', fg='red')
#     return
#
#     click.secho('Making TeV catalog data...', fg='green')
#
#     out_dir = Path('src/app/data/cat')
#     out_dir.mkdir(parents=True, exist_ok=True)
#
#     url = 'https://github.com/gammapy/gamma-cat/blob/master/other_cats/tgevcat/tgevcat.ecsv?raw=true'
#     table = Table.read(url, format='ascii.ecsv')
#     cols = table.colnames
#
#     if nrows:
#         row_ids = np.linspace(0, len(table), nrows, dtype=int, endpoint=False)
#         table = table[row_ids]
#
#     click.echo('Converting table to pandas dataframe...')
#     df = table[cols].to_pandas()
#     # http://stackoverflow.com/a/20491748/498873
#     # http://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.reset_index.html
#     # df.reset_index(drop=True)
#     df.index = df['Source_ID'].astype('int')
#     del df['Source_ID']
#     # import  IPython; IPython.embed()
#
#     # For to_json options see http://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.to_json.html
#     # The most efficient format should be "split" with DataFrame index dropped
#     text = df.to_json(orient='split')
#     # text = df.to_json()
#
#     filename = 'src/app/data/cat/cat_tev.json'
#     click.secho('Writing tev {}'.format(filename), fg='green')
#     with open(filename, 'w') as fh:
#         fh.write(text)


def make_3fgl_catalog_data(nrows=None):
    click.secho('Making 3FGL catalog data...', fg='green')

    out_dir = Path('src/app/data/cat')
    out_dir.mkdir(parents=True, exist_ok=True)

    url = 'https://github.com/gammapy/gammapy-extra/blob/master/datasets/catalogs/fermi/gll_psc_v16.fit.gz?raw=true'
    table = Table.read(url)
    table['Source_ID'] = np.arange(len(table), dtype=int)
    cols = [
        'Source_ID',
        'Source_Name',
        'RAJ2000',
        'DEJ2000',
        'GLON',
        'GLAT',
        'ASSOC1',
        'CLASS1',
    ]

    if nrows:
        row_ids = np.linspace(0, len(table), nrows, dtype=int, endpoint=False)
        table = table[row_ids]

    # Making empty Assoc cells say "None"
    assoc_mask = table['ASSOC1'].data == 26 * " "
    table['ASSOC1'][assoc_mask] = "None" + (22 * " ")

    # Making empty Class cells say "unk" to matck 2FHL
    class_mask = table['CLASS1'].data == 5 * " "
    table['CLASS1'][class_mask] = "unk" + (3 * " ")

    click.echo('Converting table to pandas dataframe...')
    df = table[cols].to_pandas()
    df.index = df['Source_ID'].astype('int')
    del df['Source_ID']
    text = df.to_json(**TO_JSON_KWARGS)

    filename = 'src/app/data/cat/cat_3fgl.json'
    click.secho('Writing 3fgl {}'.format(filename), fg='green')
    with open(filename, 'w') as fh:
        fh.write(text)


def make_2fhl_catalog_data(nrows=None):
    click.secho('Making 2FHL catalog data ...', fg='green')

    out_dir = Path('src/app/data/cat')
    out_dir.mkdir(parents=True, exist_ok=True)

    url = 'https://github.com/gammapy/gammapy-extra/blob/master/datasets/catalogs/fermi/gll_psch_v08.fit.gz?raw=true'
    table = Table.read(url)
    table['Source_ID'] = np.arange(len(table), dtype=int)
    cols = [
        'Source_ID',
        'Source_Name',
        'RAJ2000',
        'DEJ2000',
        'GLON',
        'GLAT',
        'ASSOC',
        'CLASS',
    ]

    if nrows:
        row_ids = np.linspace(0, len(table), nrows, dtype=int, endpoint=False)
        table = table[row_ids]

    # Making empty Assoc cells say "None"
    assoc_mask = table['ASSOC'].data == ""
    table['ASSOC'][assoc_mask] = "None"

    click.echo('Converting table to pandas dataframe ...')
    df = table[cols].to_pandas()
    df.index = df['Source_ID'].astype('int')
    del df['Source_ID']
    text = df.to_json(**TO_JSON_KWARGS)

    filename = 'src/app/data/cat/cat_2fhl.json'
    click.secho('Writing 2fhl {}'.format(filename), fg='green')
    with open(filename, 'w') as fh:
        fh.write(text)


def make_snrcat_catalog_data(nrows=None):
    click.secho('Making SNRcat catalog data...', fg='green')

    out_dir = Path('src/app/data/cat')
    out_dir.mkdir(parents=True, exist_ok=True)

    url = 'https://github.com/gammapy/gammapy-extra/blob/master/datasets/catalogs/snrcat.fits.gz?raw=true'
    table = Table.read(url)
    table['Source_ID'] = np.arange(len(table), dtype=int)

    # Add snrcat_id field that's used as part of the URL to link to SNRcat
    # snrcat_id = []
    # for source in table:
    #     sign = 'p' if source['GLAT'] >= 0 else 'm'
    #     s = 'G{:05.1f}{}{:04.1f}'.format(source['GLON'], sign, abs(source['GLAT']))
    #     snrcat_id.append(s)
    # table['snrcat_id'] = snrcat_id
    table['snrcat_id'] = [
        _.replace('+', 'p').replace('-', 'm')
        for _ in table['Source_Name']
        ]

    cols = [
        'Source_ID',
        'Source_Name',
        'snrcat_id',
        'RAJ2000',
        'DEJ2000',
        'GLON',
        'GLAT',
        'id_alt',
        'size_radio_mean',
    ]

    if nrows:
        row_ids = np.linspace(0, len(table), nrows, dtype=int, endpoint=False)
        table = table[row_ids]

    # Making empty Assoc cells say "None"
    assoc_mask = table['id_alt'].data == "N/A"
    table['id_alt'][assoc_mask] = "None"

    click.echo('Converting table to pandas dataframe...')
    df = table[cols].to_pandas()
    df.index = df['Source_ID'].astype('int')
    del df['Source_ID']

    text = df.to_json(**TO_JSON_KWARGS)

    filename = 'src/app/data/cat/cat_snrcat.json'
    click.secho('Writing SNRcat {}'.format(filename), fg='green')
    with open(filename, 'w') as fh:
        fh.write(text)
