import pool from '../utils/pool.js';

export default class Corporation {
  id;
  companyName;
  parentCompany;
  slogan;

  constructor(row) {
    this.id = row.id;
    this.companyName = row.company_name;
    this.parentCompany = row.parent_company;
    this.slogan = row.slogan;
  }

  static async insert({ companyName, parentCompany, slogan }) {
    const { rows } = await pool.query(
      'INSERT INTO corporations (company_name, parent_company, slogan) VALUES ($1, $2, $3) RETURNING *',
      [companyName, parentCompany, slogan]
    );

    return new Corporation(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM corporations WHERE id=$1',
      [id]
    );

    return new Corporation(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM corporations');

    return rows.map((row) => new Corporation(row));
  }
}
