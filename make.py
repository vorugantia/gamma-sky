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
def cat_all():
    """Dump all catalogs to JSON"""
    gammasky.make_tev_catalog_data()
    gammasky.make_3fhl_catalog_data()
    gammasky.make_3fgl_catalog_data()
    gammasky.make_snrcat_catalog_data()

@cat.command('tev')
def cat_tev():
    """Dump TeV catalog to JSON"""
    gammasky.make_tev_catalog_data()

@cat.command('3fhl')
def cat_tev():
    """Dump 3FHL catalog to JSON"""
    gammasky.make_3fhl_catalog_data()

@cat.command('3fgl')
def cat_3fgl():
    """Dump 3FGL catalog to JSON"""
    gammasky.make_3fgl_catalog_data()

@cat.command('snrcat')
def cat_snrcat():
    """Dump SNRCat catalog to JSON"""
    gammasky.make_snrcat_catalog_data()

@cat.command('3fhl_source')
def source_3fhl():
    """TEST - Dump 3FHL source items to JSON"""
    gammasky.make_3fhl_source_data()

@cli.command()
def maps():
    """Make map data"""
    gammasky.make_maps_data()


if __name__ == '__main__':
    cli()
