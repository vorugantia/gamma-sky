
class Survey {
  "id": string;
  "url": string;
  "name": string;
  "maxOrder": number;
  "frame": string;
  "format": string;
}

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
  }




]
