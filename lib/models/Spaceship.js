import pool from '../utils/pool.js';

export default class Spaceship {
  id;
  shipName;
  shipSize;
  captainName;
  fictionalUniverse;
  crewSize;

  constructor(row) {
    this.id = row.id;
    this.shipName = row.ship_name;
    this.shipSize = row.ship_size;
    this.captainName = row.captain_name;
    this.fictionalUniverse = row.fictional_universe;
    this.crewSize = row.crew_size;
  }
}
