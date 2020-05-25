const moment = require('moment');
const Chat = require('../model/Chat');

// Requisita a consulta de todas as mensagens cadastradas ao model
exports.getMessages = (callback) => {
	Chat.getMessages((status, data) => {
		if (status || data.rowsAffected < 1) {
			callback(status, data.recordset);
			return;
		}
		const messages = data.recordset;
		for (let index = 0; index < messages.length; index += 1) {
			const message = messages[index];
			message.DATA = moment.utc(message.DATA).format('DD-MM-YYYY hh:mm');
		}
		callback(status, messages);
	});
};

// Requisita a inserção de uma mensagem ao model
exports.sendMessage = (params, callback) => {
	const date = moment().format('YYYY-MM-DDThh:mm:ss.000');
	const messageObj = {
		TEXT: params,
		DATA: date
	};

	Chat.insertMessage(messageObj, (status) => {
		messageObj.DATA = moment(messageObj.DATA).format('DD-MM-YYYY hh:mm');
		callback(messageObj, status);
	});
};
