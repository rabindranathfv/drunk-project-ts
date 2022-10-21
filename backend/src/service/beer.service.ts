// import { HttpException } from '../exceptions/HttpException';
import BeerModel from './../models/beer.models';
import axios, { AxiosResponse } from 'axios';
import { Beer } from '../interfaces/beer.interface';
import { logger } from '../utils/logger';

class BeerService {
  public beers = BeerModel;
  constructor() {}

  public async loadBeers(url: string) {
    try {
      let result: AxiosResponse = await axios.get<Beer>(`${url}`);
      let beersData: [Beer] = result.data;

      for (const beer of beersData) {
        logger.info(`process beerName ${beer.name}, ${beer.id}`);
        const { id, food_pairing, ...beerObject } = beer;
        const beerCreated = await this.beers.create({ ...beerObject });
        await this.beers.findByIdAndUpdate({ _id: beerCreated._id }, { $push: { food_pairing: { $each: food_pairing } } }, { new: true });
        logger.info(`=========================================`);
      }

      return true;
    } catch (error) {
      logger.error('🚀 ~ file: beer.service.ts ~ line 25 ~ BeerService ~ loadBeers ~ error', error);
      throw new Error('there is some troubles try load all the beers');
    }
  }

  public async getAllBeers() {
    try {
      const beers: Beer[] = await this.beers.find();
      return beers;
    } catch (error) {
      throw new Error('there is some troubles try to getAllBeers');
    }
  }
}

export default BeerService;
