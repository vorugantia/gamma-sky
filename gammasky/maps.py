import click
import subprocess
from .config import DATA_DIR

__all__ = [
    'make_maps_data',
]

def make_maps_data():
    click.secho('Preparing maps data...', fg='green')
    click.secho('This code is incomplete - for now dump IRAC4 data from hips-extra on GitHub.', fg='red')

    url = 'https://github.com/hipspy/hips-extra/trunk/datasets/samples/IRAC4'
    cmd = 'svn checkout {} {}'.format(url, DATA_DIR / 'maps/IRAC4')
    click.secho(cmd, fg='green')
    subprocess.call(cmd, shell=True)
