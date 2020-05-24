const express = require('express');
const Funcionario = require('../controller/Funcionario');

router = express.Router();

router.use('/funcionario', Funcionario);

module.exports = router;