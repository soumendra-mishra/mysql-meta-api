"use strict";

const sql = require('../config/mysql');

exports.index = async function (req, res) {
    const sourceDb = req.params.sourcedb;
    const schema = req.params.schema;

    const dbConn = await sql.getConnection(sourceDb);
    const dbQuery = `SELECT TABLE_NAME
                       FROM information_schema.tables
                      WHERE table_schema = ${dbConn.escape(schema)}`;

    dbConn.query(dbQuery, function (error, results) {
        if (error) throw error;

        let tblList = [];
        for (let tbl of results) {
            let obj = { "name": tbl.TABLE_NAME }
            tblList.push(obj);
        }

        res.status(200).send(tblList);
    });
};