"use strict";

const sql = require('../config/mysql');

exports.index = async function (req, res) {
    const sourceDb = req.params.sourcedb;
    const schema = req.params.schema;
    const table = req.params.table;

    const dbConn = await sql.getConnection(sourceDb);
    const dbQuery = `SELECT count(*) as count FROM ${schema}.${table}`;

    dbConn.query(dbQuery, function (error, results) {
        if (error) throw error;

        let obj = { "count": results[0], "table": table, "schema": schema, "sourceDb": sourceDb }
        res.status(200).send(obj);
    });
};