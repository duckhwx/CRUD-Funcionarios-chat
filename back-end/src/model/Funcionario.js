const sql = require('../../database/SqlFuncs');
const mssql = require('mssql');

// Selecionar todos os funcionarios cadastrados
exports.selectFuncionarios = (cb) => {
	let qryString = 'SELECT         ';
	qryString += 'ID,               ';
	qryString += '  NOME,           ';
	qryString += 'CARGO             ';
	qryString += '  FROM            ';
	qryString += 'FUNCIONARIO       ';

	sql.connect((connection, ps, error) => {
		if (error) {
			cb(true, null);
			return;
		}

		sql.execPrepare(qryString, null, ps, (err, result) => {
			if (err) {
				connection.close();
				cb(true, null);
				return;
			}

			cb(false, result.recordset);
		});
	});
};

// selecionar um unico funcionario por id
exports.selectFuncionarioById = (param, cb) => {
	let qryString = 'SELECT                 ';
	qryString += 'ID,                       ';
	qryString += '  NOME,                   ';
	qryString += 'CPF,                      ';
	qryString += '  IDADE,                  ';
	qryString += 'ENDERECO,                 ';
	qryString += '  EMAIL,                  ';
	qryString += 'CARGO,                    ';
	qryString += '  SALARIO,                ';
	qryString += 'DATA_CONTRATACAO,         ';
	qryString += '  SITUACAO                ';
	qryString += 'FROM                      ';
	qryString += '   FUNCIONARIO            ';
	qryString += 'WHERE                     ';
	qryString += '   ID = @USER_ID          ';

	sql.connect((connection, ps, error) => {
		if (error) {
			cb(true, null);
			return;
		}

		ps.input('USER_ID', mssql.Int);

		sql.execPrepare(qryString, param, ps, (err, result) => {
			if (err) {
				cb(true, null);
				return;
			}

			cb(false, result.recordset[0]);
		});
	});
};

// inserir um funcionario no banco
exports.insertFuncionario = (params, cb) => {
	let qryString = 'INSERT                                           ';
	qryString += '  INTO                                              ';
	qryString += 'FUNCIONARIO                                         ';
	qryString += '  (ID,                                              ';
	qryString += 'NOME,                                               ';
	qryString += '  CPF,                                              ';
	qryString += 'IDADE,                                              ';
	qryString += '  ENDERECO,                                         ';
	qryString += 'EMAIL,                                              ';
	qryString += '  CARGO,                                            ';
	qryString += 'SALARIO,                                            ';
	qryString += '  DATA_CONTRATACAO,                                 ';
	qryString += 'SITUACAO)                                           ';
	qryString += '  VALUES                                            ';
	qryString += '(ISNULL((SELECT MAX(ID)+1 FROM FUNCIONARIO), 1),    ';
	qryString += '  @NOME,                                            ';
	qryString += '@CPF,                                               ';
	qryString += '  @IDADE,                                           ';
	qryString += '@ENDERECO,                                          ';
	qryString += '  @EMAIL,                                           ';
	qryString += '@CARGO,                                             ';
	qryString += '  @SALARIO,                                         ';
	qryString += '@DATA_CONTRATACAO,                                  ';
	qryString += '  @SITUACAO)                                        ';

	sql.connect((connection, ps, error) => {
		if (error) {
			cb(true, null);
			return;
		}

		ps.input('NOME', mssql.VarChar(64));
		ps.input('CPF', mssql.VarChar(11));
		ps.input('IDADE', mssql.Int);
		ps.input('ENDERECO', mssql.VarChar(120));
		ps.input('EMAIL', mssql.VarChar(120));
		ps.input('CARGO', mssql.VarChar(64));
		ps.input('SALARIO', mssql.Decimal(8, 4));
		ps.input('DATA_CONTRATACAO', mssql.Date);
		ps.input('SITUACAO', mssql.VarChar(10));

		sql.execPrepare(qryString, params, ps, (err, result) => {
			if (err) {
				cb(true, null);
				return;
			}

			cb(false, result.recordset);
		});
	});
};

// Atualizar os dados de um funcionario
exports.updateFuncionario = (params, cb) => {
	let qryString = 'UPDATE                                 ';
	qryString += 'FUNCIONARIO                               ';
	qryString += '  SET                                     ';
	qryString += 'NOME = @NOME,                             ';
	qryString += '  CPF = @CPF,                             ';
	qryString += 'IDADE = @IDADE,                           ';
	qryString += '  ENDERECO = @ENDERECO,                   ';
	qryString += 'EMAIL = @EMAIL,                           ';
	qryString += '  CARGO = @CARGO,                         ';
	qryString += 'SALARIO = @SALARIO,                       ';
	qryString += '  DATA_CONTRATACAO = @DATA_CONTRATACAO,   ';
	qryString += 'SITUACAO = @SITUACAO                      ';
	qryString += '  WHERE                                   ';
	qryString += 'ID = @ID                                  ';

	sql.connect((connection, ps, error) => {
		if (error) {
			cb(true, null);
			return;
		}

		ps.input('NOME', mssql.VarChar(64));
		ps.input('CPF', mssql.VarChar(11));
		ps.input('IDADE', mssql.Int);
		ps.input('ENDERECO', mssql.VarChar(120));
		ps.input('EMAIL', mssql.VarChar(120));
		ps.input('CARGO', mssql.VarChar(64));
		ps.input('SALARIO', mssql.Decimal(8, 2));
		ps.input('DATA_CONTRATACAO', mssql.Date);
		ps.input('SITUACAO', mssql.VarChar(10));
		ps.input('ID', mssql.Int);

		sql.execPrepare(qryString, params, ps, (err, result) => {
			if (err) {
				cb(true, null);
				return;
			}
			cb(false, result.recordset);
		});
	});
};

// Excluir um funcionario
exports.deleteFuncionario = (params, cb) => {
	let qryString = 'DELETE         ';
	qryString += '  FROM            ';
	qryString += 'FUNCIONARIO       ';
	qryString += '  WHERE           ';
	qryString += 'ID = @ID          ';

	sql.connect((connection, ps, error) => {
		if (error) {
			cb(true, null);
			return;
		}

		ps.input('ID', mssql.Int);

		sql.execPrepare(qryString, params, ps, (err, result) => {
			if (err) {
				cb(true, null);
				return;
			}

			cb(false, result.recordset);
		});
	});
};
