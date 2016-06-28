"""
Prepare catalog data for the website.
"""
import json
from pathlib import Path
import click
from astropy.table import Table

__all__ = [
    'make_catalog_data',
]

def _dump_json(data, filename):
    click.secho('Writing {}'.format(filename), fg='green')
    with open(str(filename), 'w') as fh:
        json.dump(data, fh)
        fh.write('\n')

def make_catalog_data():
    click.secho('Making catalog data ...', fg='green')

    out_dir = Path('data/cat')
    out_dir.mkdir(parents=True, exist_ok=True)

    table = Table.read('https://github.com/gammapy/gammapy-extra/blob/master/datasets/catalogs/fermi/gll_psch_v08.fit.gz?raw=true')
    cols = [
      'Source_Name',
      'RAJ2000',
      'DEJ2000',
    ]
    click.echo('Converting table to pandas dataframe ...')
    df = table[cols].to_pandas()
    data = df.to_json()
    from pprint import pprint
    pprint(data)

    filename = 'data/cat/cat_2fhl.json'
    # click.secho('Writing'.format(filename), fg='green')
    _dump_json(data, filename)
