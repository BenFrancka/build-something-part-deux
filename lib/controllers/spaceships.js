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
  })
  .get('/', async (req, res, next) => {
    try {
      const ships = await Spaceship.getAll();

      res.send(ships);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { shipName, shipSize, captainName, fictionalUniverse, crewSize } =
        req.body;

      const updatedShip = await Spaceship.updateById(id, {
        shipName,
        shipSize,
        captainName,
        fictionalUniverse,
        crewSize,
      });

      res.send(updatedShip);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;

      await Spaceship.deleteById(id);
    } catch (err) {
      next(err);
    }
  });
