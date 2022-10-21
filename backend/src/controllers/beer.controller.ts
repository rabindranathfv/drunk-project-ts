import { NextFunction, Request, Response } from 'express';
import { EXTERNAL_API } from '../config/config';
import BeerService from '../service/beer.service';

class BeerController {
  public beerService = new BeerService();

  public loadBeersCtrl = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const addedBeers = await this.beerService.loadBeers(EXTERNAL_API ?? `https://api.punkapi.com/v2/beers?per_page=80`);

      res.status(200).json({ ok: addedBeers, message: addedBeers ? `load Beers succesfully` : `there a trouble loading the beers` });
    } catch (error) {
      next(error);
    }
  };

  public getAllBeersCtrl = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const beers = await this.beerService.getAllBeers();
      res.status(201).json({ ok: true, data: beers, message: `get all beers succesfully` });
    } catch (error) {
      next(error);
      console.log(error);
    }
  };
}

export default BeerController;
