import { Router } from 'express';
import Corporation from '../models/Corporation';

export default Router().post('/', async (req, res, next) => {
  try {
    const company = await Corporation.insert(req.body);

    res.send(company);
  } catch (err) {
    next(err);
  }
});
