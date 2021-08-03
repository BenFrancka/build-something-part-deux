import { Router } from 'express';
import Corporation from '../models/Corporation';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const company = await Corporation.insert(req.body);

      res.send(company);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const company = await Corporation.getById(id);

      res.send(company);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const companies = await Corporation.getAll();

      res.send(companies);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { companyName, parentCompany, slogan } = req.body;

      const updatedCompany = await Corporation.updateById(id, {
        companyName,
        parentCompany,
        slogan,
      });

      res.send(updatedCompany);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;

      const company = await Corporation.deleteById(id);

      res.send({
        message: `Board Notification: ${company.companyName} has been liquidated and removed from the database`,
      });
    } catch (err) {
      next(err);
    }
  });
