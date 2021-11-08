const mysql = require('mysql2/promise');

const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'if670_memories',
};

exports.query = async (sql, params) => {
  const conn = await mysql.createConnection(config);
  const [rows] = await conn.execute(sql, params);

  return rows;
};
