const { Pool } = require('pg');
const { User } = require('../../models/user.model');

const bcrypt = require('bcryptjs');

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
  
  async selectAll(table) {
    const conn = this.dbConnection();
    const result = await conn.query(`SELECT * FROM ${table};`);
    await conn.end();
    return result;
  }

  async selectBy(table, column, value) {
    const conn = this.dbConnection();
    const result = await conn.query(`SELECT * FROM ${table} WHERE ${column}='${value}';`);
    await conn.end();
    return result;
  }

  async selectCarByPriceRange(value1, value2) {
    const conn = this.dbConnection();
    const result = await conn.query(`SELECT * FROM cars WHERE price >= ${value1} AND price <= ${value2};`);
    await conn.end();
    return result;
  }

  async selectCarByMinPrice(value1) {
    const conn = this.dbConnection();
    const result = await conn.query(`SELECT * FROM cars WHERE price >= ${value1};`);
    await conn.end();
    return result;
  }

  async selectCarByMaxPrice(value1) {
    const conn = this.dbConnection();
    const result = await conn.query(`SELECT * FROM cars WHERE price <= ${value1};`);
    await conn.end();
    return result;
  }

  async selectCount(table, column, value){
    const conn = this.dbConnection();
    const result = await conn.query(`SELECT COUNT(1) FROM ${table} WHERE ${column} = '${value}';`);
    await conn.end();
    return result;
  }

  async createDb(){
    const conn = this.dbConnection();
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users( Id SERIAL, FirstName VARCHAR(50) NOT NULL, LastName VARCHAR(50) NOT NULL, Email VARCHAR(50) UNIQUE NOT NULL, Password VARCHAR(255) NOT NULL, Address VARCHAR(50) NOT NULL, IsAdmin BOOLEAN NOT NULL DEFAULT false, PRIMARY KEY (id));

      CREATE TABLE IF NOT EXISTS cars ( Id SERIAL, Owner INTEGER REFERENCES users(id) ON DELETE CASCADE, Create_on TIMESTAMP NOT NULL DEFAULT NOW(), State VARCHAR(30) NOT NULL, Status VARCHAR(30) NOT NULL, Price FLOAT NOT NULL, Manufacturer VARCHAR(30) NOT NULL, Model VARCHAR(30) NOT NULL, Body_type VARCHAR(30) NOT NULL, PRIMARY KEY (id));

      CREATE TABLE IF NOT EXISTS orders ( Id SERIAL, Buyer INTEGER REFERENCES users(id) ON DELETE CASCADE, Car_id INTEGER REFERENCES cars(id) ON DELETE CASCADE, Amount INTEGER NOT NULL, Status VARCHAR(30) NOT NULL, priceOffered INTEGER NOT NULL, PRIMARY KEY (id));

      CREATE TABLE IF NOT EXISTS flags ( Id SERIAL, Car_id INTEGER REFERENCES cars(id) ON DELETE CASCADE, reason VARCHAR(225), Create_on TIMESTAMP NOT NULL DEFAULT NOW(), Description VARCHAR(225) NOT NULL, PRIMARY KEY (id));
    `);

    const result = await this.selectBy('users', 'email', 'admin@automart.com');

    if (result.rowCount == 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('123456789', salt);
      this.addUserAdmin(new User('admin@automart.com', 'Admin', 'Admin', `${hashedPassword}`, 'Kigali', true));
    }
    
    await conn.end();
    return;
  }

  async addUser(data) {
    const conn = this.dbConnection();
    const result = await conn.query(`INSERT INTO users(firstname,lastname,email,password,address) VALUES(
        '${data.first_name}',
        '${data.last_name}',
        '${data.email}',
        '${data.password}',
        '${data.address}'
      ) returning *;
    `);
    
    await conn.end();

    return result;
  }

  async addUserAdmin(data) {
    const conn = this.dbConnection();
    const result = await conn.query(`INSERT INTO users(firstname,lastname,email,password,address,isadmin) VALUES(
        '${data.first_name}',
        '${data.last_name}',
        '${data.email}',
        '${data.password}',
        '${data.address}',
        '${data.is_admin}'
      ) returning *;
    `);
    
    await conn.end();

    return result;
  }

  async addCar(data) {
    const conn = this.dbConnection();
    const result = await conn.query(`INSERT INTO cars(owner,state,status,price,manufacturer,model,body_type) VALUES(
        '${data.owner}',
        '${data.state}',
        '${data.status}',
        '${data.price}',
        '${data.manufacturer}',
        '${data.model}',
        '${data.body_type}'
      ) returning *;
    `);
    
    await conn.end();

    return result;
  }

  async addOrder(data) {
    const conn = this.dbConnection();
    const result = await conn.query(`INSERT INTO orders(buyer,car_id,amount,status,priceoffered) VALUES(
        '${data.buyer}',
        '${data.car_id}',
        '${data.amount}',
        '${data.status}',
        '${data.price_offered}'
      ) returning *;
    `);
    await conn.end();
    return result;
  }

  async addFlag(data) {
    const conn = this.dbConnection();
    const result = await conn.query(`INSERT INTO flags(car_id, reason, description) VALUES(
        ${data.car_id},
        '${data.reason}',
        '${data.description}'
      ) returning *;
    `);
    await conn.end();
    return result;
  }

  async updateCarPrice(data){
    const conn = this.dbConnection();
    const result = await conn.query(`UPDATE cars SET price = '${data.price}' WHERE id = '${data.id}' AND owner = '${data.owner}' returning *;`);
    await conn.end();
    return result;
  }

  async updateOrderPrice(data){
    const conn = this.dbConnection();
    const result = await conn.query(`UPDATE orders SET priceOffered = ${data.price} WHERE id = '${data.id}' AND buyer = '${data.buyer}' returning *;`);
    await conn.end();
    return result;
  }

  async updateCarStatus(data){
    const conn = this.dbConnection();
    const result = await conn.query(`UPDATE cars SET status = '${data.status}' WHERE id = '${data.id}' AND owner = '${data.owner}' returning *;`);
    await conn.end();
    return result;
  }

  async deleteCar(id){
    const conn = this.dbConnection();
    const result = await conn.query(`DELETE FROM cars WHERE id = '${id}';`);
    await conn.end();
    return result;
  }

  async deleteIfExist(table, column, value){
    const conn = this.dbConnection();
    const result = await conn.query(`DELETE FROM ${table} WHERE ${column} = '${value}' CASCADE;`);
    await conn.end();
    return result;
  }
  
}

module.exports.Database = Database;