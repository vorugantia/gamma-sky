export class Source3FGL {
  id: number;
  Source_Name: string;
  RAJ2000: number;
  DEJ2000: number;
  GLON: number;
  GLAT: number;
  ASSOC1: string;
  CLASS1: string;
}

export class Source2FHL {
  id: number;
  Source_Name: string;
  RAJ2000: number;
  DEJ2000: number;
  GLON: number;
  GLAT: number;
  ASSOC: string;
  CLASS: string;
}

export class SourceSNRcat {
  id: number;
  Source_Name: string;
  RAJ2000: number;
  DEJ2000: number;
  GLON: number;
  GLAT: number;
  id_alt: string;  // This is the "Assoc" for SNRcat
  size_radio_mean: number;
}
