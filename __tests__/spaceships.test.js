import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Spaceship from '../lib/models/Spaceship.js';
import e from 'express';

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

  it('gets all spaceships from the database with GET', async () => {
    const rocinante = await Spaceship.insert({
      shipName: 'Rocinante',
      shipSize: '46 meters',
      captainName: 'James Holden',
      fictionalUniverse: 'The Expanse',
      crewSize: 4,
    });
    const firefly = await Spaceship.insert({
      shipName: 'Serenity',
      shipSize: '82.1 meters',
      captainName: 'Malcom Reynolds',
      fictionalUniverse: 'Firefly',
      crewSize: 8,
    });
    const enterprise = await Spaceship.insert({
      shipName: 'Enterprise NCC-1701-D',
      shipSize: '300 meters',
      captainName: 'Jean-Luc Picard',
      fictionalUniverse: 'Star Trek The Next Generation',
      crewSize: 1012,
    });

    const res = await request(app).get('/api/v1/spaceships/');

    expect(res.body).toEqual([rocinante, firefly, enterprise]);
  });
});
