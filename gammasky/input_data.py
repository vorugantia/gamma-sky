import subprocess
import click

__all__ = [
    'fetch_all_data',
]


def fetch_all_data():

    fetch_data(
        'https://github.com/gammapy/gammapy-extra/raw/master/datasets/catalogs/fermi/gll_psch_v11.fit.gz',
        '3fhl.fits.gz'
    )
    fetch_data(
        'https://github.com/gammapy/gammapy-extra/raw/master/datasets/catalogs/fermi/gll_psc_v16.fit.gz',
        '3fgl.fits.gz',
    )
    fetch_data(
        'https://github.com/gammapy/gamma-cat/raw/master/docs/data/gammacat.fits.gz',
        'gammacat.fits.gz',
    )

def fetch_data(url, filename):
    cmd = 'wget {} -O input_data/{}'.format(url, filename)
    click.secho(cmd, fg='green')
    subprocess.call(cmd, shell=True)
