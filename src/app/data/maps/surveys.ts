
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
  }

]
