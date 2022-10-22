import axios, { AxiosResponse } from 'axios';

import { logger } from '../utils/logger';
import { HttpException } from '../exceptions/HttpException';
import { isEmpty } from '../utils/isEmpty';

import BeerModel from './../models/beer.models';
import { Beer } from '../interfaces/beer.interface';

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

  public async findBeerById(beerId: string): Promise<Beer> {
    try {
      if (isEmpty(beerId)) throw new HttpException(400, 'beerId is empty');

      const findBeer: Beer | null = await this.beers.findOne({ _id: beerId });
      if (!findBeer) throw new HttpException(409, "Beer doesn't exist");

      return findBeer;
    } catch (error) {
      throw new HttpException(500, 'Server side Error troubles for get specific Beer MMGV');
    }
  }

  public async getBeerFilterByNameOrIngridients(query: any): Promise<Beer[] | null> {
    try {
      console.log('SERVICE getBeerFilterByNameOrIngridients***', query);
      // const findBeer = await this.beers.aggregate(
      //   {$group:{"_id":"$name","name":{$first:"$name"},"count":{$sum:1}}},
      // );

      return null;
    } catch (error) {
      throw new HttpException(500, 'Server side Error troubles for filters on beers');
    }
  }

  public async getBeersTopIngridients(query: any): Promise<Beer[] | null> {
    try {
      console.log('SERVICE getBeersTopIngridients***', query);
      // const findBeer = await this.beers.aggregate(
      //   {$group:{"_id":"$name","name":{$first:"$name"},"count":{$sum:1}}},
      // );

      return null;
    } catch (error) {
      throw new HttpException(500, 'Server side Error troubles for top ingridients in beers');
    }
  }

  public async getBeersBySearch(query: any): Promise<Beer[] | null> {
    try {
      console.log('SERVICE getBeersBySearch***', query);
      // const findBeer = await this.beers.aggregate(
      //   {$group:{"_id":"$name","name":{$first:"$name"},"count":{$sum:1}}},
      // );

      return null;
    } catch (error) {
      throw new HttpException(500, 'Server side Error troubles for search beer by parameters');
    }
  }
}

export default BeerService;
