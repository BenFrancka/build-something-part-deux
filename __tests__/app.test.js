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
});
