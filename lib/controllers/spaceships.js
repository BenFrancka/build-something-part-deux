import { Router } from 'express';
import Spaceship from '../models/Spaceship';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const ship = await Spaceship.insert(req.body);

      res.send(ship);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const ship = await Spaceship.getById(id);

      res.send(ship);
    } catch (err) {
      next(err);
    }
  });
