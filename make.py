#!/usr/bin/env python
"""Make gamma-sky.net input data.
"""
import click
import gammasky

@click.group()
def cli():
    """The gamma-sky.net Python cli"""
    pass

@cli.group()
def cat():
    """Dump catalog to JSON"""

@cat.command('all')
@click.option('--nrows', default=None)
def cat_all(nrows):
    """Dump TeV catalog to JSON"""
    gammasky.make_tev_catalog_data(nrows=nrows)
    gammasky.make_3fgl_catalog_data(nrows=nrows)
    gammasky.make_2fhl_catalog_data(nrows=nrows)
    gammasky.make_snrcat_catalog_data(nrows=nrows)

@cat.command('tev')
@click.option('--nrows', default=None)
def cat_tev(nrows):
    """Dump TeV catalog to JSON"""
    gammasky.make_tev_catalog_data(nrows=nrows)

@cat.command('3fgl')
@click.option('--nrows', default=None)
def cat_3fgl(nrows):
    """Dump 3FGHL catalog to JSON"""
    gammasky.make_3fgl_catalog_data(nrows=nrows)

@cat.command('2fhl')
@click.option('--nrows', default=None)
def cat_2fhl(nrows):
    """Dump 2FHL catalog to JSON"""
    gammasky.make_2fhl_catalog_data(nrows=nrows)

@cat.command('snrcat')
@click.option('--nrows', default=None)
def cat_snrcat(nrows):
    """Dump SNRCat catalog to JSON"""
    gammasky.make_snrcat_catalog_data(nrows=nrows)


@cli.command()
def maps():
    """Make map data"""
    gammasky.make_maps_data()

if __name__ == '__main__':
    cli()
