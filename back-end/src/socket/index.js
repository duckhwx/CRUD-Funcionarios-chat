const Chat = require('../controller/Chat');

module.exports = (io) => {
	io.on('connection', (socket) => {
		// Função inicial que retorna ao front todas as mensagem cadastradas no banco
		Chat.getMessages((err, messages) => {
			if (err) {
				io.sockets.emit('errorMessage', { message: 'Houve um erro ao coletar as mensagens' });
				return;
			}

			io.sockets.emit('allMessages', messages);
		});

		// Captura a mensagem enviada no front
		socket.on('sendMessage', (message) => {
			Chat.sendMessage(message, (messageObj, err) => {
				if (err) {
					socket.emit('errorMessage', { message: 'Houve um erro ao enviar a mensagem' });
					return;
				}

				io.sockets.emit('newMessage', messageObj);
			});
		});
	});
};
