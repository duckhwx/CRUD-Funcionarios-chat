<template>
<!-- componente que lista todos os funcionarios cadastrados -->
	<v-container>
		<v-row
		justify="center"
		align="center">
			<v-col
			cols="10">
				<v-card
				id="block"
				color="grey lighten-1"
				class="px-2 py-1">
					<v-card-title
					class="px-4">
							<span class="headline">
									Funcionários Cadastrados
							</span>
							<v-spacer></v-spacer>
							<v-btn
							dark
							@click="getRoute('CadUpdFuncionario', null, 'Cadastrar')">
									Cadastrar Funcionário
							</v-btn>
					</v-card-title>
					<v-divider
					class="mb-4"
					color="grey"></v-divider>
					<v-layout
					justify-center>
						<v-card
						max-height="415px"
						class="px-2 py-2 overflow-y-auto"
						color="grey lighten-1"
						width="95%"
						flat>
								<v-card
								v-for="(funcionario, index) in funcionarios"
								:key="index"
								width="100%"
								class="my-1"
								color="grey lighten-3"
								flat>
										<v-card-title>
												{{funcionario.nome}}
												<v-spacer></v-spacer>
												<v-tooltip top>
													<template v-slot:activator="{ on }">
														<v-btn
														class="mx-1"
														dark
														v-on="on"
														@click="getRoute('ListarFuncionario', funcionario.id, null)">
															<v-icon>
																fas fa-file
															</v-icon>
														</v-btn>
													</template>
														<span>Dados do Funcionário</span>
												</v-tooltip>
												<v-tooltip top>
													<template v-slot:activator="{ on }">
														<v-btn
														class="mx-1"
														dark
														v-on="on"
														@click="getRoute('CadUpdFuncionario', funcionario.id, 'Atualizar')">
															<v-icon>
																fas fa-pen
															</v-icon>
														</v-btn>
													</template>
													<span>Atualizar Funcionário</span>
												</v-tooltip>
												<v-tooltip top>
													<template v-slot:activator="{ on }">
														<v-btn
														class="mx-1"
														dark
														v-on="on"
														@click="callDialogDelete(funcionario.id)">
															<v-icon>
																fas fa-times
															</v-icon>
														</v-btn>
													</template>
													<span>Excluir Funcionário</span>
												</v-tooltip>
										</v-card-title>
										<v-card-subtitle>
												{{funcionario.cargo}}
										</v-card-subtitle>
								</v-card>
							</v-card>
					</v-layout>
				</v-card>
			</v-col>
		</v-row>
		<DialogDelete
		@resetDialog="resetDialog"
		@deleteFunc="deleteFuncionario"
		v-bind:trigger="dialogTrigger"
		v-bind:dialogPresets="dialogPresets">
		</DialogDelete>
		<Snackbar
		@resetSnackbar="resetSnackbar"
		v-bind:trigger="snackbarTrigger"
		v-bind:snackbarPresets="snackbarPresets"></Snackbar>
	</v-container>
</template>
<script>
import Snackbar from '@/components/views/miscellaneous/Snackbar';
import DialogDelete from '@/components/views/miscellaneous/DialogDelete';

export default {
	name: 'ListarFuncionarios',
	components: {
		Snackbar: Snackbar,
		DialogDelete: DialogDelete
	},
	data () {
		return {
			// presets para a ativação/costumização do snackbar
			snackbarTrigger: false,
			snackbarPresets: {
				color: '',
				message: ''
			},
			// presets para a ativação/costumização do dialog
			dialogTrigger: false,
			dialogPresets: {
				userId: 0,
				title: '',
				message: ''
			},
			funcionarios: []
		}
	},
	mounted () {
		this.selectAllFuncs();

		// Identifica se um cadastro/update teve sucesso, assim ativa o snackbar
		if (this.$route.params.message) {
			this.snackbarTrigger = true;
			this.snackbarPresets = {
				color: 'green darken-4',
				message: this.$route.params.message
			}
		}
	},
	methods: {
		// Requisição ao back-end para coletar todos os funcionários cadastrados e exibi-los no front
		selectAllFuncs () {
			this.funcionarios = [];
			this.$axios
				.get('http://localhost:8081/' + 'funcionario/selectFuncionarios')
				.then((response) => {
					if (response.data.error) {
						this.snackbarTrigger = true;
						this.snackbarPresets = {
							color: 'red darken-4',
							message: 'Houve um erro ao coletar os funcionarios'
						}
						return;
					}
					const funcionarios = response.data.data;

					for (let index = 0; index < funcionarios.length; index += 1) {
						const funcionario = funcionarios[index];
						let funcObject = {};

						funcObject = {
							id: funcionario.ID,
							nome: funcionario.NOME,
							cargo: funcionario.CARGO
						};

						this.funcionarios.push(funcObject);
					}
					this.funcionarios.reverse();
				});
		},
		// Ativação do dialog
		callDialogDelete (id) {
			this.dialogTrigger = true;
			this.dialogPresets = {
				userId: id,
				title: 'Excluir Funcionário',
				message: 'Desejas excluir este funcionário ?'
			}
		},
		// Requisição ao back-end para excluir um funcionários em especifico
		deleteFuncionario (id) {
			this.$axios
				.delete('http://localhost:8081/' + 'funcionario/deleteFuncionario/' + id)
				.then((response) => {
					if (response.data.error) {
						this.snackbarTrigger = true;
						this.snackbarPresets = {
							color: 'red darken-4',
							message: 'Houve um erro ao excluir um funcionário'
						}
						return;
					}

					this.snackbarTrigger = true;
					this.snackbarPresets = {
						color: 'green darken-4',
						message: 'Funcionário excluido'
					}
					this.selectAllFuncs();
				});
		},
		// Troca o componente atual para a rota informada
		getRoute (routeName, id, action) {
			this.$router.push({ name: routeName, params: { userId: id, action } });
		},
		// reset nas informações de configuração do Dialog
		resetDialog () {
			this.dialogTrigger = false;
			this.dialogPresets = {
				title: 'Excluir funcionario',
				message: 'Deseja mesmo excluir este usuário ?'
			};
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
	#block {
		height: 510px;
	}
</style>
