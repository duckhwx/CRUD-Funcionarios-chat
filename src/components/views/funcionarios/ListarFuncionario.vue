<template>
<!-- Componente que lista as informações de um funcionário selecionado -->
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
								Dados do Funcionário
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
						<v-card
						id="funcBox"
						height="420px"
						class="px-2 py-2"
						color="grey lighten-1"
						width="95%"
						flat>
							<v-flex>
								Nome: {{funcionario.nome}}
							</v-flex>
							<v-flex>
								E-mail:  {{funcionario.email}}
							</v-flex>
							<v-flex>
								Endereço: {{funcionario.endereco}}
							</v-flex>
							<v-layout>
								<v-flex>
									CPF: {{funcionario.cpf}}
								</v-flex>
								<v-flex>
									Idade: {{funcionario.idade}}
								</v-flex>
							</v-layout>
							<v-flex>
								Cargo: {{funcionario.cargo}}
							</v-flex>
							<v-layout>
								<v-flex>
									Salário: R${{funcionario.salario}}
								</v-flex>
								<v-flex>
									Data de Aprovação: {{funcionario.dataAprovacao}}
								</v-flex>
							</v-layout>
							<v-flex>
								Situação: {{funcionario.situacao}}
							</v-flex>
						</v-card>
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
	name: 'ListarFuncionario',
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
			funcionario: {
				nome: '',
				email: '',
				endereco: '',
				cpf: '',
				idade: '',
				cargo: '',
				salario: '',
				dataAprovacao: '',
				situacao: ''
			}
		}
	},
	mounted () {
		this.getFuncById(this.$route.params.userId);
	},
	methods: {
		// Requisição ao back-end para coletar os dados do funcionário e exibir no front
		getFuncById (id) {
			this.$axios
				.get('http://localhost:8081/' + 'funcionario/selectFuncionarioById/' + id)
				.then((response) => {
					if (response.data.error) {
						this.snackbarTrigger = true;
						this.snackbarPresets = {
							color: 'red darken-4',
							message: 'Houve um erro ao coletar os dados do Funcionário'
						}
						return;
					}
					// função RegExp para configurar a exibição ao tipo CPF
					const funcionario = response.data.data;
					funcionario.CPF = funcionario.CPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');

					this.funcionario.nome = funcionario.NOME;
					this.funcionario.email = funcionario.EMAIL;
					this.funcionario.endereco = funcionario.ENDERECO;
					this.funcionario.cpf = funcionario.CPF;
					this.funcionario.idade = funcionario.IDADE;
					this.funcionario.cargo = funcionario.CARGO;
					this.funcionario.salario = funcionario.SALARIO;
					this.funcionario.dataAprovacao = funcionario.DATA_CONTRATACAO;
					this.funcionario.situacao = funcionario.SITUACAO;
				});
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
	#funcBox>div {
		margin: 22px 0px;
		font-size: 20px;
	}
</style>
