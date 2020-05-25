<template>
<!-- Componente que armazena o formulario de cadastro/atualização dos dados do funcionário -->
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
							{{title}}
						</span>
						<v-spacer></v-spacer>
						<v-btn
						dark
						:to="'/ListarFuncionarios'">
							Listar Funcionários
						</v-btn>
					</v-card-title>
					<v-divider
					class="mb-4"
					color="grey"></v-divider>

					<v-layout
					justify-center>
						<v-flex
						class="px-7"
						lg12>
							<v-form ref="formulario">
								<v-layout
								lg12>
									<v-text-field
									v-model="nome"
									:rules="nameRules"
									label="Nome"
									></v-text-field>
								</v-layout>

								<v-layout>
									<v-text-field
									v-model="email"
									:rules="emailRules"
									label="E-Mail"
									></v-text-field>
								</v-layout>

								<v-layout>
									<v-text-field
									v-model="endereco"
									:rules="enderecoRules"
									label="Endereço"
									></v-text-field>
								</v-layout>

								<v-layout>
									<v-flex
									class="mr-12"
									lg4>
										<v-text-field
										v-model="cpf"
										v-mask="'###.###.###-##'"
										:rules="cpfRules"
										label="CPF"
										></v-text-field>
									</v-flex>

									<v-flex
									lg4>
										<v-text-field
										v-model="idade"
										:rules="idadeRules"
										label="Idade"
										></v-text-field>
									</v-flex>
								</v-layout>

								<v-layout>
									<v-text-field
									v-model="cargo"
									:rules="cargoRules"
									label="Cargo"
									></v-text-field>
								</v-layout>

								<v-layout>
									<v-flex
									class="mr-12"
									lg6>
										<v-text-field
										v-model="salario"
										:rules="salarioRules"
										v-mask="[('#####,##'), ('####,##'), ('###,##')]"
										placeholder="Ex: 000.00"
										label="Salario"
										></v-text-field>
									</v-flex>

									<v-flex
									lg4>
										<v-menu
										v-model="dateMenu"
										transition="scale-transition"
										:close-on-content-click="false"
										offset-y
										max-width="290px"
										min-width="290px">
											<template v-slot:activator="{on}">
												<v-text-field
												v-model="date"
												v-on="on"
												readonly
												label="Data de Contratação"
												:rules="dateRules"
												></v-text-field>
											</template>

											<v-date-picker
											locale="pt-br"
											no-title
											v-model="date"></v-date-picker>
										</v-menu>
									</v-flex>
								</v-layout>

								<v-layout>
									<v-select
									v-model="situacao"
									:items="situacaoSelect"
									:rules="sitRules"
									label="Situação"
									></v-select>
								</v-layout>

								<v-layout
								justify-end>
									<v-btn
									dark
									@click="button.action">
										{{button.name}}
									</v-btn>
								</v-layout>
							</v-form>
						</v-flex>
					</v-layout>
				</v-card>
			</v-col>
		</v-row>
		<Snackbar
		@resetSnackbar="resetSnackbar"
		v-bind:trigger="snackbarTrigger"
		v-bind:snackbarPresets="snackbarPresets"></Snackbar>
	</v-container>
</template>
<script>
import Snackbar from '@/components/views/miscellaneous/Snackbar';

export default {
	name: 'CadUpdFuncionario',
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
			// presets de titulo e nome/acao do botão, que se alteram dependendo do
			// estado da página (cadastrar ou atualizar)
			title: 'Cadastrar Funcionário',
			button: {
				name: 'Cadastrar',
				action: () => {
					this.insertFuncionario();
				}
			},
			// Elementos dos formularios junto com suas regras
			nome: '',
			nameRules: [
				v => !!v || 'Nome requisitado',
				v => (v && v.length <= 64) || 'Nome deve ter menos de 64 caracteres',
				v => /^[A-Za-z \u00C0-\u00FF]*$/.test(v) || 'Caracteres Invalidos'
			],
			cpf: '',
			cpfRules: [
				v => !!v || 'CPF requisitado',
				v => v.length >= 14 || 'CPF deve ter 11 caracteres',
				v => (v && v.length <= 14) || 'CPF deve ter menos de 12 caracteres',
				v => /^[0-9.-]*$/.test(v) || 'Caracteres Invalidos'
			],
			idade: '',
			idadeRules: [
				v => !!v || 'Idade requisitado',
				v => /^[0-9.-]*$/.test(v) || 'Caracteres Invalidos'
			],
			endereco: '',
			enderecoRules: [
				v => !!v || 'Endereço requisitado',
				v => (v && v.length <= 120) || 'Endereço deve ter menos de 120 caracteres',
				v => /^[A-Za-z0-9 \u00C0-\u00FF]*$/.test(v) || 'Caracteres Invalidos'
			],
			email: '',
			emailRules: [
				v => !!v || 'E-mail requisitado',
				v => /.+@.+\..+/.test(v) || 'E-mail deve ser valido',
				v => (v && v.length <= 120) || 'Email deve ter menos de 121 caracteres'
			],
			cargo: '',
			cargoRules: [
				v => !!v || 'Cargo requisitado',
				v => (v && v.length <= 64) || 'Cargo deve ter menos de 64 caracteres',
				v => /^[A-Za-z \u00C0-\u00FF]*$/.test(v) || 'Caracteres Invalidos'
			],
			salario: '',
			salarioRules: [
				v => !!v || 'Salário requisitado',
				v => /^[0-9,.]*$/.test(v) || 'Caracteres invalidos'
			],
			menuDate: false,
			dateMenu: false,
			date: '',
			dateRules: [
				v => !!v || 'Data requisitada',
				v => (v && v.length <= 64) || 'data deve ter menos de 11 caracteres',
				v => /^[0-9-]*$/.test(v) || 'Caracteres invalidos'
			],
			situacaoSelect: [
				'Contratado',
				'Encostado',
				'Demitido'
			],
			situacao: '',
			sitRules: [
				v => !!v || 'Situação requisitada',
				v => (v === 'Contratado' || v === 'Encostado' || v === 'Demitido') || 'Opção invalida'
			]
		}
	},
	mounted () {
		// Identifica se o estado do componente é 'atualizar' assim alterando o titulo e a ação do botão
		if (this.$route.params.action === 'Atualizar') {
			this.title = 'Atualizar funcionário';
			this.button = {
				name: 'Atualizar',
				action: () => {
					this.updateFuncionario()
				}
			}
			this.getFuncById(this.$route.params.userId);
		}

		if (!this.$route.params.action) {
			this.$router.push({ name: 'ListarFuncionarios' });
		}
	},
	methods: {
		// Requisição ao back-end para inserir um funcionário
		insertFuncionario () {
			if (this.$refs.formulario.validate()) {
				this.cpf = this.cpf.replace(/[.-]/g, '');
				this.salario = parseFloat(this.salario.replace(/[,]/, '.'));
				this.idade = parseInt(this.idade);

				const objectForm = {
					nome: this.nome,
					cpf: this.cpf,
					idade: this.idade,
					endereco: this.endereco,
					email: this.email,
					cargo: this.cargo,
					salario: this.salario,
					data: this.date,
					situacao: this.situacao
				};

				this.$axios
					.post('http://localhost:8081/' + 'funcionario/insertFuncionario', objectForm)
					.then((response) => {
						if (response.data.error) {
							this.snackbarTrigger = true;
							this.snackbarPresets = {
								color: 'red darken-4',
								message: 'Houve um erro ao cadastrar o funcionário'
							}
							return;
						}

						// Mudança de componente caso o cadastro seja bem sucedido
						this.$router.push({ name: 'ListarFuncionarios', params: { message: 'Funcionário cadastrado' } });
					});
			}
		},
		// Requisição ao back-end para atualizar os dados de um funcionário
		updateFuncionario () {
			if (this.$refs.formulario.validate()) {
				this.cpf = this.cpf.replace(/[.-]/g, '');
				this.salario = this.salario.replace(/[,]/, '.');
				this.idade = parseInt(this.idade);

				const objectForm = {
					id: this.$route.params.userId,
					nome: this.nome,
					cpf: this.cpf,
					idade: this.idade,
					endereco: this.endereco,
					email: this.email,
					cargo: this.cargo,
					salario: this.salario,
					data: this.date,
					situacao: this.situacao
				};

				this.$axios
					.post('http://localhost:8081/' + 'funcionario/updateFuncionario', objectForm)
					.then((response) => {
						if (response.data.error) {
							this.snackbarTrigger = true;
							this.snackbarPresets = {
								color: 'red darken-4',
								message: 'Houve um erro ao atualizar os dados do funcionário'
							}
							return;
						}

						// Mudança de componente caso o update seja bem sucedido
						this.$router.push({ name: 'ListarFuncionarios', params: { message: 'Funcionário atualizado' } });
					});
			}
		},
		// requisição ao back-end dos dados de um funcionário por seu ID
		getFuncById (id) {
			this.$axios
				.get('http://localhost:8081/' + 'funcionario/selectFuncionarioById/' + id)
				.then((response) => {
					if (response.data.error) {
						this.snackbarTrigger = true;
						this.snackbarPresets = {
							color: 'red darken-4',
							message: 'Houve um erro ao coletar os dados do funcionario'
						}
						return;
					}

					const funcionario = response.data.data;
					funcionario.CPF = funcionario.CPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
					funcionario.SALARIO = this.setSalarioString(funcionario.SALARIO)

					this.nome = funcionario.NOME;
					this.email = funcionario.EMAIL;
					this.endereco = funcionario.ENDERECO;
					this.cpf = funcionario.CPF;
					this.idade = funcionario.IDADE;
					this.cargo = funcionario.CARGO;
					this.salario = funcionario.SALARIO;
					this.date = funcionario.DATA_CONTRATACAO;
					this.situacao = funcionario.SITUACAO;
				});
		},
		// Função que transforma o salario em string e ajusta casas decimais que terminam em 0
		setSalarioString (salario) {
			salario = salario.toString().replace(/\./, ',');
			let splitedSal = salario.split(',');
			if (splitedSal.length > 1 && splitedSal[1].length === 1) {
				salario += '0';
				return salario;
			}

			return salario;
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
		height: 635px;
	}
</style>
