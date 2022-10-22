import { NextFunction, Request, Response } from 'express';
import rTracer from 'cls-rtracer';
import { stringify } from 'flatted';

import { EXTERNAL_API } from '../config/config';
import { Beer } from '../interfaces/beer.interface';
import BeerService from '../service/beer.service';
import AuditModel from '../models/audit.models';

class BeerController {
  public beerService = new BeerService();
  public audit = AuditModel;

  public async saveAudits(req: Request, res: Response) {
    try {
      const requestId = rTracer.id();
      const transformReq = stringify(req);
      const transformRes = stringify(res);
      await this.audit.create({ requestId, req: transformReq, res: transformRes });
    } catch (error) {
      console.log(error);
      throw new Error('there is some troubles saving audits');
    }
  }

  public loadBeersCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addedBeers = await this.beerService.loadBeers(EXTERNAL_API ?? `https://api.punkapi.com/v2/beers?per_page=80`);

      res.status(200).json({ ok: addedBeers, message: addedBeers ? `load Beers succesfully` : `there a trouble loading the beers` });
    } catch (error) {
      next(error);
    } finally {
      await this.saveAudits(req, res);
    }
  };

  public getAllBeersCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const beers = await this.beerService.getAllBeers();
      res.status(201).json({ ok: true, data: beers, message: `get all beers succesfully` });
    } catch (error) {
      next(error);
      console.log(error);
    } finally {
      await this.saveAudits(req, res);
    }
  };

  public getBeerByIdCtrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestId = rTracer.id();
      console.log('🚀 ~ file: beer.controller.ts ~ line 38 ~ BeerController ~ getBeerByIdCtrl= ~ requestId', requestId);
      const beerId: string = req.params.id;
      const findOneBeerData: Beer = await this.beerService.findBeerById(beerId);

      res.status(200).json({ ok: true, data: findOneBeerData, message: `getBeerById succesfully` });
    } catch (error) {
      next(error);
    } finally {
      await this.saveAudits(req, res);
    }
  };
}

export default BeerController;
