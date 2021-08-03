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

  static async updateById(id, { companyName, parentCompany, slogan }) {
    const existingCompany = await Corporation.getById(id);
    const newCompanyName = companyName ?? existingCompany.companyName;
    const newParentCompany = parentCompany ?? existingCompany.parentCompany;
    const newSlogan = slogan ?? existingCompany.slogan;

    const { rows } = await pool.query(
      'UPDATE corporations SET company_name=$1, parent_company=$2, slogan=$3 WHERE id=$4 RETURNING *',
      [newCompanyName, newParentCompany, newSlogan, id]
    );

    return new Corporation(rows[0]);
  }
}
