class MapState {
  "fullScreen": boolean;
  "showFullscreenControl": boolean;
  "survey": string;
  "cooFrame": string;
  "target": string;
  "fov": number;
  "allowFullZoomout": boolean
  "showShareControl": boolean
}

// This config file is used to set the default view of the Aladin Lite widget.
// The view can be changed by accessing MAP_STATE before initializing Map View.
export let MAP_STATE: MapState = {
  fullScreen: true,
  showFullscreenControl: false,
  survey: "P/Fermi/color",
  // survey: "P/Fermi/10GeV",
  cooFrame: "galactic",
  target: "0 +0",
  fov: 180,
  allowFullZoomout: true,
  showShareControl: true, // Not yet working
}
