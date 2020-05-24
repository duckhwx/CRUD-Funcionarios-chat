const sql = require('mssql');
const config =require('../config/Config.json');

// Função de conexão com o banco e criação da connectionPool e PreparedStatement
exports.connect = async (callback) => {
    const pool = new sql.ConnectionPool(config.database);
    const poolConnect = pool.connect();

    pool.on('error', err => {
        callback(err, null);
        return;
    })

    poolConnect.then((connection) => {
        const ps = new sql.PreparedStatement(connection);
        callback(connection, ps);
    });
};

// Função que prepara a query e a executa 
exports.execPrepare = (qryString, param, ps, callback) => {
    ps.prepare(qryString, err => {
        if (err) {
            callback(err, null);
            return
        }
     
        ps.execute(param, (err, result) => {
            if (err) {
                callback(err, null);
                return;
            }
     
            ps.unprepare(err => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, result);
            });
        });
    });
};