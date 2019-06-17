const { Pool } = require('pg');

class Database{
  
  dbConnection() {
    return new Pool({
      connectionString: 'postgresql://postgres:Veda1.@127.0.0.1:5432/auto_mart',
    });
  }

  async selectById(table, id) {
    const conn = this.dbConnection();
    const result = await conn.query(`SELECT * FROM ${table} WHERE id='${id}';`);
    await conn.end();
    return result;
  }

  async createUserTable() {
    const conn = this.dbConnection();
    const result = await conn.query(`
      CREATE TABLE IF NOT EXISTS users(
        Id varchar(255) PRIMARY KEY,
        FirstName varchar(50),
        LastName varchar(50),
        Email varchar(50),
        Password varchar(255),
        Address varchar(50),
        IsAdmin boolean
      );
    `);

    await conn.end();

    return result;
  }

  async addUser(data) {
    const conn = this.dbConnection();
    const result = await conn.query(`INSERT INTO users VALUES(
        '${data.id}',
        '${data.first_name}',
        '${data.last_name}',
        '${data.email}',
        '${data.password}',
        '${data.address}',
        ${data.is_admin}
      );
    `);
    
    await conn.end();

    return result;
  }
  
}

module.exports.Database = Database;