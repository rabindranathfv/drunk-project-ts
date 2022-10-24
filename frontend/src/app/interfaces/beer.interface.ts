export type VolumeUnits = 'litres';
export type TempUnits = 'celsius';
export type weightUnits = 'kilograms' | 'grams';

export type addType = 'start' | 'middle' | 'end' | 'dry hop' | 'neutral';
export type attributeType = 'aroma' | 'bitter' | 'flavour' | 'twist';

// Enums Def
export enum VolumeDef {
  litres = 'litres',
}
export enum TempDef {
  celsius = 'celsius',
}
export enum weightDef {
  kilograms = 'kilograms',
  grams = 'grams',
}

export enum addDef {
  start = 'start',
  middle = 'middle',
  dryhop = 'dry hop',
  end = 'end',
  neutral = 'neutral',
}
export enum attributeDef {
  aroma = 'aroma',
  bitter = 'bitter',
  flavour = 'flavour',
  twist = 'twist',
}

// Compose interfaces
export interface Temperature {
  value: number;
  units: TempUnits;
}

export interface Volume {
  value: number;
  units: VolumeUnits;
}

export interface BoilVolume {
  value: number;
  units: VolumeUnits;
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
  units: weightUnits;
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
  image_url: URL;
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
