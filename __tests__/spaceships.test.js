import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('spaceships routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a spaceship in the database with POST', async () => {
    const rocinante = {
      shipName: 'Rocinante',
      shipSize: '46 meters',
      captainName: 'James Holden',
      fictionalUniverse: 'The Expanse',
      crewSize: 5,
    };

    const res = await request(app).post('/api/v1/spaceships').send(rocinante);

    expect(res.body).toEqual({
      id: '1',
      ...rocinante,
    });
  });
});
