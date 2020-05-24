const sql = require('../../database/SqlFuncs');
const mssql = require('mssql');

// Requisitar todas as mensagens no banco
exports.getMessages = (callback) => {
    let qryString = 'SELECT 		';
    qryString += '  ID,     		';
    qryString += 'TEXT,     		';
    qryString += '  DATA   			';
    qryString += '  FROM    		';
		qryString += 'MESSAGE   		';
		
		sql.connect((connection, ps, error) => {
				if (error) {
					callback(true, null);
						return;
				}

				sql.execPrepare(qryString, null, ps, (err, result) => {
						if (err) {
							callback(true, null);
								return;
						}

						callback(false, result);
				});
		});
};

// Inserir uma mensagem no banco
exports.insertMessage = (params, callback) => {
		let qryString = 'INSERT																						';
		qryString += '	INTO																							';
		qryString += 'MESSAGE																							';
		qryString += '	(ID,																							';
		qryString += 'TEXT,																								';
		qryString += '	DATA)																							';
		qryString += 'VALUES																							';
		qryString += '	(ISNULL((SELECT MAX(ID)+1 FROM MESSAGE), 1),			';
		qryString += '@TEXT,																							';
		qryString += `	'${params.DATA}')																	`;

		sql.connect((connection, ps, error) => {
				if (error) {
					callback(true, null);
						return;
				}

				ps.input('TEXT', mssql.VarChar(120));

				sql.execPrepare(qryString, params, ps, (err, result) => {
						if (err) {
							callback(true);
								return;
						}

						callback(false);
				});
		});	
};