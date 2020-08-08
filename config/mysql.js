"use strict";

const mysql = require("mysql");

let connPool = [];

async function getConnection(sourceDb) {
  let activePool = connPool.find(x => x.sourceDb === sourceDb);

  if (!activePool) {
    const newPool = mysql.createPool({
      connectionLimit: 500,
      connectTimeout: 60 * 60 * 1000,
      acquireTimeout: 60 * 60 * 1000,
      timeout: 60 * 60 * 1000,
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      multipleStatements: true
    });

    activePool = { sourceDb, pool: newPool };
    connPool.push(activePool);
  }

  return activePool.pool;
}

module.exports.getConnection = getConnection;