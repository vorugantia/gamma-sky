import logging
import click
import subprocess
from pathlib import Path
import numpy as np
import healpy as hp
from astropy.table import Table
from hips import HipsTile, HipsTileMeta
from .config import DATA_DIR

__all__ = [
    'make_maps_data',
]

log = logging.getLogger(__name__)

# Config options as global variables
energy_bands = [
    dict(min=10, max=30),
    dict(min=30, max=100),
    dict(min=100, max=2000),
]
orders = [1]
shift_order = 9


def make_maps_data_test():
    click.secho('Preparing maps data...', fg='green')
    click.secho('This code is incomplete - for now dump IRAC4 data from hips-extra on GitHub.', fg='red')

    url = 'https://github.com/hipspy/hips-extra/trunk/datasets/samples/IRAC4'
    cmd = 'svn checkout {} {}'.format(url, DATA_DIR / 'maps/IRAC4')
    click.secho(cmd, fg='green')
    subprocess.call(cmd, shell=True)


def make_maps_data():
    """First attempt at converting Fermi-LAT data above 10 GeV to HiPS.

    Goal: make RGB JPEG tiles for smoothed counts maps.

    * Energy bands as in Fermi-HGPS study: 10 -- 30 -- 100 -- 2000 GeV
    * Produce only tiles of order = 3 (768 tiles)
    """
    click.secho('Making Fermi-LAT high-energy maps ...', fg='green')
    # Step 1: loop over 3 energy bands: make FITS HEALPix images
    # make_healpix_maps()

    # Step 2: convert HEALPix to HiPS
    make_hips_from_healpix()


def make_healpix_maps():
    click.secho('Making Fermi-LAT HEALPix maps ...')
    for order in orders:
        for energy_band in energy_bands:
            make_healpix_map_for_energy_band(energy_band, order)


def make_healpix_map_for_energy_band(energy_band, order):
    click.secho(f'Making HEALPix map for energy band: {energy_band} and order: {order}', fg='green')

    # Select events in energy band
    table = Table.read('input_data/fermi_hgps_events_selected.fits.gz', hdu=1)
    energy = table['ENERGY'].quantity.to('GeV').value
    mask = (energy_band['min'] <= energy) & (energy < energy_band['max'])
    table = table[mask]
    log.info(f'Number of events: {len(table)}')

    # Bin the events into a HEALPix counts map
    nside = hp.order2nside(order + shift_order)
    ipix = hp.ang2pix(
        nside=nside, nest=True, lonlat=True,
        theta=table['L'], phi=table['B'],
    )
    npix = hp.nside2npix(nside)
    log.debug(f'Number of pixels: {npix}')
    resolution = np.rad2deg(hp.nside2resol(nside))
    log.debug(f'Pixel resolution: {resolution} deg')
    image = np.bincount(ipix, minlength=npix)
    image = image.astype('float32')

    # TODO: smoothing the HEALPix map with default setting is very slow.
    # Maybe chunk the data into local WCS maps and then stitch back together?
    # For now: no smoothing
    # image = hp.smoothing(image, sigma=np.deg2rad(0.1))

    path = DATA_DIR / 'maps' / 'Fermi10GeV_healpix_maps' / 'energy_{min}_{max}.fits.gz'.format_map(energy_band)
    path.parent.mkdir(exist_ok=True, parents=True)
    log.info(f'Writing {path}')
    hp.write_map(str(path), image, coord='G', nest=True)


def make_hips_from_healpix():
    # Make a HiPS properties file
    # TODO: not sure if this is absolutely required ... do it later
    make_hips_properties_file()

    # Make HiPS all-sky JPG file.
    # Example: http://alasky.unistra.fr/Fermi/Color/Norder3/Allsky.jpg
    make_hips_allsky_jpeg_file()

    # Make all HiPS JPG tiles
    for order in orders:
        make_hips_tiles(order)


def make_hips_properties_file():
    txt = """
creator_did         = ivo://MPIK/P/Fermi/10GeV
obs_title           = Fermi High-Energy Image (>10GeV)
client_category     = Image/Gamma-ray/Fermi
client_sort_key     = 00-00-00
hips_release_date   = 2017-07-19T10:52Z
hips_version        = 1.4
hips_order          = 1
hips_tile_width     = 512
hips_tile_format    = jpeg
hips_frame          = galactic
dataproduct_type    = image
dataproduct_subtype = color
hips_rgb_red        = 10-30GeV
hips_rgb_green      = 30-100GeV
hips_rgb_blue       = 100-2000GeV
hips_glu_tag        = P-Fermi-10GeV.hpx
    """
    path = DATA_DIR / 'maps/Fermi10GeV/properties'
    path.parent.mkdir(exist_ok=True, parents=True)
    click.secho(f'Writing {path}', fg='green')
    path.write_text(txt)


def make_hips_allsky_jpeg_file():
    pass


def make_hips_tiles(order):
    click.secho('Making HiPS image tiles ...', fg='green')
    npix = hp.nside2npix(hp.order2nside(order=order))
    for ipix in range(npix):
        make_hips_tile_for_index(ipix, order)


def make_hips_tile_for_index(ipix, order):
    click.secho(f'Making HiPS tile for index {ipix}', fg='green')
    meta = HipsTileMeta(order=order, ipix=ipix, file_format='jpg', frame='galactic')
    data = np.random.randint(low=0, high=255, size=(512, 512, 3), dtype='uint8')
    tile = HipsTile.from_numpy(meta, data)

    path = DATA_DIR / 'maps' / 'Fermi10GeV' / meta.tile_default_path
    path.parent.mkdir(exist_ok=True, parents=True)
    click.secho(f'Writing {path}', fg='green')
    tile.write(path)
