<template>
<!-- Botão ao canto inferior direito da tela que abre um chat -->
	<div>
		<v-menu
		left
		:close-on-content-click="false"
		transition="slide-x-reverse-transition">
			<template v-slot:activator="{ on }">
				<v-btn
				right
				bottom
				fixed
				v-on="on">
					<v-icon>
						far fa-comment-alt
					</v-icon>
				</v-btn>
			</template>

			<v-card
			class="px-3"
			color="grey lighten-1"
			height="450px"
			width="330px">
				<v-card-title>
					Chat
				</v-card-title>

				<v-divider
				class="py-1"></v-divider>

				<v-card
				class="px-2 pt-2 overflow-y-auto scroll"
				color="grey lighten-5"
				height="307px"
				max-height="400px"
				flat>
				<v-layout
				v-for="(message, index) in messages"
				:key="index">
					<v-flex
					class="caption"
					lg5>
						{{message.DATA}}
					</v-flex>
					<v-flex
					lg7>
						{{message.TEXT}}
					</v-flex>
				</v-layout>
				</v-card>
				<v-form ref="chatMessage">
					<v-layout
					align-center>
						<v-flex
						class="mr-5"
						lg9>
							<v-text-field
							v-model="message"
							:rules="messageRules"
							placeholder="Digite sua Menssagem"></v-text-field>
						</v-flex>
						<v-flex
						lg3>
							<v-btn
							small
							dark
							@click="insertMessage">Enviar</v-btn>
						</v-flex>
					</v-layout>
				</v-form>
			</v-card>
		</v-menu>
		<Snackbar
		@resetSnackbar="resetSnackbar"
		v-bind:trigger="snackbarTrigger"
		v-bind:snackbarPresets="snackbarPresets"></Snackbar>
	</div>
</template>
<script>
import Snackbar from '@/components/views/miscellaneous/Snackbar';

export default {
	name: 'Chat',
	components: {
		Snackbar: Snackbar
	},
	data () {
		return {
			// presets para a ativação/costumização do snackbar
			snackbarTrigger: false,
			snackbarPresets: {
				color: '',
				message: ''
			},
			messages: [],
			message: '',
			messageRules: [
				v => !!v || 'Mensagem requisitada',
				v => (v && v.length <= 120) || 'Mensagem deve ter menos de 120 caracteres'
			]
		}
	},
	mounted () {
		// Identifica a emissão do socket para enviar todas as mensagens e coloca-las no chat
		this.$socket.on('allMessages', (messages) => {
			this.messages = messages
		});

		// Identifica a emissão do socket para saber se uma nova mensagem foi adicionada
		// e adiciona ao chat
		this.$socket.on('newMessage', (message) => {
			this.$refs.chatMessage.reset();
			this.messages.push(message);
		});

		// Identifica um erro em alguma consulta referente ao chat no back-end e invoca um snackbar de erro
		this.$socket.on('errorMessage', (message) => {
			this.snackbarTrigger = true;
			this.snackbarPresets = {
				color: 'red darken-4',
				message: message.message
			}
		});
	},
	methods: {
		// Requisita ao socket a inseção de uma mensagem enviada no chat ao banco
		insertMessage () {
			if (this.$refs.chatMessage.validate()) {
				this.$socket.emit('sendMessage', this.message);
			}
		},
		// reset nas informações de configuração do Snackbar
		resetSnackbar () {
			this.snackbarTrigger = false;
			this.snackbarPresets = {
				color: '',
				message: ''
			}
		}
	}
}
</script>
<style scoped>
</style>
