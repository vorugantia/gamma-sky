
class Survey {
  "id": string;
  "url": string;
  "name": string;
  "maxOrder": number;
  "frame": string;
  "format": string;
}

// Database of available surveys (in HiPS file format): http://aladin.unistra.fr/hips/list

// **Note: Some of the links for each survey DO NOT work in browser, but will still load an image in Aladin Lite.
//         Conversely, some of the survey links do work but the image will not appear on Aladin Lite.
//         Therefore, check each survey that you add to the list below.

export var SURVEYS: Survey[] = [

  {
    "id": "P/Fermi/color",
    "url": "http://alasky.u-strasbg.fr/Fermi/Color",
    "name": "Fermi color",
    "maxOrder": 3,
    "frame": "equatorial",
    "format": "jpeg"
  },
  {
    "id": "P/Haslam408",
    "url": "http://alasky.u-strasbg.fr/Haslam408",
    "name": "Haslam 408",
    "maxOrder": 3,
    "frame": "galactic",
    "format": "jpeg fits",
  },
  {
    "id": "P/PLANCK/LFI/color",
    "url": "http://alasky.u-strasbg.fr/PLANCK/R2/LFI_Color_30_44_70",
    "name": "Planck R2 LFI Color 30-44-70 GHz",
    "maxOrder": 3,
    "frame": "galactic",
    "format": "jpeg"
  },
  {
    "id": "P/PLANCK/HFI/color",
    "url": "http://alasky.u-strasbg.fr/PLANCK/HFIColor353-545-857",
    "name": "Planck R1 HFI Color 353-545-857 GHz",
    "maxOrder": 3,
    "frame": "galactic",
    "format": "jpeg"
  },
  {
    "id": "P/PLANCK/R2/HFI/color",
    "url": "http://alasky.u-strasbg.fr/PLANCK/R2/HFI_Color_353_545_857",
    "name": "Planck R2 HFI Color 353-545-857 GHz",
    "maxOrder": 3,
    "frame": "galactic",
    "format": "jpeg"
  },
  {
    "id": "P/GLIMPSE360",
    "url": "http://www.spitzer.caltech.edu/glimpse360/aladin/data",
    "name": "Spitzer GLIMPSE360",
    "maxOrder": 9,
    "frame": "equatorial",
    "format": "jpeg"
  },
  {
    "id": "P/IRIS/4",
    "url": "http://cade.irap.omp.eu/documents/Ancillary/4Aladin/IRIS_4",
    "name": "IRIS Band 4-100um",
    "maxOrder": 3,
    "frame": "galactic",
    "format": "jpeg fits"
  },
  {
    "id": "P/CGPS/VGPS/CONT",
    "url": "http://cade.irap.omp.eu/documents/Ancillary/4Aladin/CGPS_VGPS_CONT/",
    "name": "CGPS-VGPS CONT",
    "maxOrder": 4,
    "frame": "galactic",
    "format": "jpeg fits"
  },
  {
    "id": "P/AKARI/WideS",
    "url": "http://cade.irap.omp.eu/documents/Ancillary/4Aladin/AKARI_WideS",
    "name": "AKARI 90um",
    "maxOrder": 3,
    "frame": "galactic",
    "format": "png jpeg fits"
  },
  {
    "id": "P/RASS",
    "url": "http://cade.irap.omp.eu/documents/Ancillary/4Aladin/RASS",
    "name": "ROSAT all-sky",
    "maxOrder": 3,
    "frame": "galactic",
    "format": "jpeg fits"
  },
  {
    "id": "P/XMM-Newton/EPIC",
    "url": "http://skies.esac.esa.int/XMM-Newton/EPIC-RGB",
    "name": "XMM-Newton EPIC",
    "maxOrder": 7,
    "frame": "equatorial",
    "format": "jpeg"
  },
  {
    "id": "P/INTEGRAL/Color",
    "url": "http://skies.esac.esa.int/Integral/color",
    "name": "INTEGRAL IBIS Color",
    "maxOrder": 3,
    "frame": "equatorial",
    "format": "jpeg"
  },
  {
    "id": "P/SUZAKU",
    "url": "http://darts.isas.jaxa.jp/pub/judo2/HiPS/suzaku",
    "name": "SUZAKU",
    "maxOrder": 6,
    "frame": "equatorial",
    "format": "png"
  },
  {
    "id": "P/SPITZER/IRAC4",
    "url": "../../data/maps/IRAC4",
    "name": "LOCAL",
    "maxOrder": 3,
    "frame": "galactic",
    "format": "jpeg"
  }


]
