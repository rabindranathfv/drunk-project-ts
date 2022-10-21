import { User } from './../interfaces/user.interface';
import { Token } from './../interfaces/token.interface';

export type UserLoginBody = Omit<User, 'name'>;
export type UserWithAuth = Omit<User, 'password'> | Omit<Token, 'expiresIn'>;

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
