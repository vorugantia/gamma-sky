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


@cli.group()
def source():
    """Dump source objects to JSON"""


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


@source.command('all')
def source_all():
    """Dump all source objects to JSON"""
    gammasky.make_3fhl_source_data()
    gammasky.make_tev_source_data()
    gammasky.make_3fgl_source_data()


@source.command('tev')
@click.option('--start', default=0)
@click.option('--end', default=162)
def source_tev(start, end):
    """Dump TeV source objects to JSON"""
    '''Write all sources by default. For testing, pass a start + end index.'''
    gammasky.make_tev_source_data(start, end)


@source.command('3fhl')
def source_3fhl():
    """Dump 3FHL source objects to JSON"""
    gammasky.make_3fhl_source_data()


@source.command('3fgl')
def source_3fgl():
    """Dump 3FGL source objects to JSON"""
    gammasky.make_3fgl_source_data()


@cli.command()
def maps():
    """Make map data"""
    gammasky.make_maps_data()


@cli.command()
@click.pass_context
def all(ctx):
    """Dump all data to JSON"""
    ctx.invoke(cat_all)
    ctx.invoke(source_all)
    ctx.invoke(maps)



if __name__ == '__main__':
    cli()
