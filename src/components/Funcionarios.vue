// Componente principal que abrange os outros
<template>
	<v-app style="background: white">
		<Nav></Nav>
		<router-view/>
		<Chat></Chat>
	</v-app>
</template>

<script>
import Nav from '@/components/views/navbars/HomeNavbar'
import Chat from '@/components/views/chat/Chat'

export default {
	name: 'Funcionarios',
	components: {
		Nav: Nav,
		Chat: Chat
	},
	data () {
		return {

		}
	}
}
</script>
<style>
/* Definições de estilos para a scrollBar */
	::-webkit-scrollbar {
		width: 10px;
	}

	::-webkit-scrollbar-track {
		background-color: #818181;
		border-radius: 10px;
	}

	::-webkit-scrollbar-thumb {
		background: rgb(88, 88, 88);
		border-radius: 10px;
	}
</style>
