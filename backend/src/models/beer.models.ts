import { Schema, model, Document } from 'mongoose';
import { addDef, attributeDef, TempDef, VolumeDef, weightDef } from '../types/types';
import {
  Beer,
  BoilVolume,
  Volume,
  Method,
  MashTemp,
  Fermentation,
  Temperature,
  Malt,
  Hops,
  Amount,
  Ingredients,
} from './../interfaces/beer.interface';

const VolumeSchema = new Schema<Volume>({
  value: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    enum: Object.values(VolumeDef),
    set: () => {
      const elemets = Object.values(VolumeDef);
      return elemets[Math.floor(Math.random() * (elemets.length - 1)) + 0];
    },
  },
});

const BoilVolumeSchema = new Schema<BoilVolume>({
  value: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    enum: Object.values(VolumeDef),
  },
});

const TemperatureSchema = new Schema<Temperature>({
  value: {
    type: Number,
    set: (value: number) => {
      return !value ? 0 : value;
    },
  },
  unit: {
    type: String,
    enum: Object.values(TempDef),
    set: () => {
      const elemets = Object.values(TempDef);
      return elemets[Math.floor(Math.random() * (elemets.length - 1)) + 0];
    },
  },
});

const MashTempSchema = new Schema<MashTemp>({
  temp: {
    type: TemperatureSchema,
  },
  duration: {
    type: Number,
    default: null,
  },
});

const FermentationSchema = new Schema<Fermentation>({
  temp: {
    type: TemperatureSchema,
  },
});

const MethodSchema = new Schema<Method>({
  mash_temp: {
    type: [MashTempSchema],
  },
  fermentation: {
    type: FermentationSchema,
    set: (val: number) => {
      return !val ? 0 : val;
    },
  },
  twist: {
    type: String,
    default: null,
  },
});

const AmountSchema = new Schema<Amount>({
  value: {
    type: Number,
  },
  unit: {
    type: String,
    enum: Object.values(weightDef),
    set: () => {
      const elemets = Object.values(weightDef);
      return elemets[Math.floor(Math.random() * (elemets.length - 1)) + 0];
    },
  },
});

const MaltSchema = new Schema<Malt>({
  name: {
    type: String,
    unique: true,
  },
  amount: {
    type: AmountSchema,
  },
});

const HopsSchema = new Schema<Hops>({
  add: {
    type: String,
    enum: Object.values(addDef),
    set: (val: string) => {
      return !Object.values(addDef).includes(val as addDef) ? addDef.neutral : val;
    },
  },
  attribute: {
    type: [String],
    enum: Object.values(attributeDef),
    trim: true,
    set: (val: string) => {
      return val
        .replace(/[^a-zA-Z ]/g, '')
        .split(' ')
        .filter((v) => v)
        .map((v) => v.toLowerCase());
    },
  },
});

const IngredientsSchema = new Schema<Ingredients>({
  malt: {
    type: [MaltSchema],
  },
  hops: {
    type: [HopsSchema],
  },
  yeast: {
    type: String,
  },
});

const BeerSchema = new Schema<Beer>({
  name: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  first_brewed: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
  },
  abv: {
    type: Number,
  },
  ibu: {
    type: Number,
  },
  target_fg: {
    type: Number,
  },
  target_og: {
    type: Number,
  },
  ebc: {
    type: Number,
    default: null,
  },
  srm: {
    type: Number,
    default: null,
  },
  ph: {
    type: Number,
  },
  attenuation_level: {
    type: Number,
  },
  volume: VolumeSchema,
  boil_volume: BoilVolumeSchema,
  method: MethodSchema,
  ingredients: IngredientsSchema,
  food_pairing: [String],
  brewers_tips: {
    type: String,
    required: true,
  },
  contributed_by: {
    type: String,
    required: true,
  },
});

BeerSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const BeerModel = model<Beer & Document>('Beer', BeerSchema);

export default BeerModel;
