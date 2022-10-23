import axios, { AxiosResponse } from 'axios';

import { logger } from '../utils/logger';
import { HttpException } from '../exceptions/HttpException';
import { isEmpty } from '../utils/isEmpty';

import BeerModel from './../models/beer.models';
import { Beer, Malt } from '../interfaces/beer.interface';

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
      throw new HttpException(500, 'Server side Error troubles for get specific Beer');
    }
  }

  public async getBeerFilterByNameOrIngridients(query: any): Promise<Beer[] | null> {
    try {
      if (isEmpty(query)) throw new HttpException(400, 'query is empty');
      console.log('SERVICE getBeerFilterByNameOrIngridients***', query);
      const { name, ingredients } = query;

      let queryArray = [];
      if (name && name !== '') {
        queryArray.push({ name: { $regex: '.*' + name + '.*', $options: 'i' } });
      }
      if (ingredients && ingredients !== '') {
        queryArray.push({
          'ingredients.malt.name': { $regex: '.*' + ingredients + '.*', $options: 'i' },
        });
      }
      const queryDB = {
        $or: [...queryArray],
      };
      const findBeers = await this.beers.find(queryDB);

      return findBeers;
    } catch (error) {
      throw new HttpException(500, 'Server side Error troubles for filters on beers');
    }
  }

  public async getBeersTopIngridients(): Promise<Beer[] | null> {
    try {
      const findBeer: Beer[] | null = await this.beers.find({ 'ingredients.malt': { $size: 5 } });

      return findBeer;
    } catch (error) {
      throw new HttpException(500, 'Server side Error troubles for top ingridients in beers');
    }
  }

  public async getBeersBySearch(textSearch: string): Promise<any> {
    try {
      if (isEmpty(textSearch)) throw new HttpException(400, 'serach field is empty');

      const queryDB = [
        {
          $match: {
            $or: [
              { name: { $regex: '.*' + textSearch + '.*', $options: 'i' } },
              { 'ingredients.malt.name': { $regex: '.*' + textSearch + '.*', $options: 'i' } },
            ],
          },
        },
        { $project: { name: 1, 'ingredients.malt.name': 1, _id: 0 } },
      ];
      const findBeers: Beer[] | null = await this.beers.aggregate(queryDB);

      const suggestionOptions = findBeers?.map(({ name, ingredients }: Beer) => {
        const maltNamesCoincidences = ingredients.malt.filter(({ name }: Malt) => {
          return name.toLowerCase().includes(textSearch.trim().toLowerCase());
        });
        return {
          name,
          maltNames: maltNamesCoincidences,
        };
      });

      return suggestionOptions;
    } catch (error) {
      throw new HttpException(500, 'Server side Error troubles for search beer by parameters');
    }
  }
}

export default BeerService;
