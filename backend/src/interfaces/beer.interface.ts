import { addType, attributeType, TempUnits, VolumeUnits, weightUnits } from '../types/types';

// Compose interfaces
export interface Temperature {
  value: number;
  unit: TempUnits;
}

export interface Volume {
  value: number;
  unit: VolumeUnits;
}

export interface BoilVolume {
  value: number;
  unit: VolumeUnits;
}

// compose interfaces for Method
export interface MashTemp {
  temp: Temperature;
  duration: number;
}

export interface Fermentation {
  temp: Temperature;
}

// Method base interface
export interface Method {
  mash_temp: [MashTemp];
  fermentation: Fermentation;
  twist: null | string;
}

// Compose interfaces for ingridients
export interface Amount {
  value: number;
  unit: weightUnits;
}

export interface Malt {
  name: string;
  amount: Amount;
}

export interface Hops extends Malt {
  add: addType;
  attribute: attributeType[];
}

// Ingredients base interface
export interface Ingredients {
  malt: Malt[];
  hops: Hops[];
  yeast: string;
}

export interface Beer {
  _id: string;
  id: string;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: Volume;
  boil_volume: BoilVolume;
  method: Method;
  ingredients: Ingredients;
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
}
