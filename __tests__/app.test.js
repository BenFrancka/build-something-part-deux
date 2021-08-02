import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Corporation from '../lib/models/Corporation.js';

describe('corporations routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a corporation in the database with POST', async () => {
    const spacersChoice = {
      companyName: 'spacers choice',
      parentCompany: 'universal defense logistics',
      slogan: 'its not the best choice, its spacers choice',
    };

    const res = await request(app)
      .post('/api/v1/corporations')
      .send(spacersChoice);

    expect(res.body).toEqual({
      id: '1',
      ...spacersChoice,
    });
  });

  it('gets a corporation from the database by id  with GET', async () => {
    const spacersChoice = await Corporation.insert({
      companyName: 'spacers choice',
      parentCompany: 'universal defense logistics',
      slogan: 'its not the best choice, its spacers choice',
    });

    const res = await request(app).get(
      `/api/v1/corporations/${spacersChoice.id}`
    );

    expect(res.body).toEqual(spacersChoice);
  });

  it('gets all corporations from the database with GET', async () => {
    const spacersChoice = await Corporation.insert({
      companyName: 'spacers choice',
      parentCompany: 'universal defense logistics',
      slogan: 'its not the best choice, its spacers choice',
    });
    const auntieCleos = await Corporation.insert({
      companyName: 'auntie cleos',
      parentCompany: 'Kolway Pharmaceuticals',
      slogan: 'the contractually obligated only choice',
    });
    const subLight = await Corporation.insert({
      companyName: 'subLight Salvage and Shipping Corporation',
      parentCompany: 'Groundbreaker Station',
      slogan: 'subLight puts the organized in organized crime',
    });

    const res = await request(app).get('/api/v1/corporations/');

    expect(res.body).toEqual([spacersChoice, auntieCleos, subLight]);
  });

  it('updates a corporation in the database by id  with PUT', async () => {
    const spacersChoice = await Corporation.insert({
      companyName: 'spacers choice',
      parentCompany: 'universal defense logistics',
      slogan: 'its not the best choice, its spacers choice',
    });

    const res = await request(app)
      .put(`/api/v1/corporations/${spacersChoice.id}`)
      .send({
        slogan: 'at spacers choice, we cut corners so you dont have to',
      });

    expect(res.body).toEqual({
      ...spacersChoice,
      slogan: 'at spacers choice, we cut corners so you dont have to',
    });
  });
});
