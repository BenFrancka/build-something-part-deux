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

  static async insert({
    shipName,
    shipSize,
    captainName,
    fictionalUniverse,
    crewSize,
  }) {
    const { rows } = await pool.query(
      'INSERT INTO spaceships (ship_name, ship_size, captain_name, fictional_universe, crew_size) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [shipName, shipSize, captainName, fictionalUniverse, crewSize]
    );

    return new Spaceship(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM spaceships WHERE id=$1', [
      id,
    ]);

    return new Spaceship(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM spaceships');

    return rows.map((row) => new Spaceship(row));
  }
}
