import Vue from 'vue'
import Router from 'vue-router'
import Funcionarios from '@/components/Funcionarios'
import CadUpdFuncionario from '@/components/views/funcionarios/CadUpdFuncionario';
import ListarFuncionarios from '@/components/views/funcionarios/ListarFuncionarios';
import ListarFuncionario from '@/components/views/funcionarios/ListarFuncionario';

Vue.use(Router)

// Definição das rotas
export default new Router({
	routes: [
		{
			path: '/',
			name: 'Funcionarios',
			component: Funcionarios,
			children: [
				{path: '/ListarFuncionarios', name: 'ListarFuncionarios', component: ListarFuncionarios},
				{path: '/CadUpdFuncionario', name: 'CadUpdFuncionario', component: CadUpdFuncionario},
				{path: '/ListarFuncionario', name: 'ListarFuncionario', component: ListarFuncionario},
				{path: '*', redirect: '/ListarFuncionarios'}
			]
		}
	]
})
