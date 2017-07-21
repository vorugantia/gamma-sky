"""Make Fermi-LAT high-energy maps in HiPS format."""
import logging
import numpy as np
import healpy as hp
from astropy.table import Table
from skimage.transform import downscale_local_mean
from skimage.exposure import rescale_intensity, equalize_hist
from hips import HipsTile, HipsTileMeta, HipsTileAllskyArray
from hips.utils import healpix_order_to_npix
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
orders = [3]
shift_order = 8
allsky_downsample_order = 3


class HPXImageCache:
    def __init__(self):
        self._float_images = {}
        self._int_images = {}

    def get_healpix_image_float(self, energy_idx):
        if energy_idx in self._float_images:
            return self._float_images[energy_idx]

        energy_band = energy_bands[energy_idx]
        filename = DATA_DIR / 'maps' / 'Fermi10GeV_healpix_maps' / 'energy_{min}_{max}.fits.gz'.format_map(energy_band)
        hpx_map = hp.read_map(str(filename))  # , coord='G', nest=True
        self._float_images[energy_idx] = hpx_map
        return hpx_map

    def get_healpix_image_int(self, energy_idx):
        """Applies color scale to get RGB int images in range 0 ... 255"""
        if energy_idx in self._int_images:
            return self._int_images[energy_idx]

        hpx_map = self.get_healpix_image_float(energy_idx)
        hpx_map_int = 255 * hpx_map / hpx_map.max()
        self._int_images[energy_idx] = hpx_map_int.astype('uint8')
        return self._int_images[energy_idx]


hpx_images = HPXImageCache()


def make_maps_data():
    """First attempt at converting Fermi-LAT data above 10 GeV to HiPS.

    Goal: make RGB JPEG tiles for smoothed counts maps.

    * Energy bands as in Fermi-HGPS study: 10 -- 30 -- 100 -- 2000 GeV
    * Produce only tiles of order = 3 (768 tiles)
    """
    log.info('Making Fermi-LAT high-energy maps ...')
    # Step 1: loop over 3 energy bands: make FITS HEALPix images
    # make_healpix_maps()

    # Step 2: convert HEALPix to HiPS
    make_hips_from_healpix()


def make_healpix_maps():
    log.info('Making Fermi-LAT HEALPix maps ...')
    for order in orders:
        for energy_band in energy_bands:
            make_healpix_map_for_energy_band(energy_band, order)


def make_healpix_map_for_energy_band(energy_band, order):
    log.info(f'Making HEALPix map for energy band: {energy_band} and order: {order}')

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

    # Make all HiPS JPG tiles
    for order in orders:
        make_hips_tiles(order)
        make_hips_allsky_jpeg_file(order)


def make_hips_properties_file():
    txt = """
creator_did         = ivo://MPIK/P/Fermi/10GeV
obs_title           = Fermi High-Energy Image (>10GeV)
client_category     = Image/Gamma-ray/Fermi
client_sort_key     = 00-00-00
hips_release_date   = 2017-07-19T10:52Z
hips_version        = 1.4
hips_order          = 3
hips_tile_width     = 512
hips_tile_format    = jpeg
hips_frame          = galactic
dataproduct_type    = image
dataproduct_subtype = color
hips_rgb_red        = 10-30GeV
hips_rgb_green      = 30-100GeV
hips_rgb_blue       = 100-2000GeV
# hips_glu_tag        = P-Fermi-10GeV.hpx
    """
    path = DATA_DIR / 'maps/Fermi10GeV/properties'
    path.parent.mkdir(exist_ok=True, parents=True)
    log.info(f'Writing {path}')
    path.write_text(txt)


def make_hips_tiles(order):
    log.info('Making HiPS image tiles ...')
    for ipix in range(healpix_order_to_npix(order=order)):
        make_hips_tile_for_index(ipix, order)


def ipix_to_tilepix(ipix):
    return 42


def make_hips_tile_for_index(ipix_tile, order):
    log.info(f'Making HiPS tile for index {ipix_tile}')
    meta = HipsTileMeta(order=order, ipix=ipix_tile, file_format='jpg', frame='galactic')

    # # TODO: copy over pixels from HEALPix image
    # data = []
    # for energy_idx in range(3):
    #     hpx_map = hpx_images.get_healpix_image_int(energy_idx)
    #     ipix = np.arange(shift_order * shift_order)
    #     tile_data = hpx_map[ipix]
    #
    #     # if tile_data.sum() != 0:
    #     #     pass
    #     # import IPython; IPython.embed(); 1/0
    #     # tile_data = rescale_intensity(tile_data)
    #     tile_data = rescale_intensity(tile_data)
    #     # tile_data = (ipix_tile % 256) * np.ones(shift_order * shift_order, dtype='uint8')
    #     tile_data = tile_data.reshape((shift_order, shift_order))
    #     data.append(tile_data)
    #
    # # import IPython; IPython.embed()
    # data = np.stack(data, axis=-1)
    # print(data.shape)
    # print(data.dtype)
    # # 1/0

    size = (2 ** shift_order, 2 ** shift_order, 3)
    data = np.random.randint(low=0, high=255, size=size, dtype='uint8')

    tile = HipsTile.from_numpy(meta, data)

    path = DATA_DIR / 'maps' / 'Fermi10GeV' / meta.tile_default_path
    path.parent.mkdir(exist_ok=True, parents=True)
    log.info(f'Writing {path}')
    tile.write(path)


def make_hips_allsky_jpeg_file(order):
    log.info(f'Making HiPS allsky image for order {order}')
    tiles = []
    for ipix in range(healpix_order_to_npix(order=order)):
        log.info(f'Processing tile {ipix}')
        meta = HipsTileMeta(order=order, ipix=ipix, file_format='jpg', frame='galactic', width=2 ** shift_order)
        filename = DATA_DIR / 'maps' / 'Fermi10GeV' / meta.tile_default_path
        tile = HipsTile.read(meta, filename)

        # Downsample the tile
        factor = 2 ** allsky_downsample_order
        # import IPython; IPython.embed(); 1/0
        data = downscale_local_mean(tile.data, factors=(factor, factor, 1))
        meta.order -= allsky_downsample_order
        meta.width //= factor

        # This is to debug when all-sky is shown
        data[:, :, 0] = 255

        tile = HipsTile.from_numpy(meta, data.astype('uint8'))
        # print(tile.data.shape, tile.meta)

        tiles.append(tile)

    allsky = HipsTileAllskyArray.from_tiles(tiles)

    path = DATA_DIR / 'maps' / 'Fermi10GeV' / f'Norder{order}' / 'Allsky.jpg'
    # path.parent.mkdir(exist_ok=True, parents=True)
    log.info(f'Writing {path}')
    allsky.write(path)
