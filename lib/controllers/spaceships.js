import { Router } from 'express';
import Spaceship from '../models/Spaceship';

export default Router().post('/', async (req, res, next) => {
  try {
    const ship = await Spaceship.insert(req.body);

    res.send(ship);
  } catch (err) {
    next(err);
  }
});
