const express = require('express');
const Funcionario = require('../model/Funcionario');
const moment = require('moment');

const router = express.Router();

// Requisitar a seleção de todos os funcionário ao model
router.get('/selectFuncionarios', (req, res) => {
    let callback = {};
    Funcionario.selectFuncionarios((status, data) => {
        callback = {
            error: status,
            data
        };

        res.send(callback);
    });
});

// requisitar a seleção de um unico funcionário por id ao model
router.get('/selectFuncionarioById/:id', (req, res) => {
    let callback = {};
    const paramObject = {
        USER_ID: req.params.id
    };

    Funcionario.selectFuncionarioById(paramObject, (status, data) => {
        callback = {
            status,
            data
        };
        let dataContratacao = moment.utc(callback.data.DATA_CONTRATACAO).format('YYYY-MM-DD');
        callback.data.DATA_CONTRATACAO = dataContratacao;

        res.send(callback);
    });
});

// Requisitar a inserção do funcionário no model
router.post('/insertFuncionario', (req, res) => {
    let callback = {};
    const funcObject = {
        NOME: req.body.nome,
        EMAIL: req.body.email,
        ENDERECO: req.body.endereco,
        CPF: req.body.cpf,
        IDADE: req.body.idade,
        CARGO: req.body.cargo,
        SALARIO: req.body.salario,
        DATA_CONTRATACAO: req.body.data,
        SITUACAO: req.body.situacao
    };

    Funcionario.insertFuncionario(funcObject, (status, data) => {
        callback = {
            error: status,
            data
        };

        res.send(callback);
    });
});

// requisitar o update do funcionário ao model
router.post('/updateFuncionario', (req, res) => {
    let callback = {};
    const funcObject = {
        ID: req.body.id,
        NOME: req.body.nome,
        EMAIL: req.body.email,
        ENDERECO: req.body.endereco,
        CPF: req.body.cpf,
        IDADE: req.body.idade,
        CARGO: req.body.cargo,
        SALARIO: req.body.salario,
        DATA_CONTRATACAO: req.body.data,
        SITUACAO: req.body.situacao
    };

    Funcionario.updateFuncionario(funcObject, (status, data) => {
        callback = {
            error: status,
            data
        };

        res.send(callback);
    });
});

// requisitar a exclusão do funcionário no model
router.delete('/deleteFuncionario/:id', (req, res) => {
    let callback = {};
    const funcObject =  {
        ID: req.params.id
    };

    Funcionario.deleteFuncionario(funcObject, (status, data) => {
        callback = {
            error: status,
            data
        };

        res.send(callback);
    });
});

module.exports = router;