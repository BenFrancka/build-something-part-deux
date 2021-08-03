import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Spaceship from '../lib/models/Spaceship.js';

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
      crewSize: 4,
    };

    const res = await request(app).post('/api/v1/spaceships').send(rocinante);

    expect(res.body).toEqual({
      id: '1',
      ...rocinante,
    });
  });

  it('gets a spaceship from the database by id  with GET', async () => {
    const rocinante = await Spaceship.insert({
      shipName: 'Rocinante',
      shipSize: '46 meters',
      captainName: 'James Holden',
      fictionalUniverse: 'The Expanse',
      crewSize: 4,
    });

    const res = await request(app).get(`/api/v1/spaceships/${rocinante.id}`);

    expect(res.body).toEqual(rocinante);
  });
});
