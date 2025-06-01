const express = require('express')
const router = express.Router()


// ----------ROTAS_PRODUTOS----------ROTAS_PRODUTOS----------ROTAS_PRODUTOS----------ROTAS_PRODUTOS----------ROTAS_PRODUTOS----------ROTAS_PRODUTOS-----------------

const produtosControllers = require('../controllers/produtosControllers')

router.get('/produtos', produtosControllers.listAll)
router.get('/produtos/:id', produtosControllers.findById)


router.post('/produtos', produtosControllers.new)


router.put('/produtos/:id', produtosControllers.editProduto)


router.delete('/produtos/:id', produtosControllers.remove)

// ----------ROTAS_USUARIOS----------ROTAS_USUARIOS----------ROTAS_USUARIOS----------ROTAS_USUARIOS----------ROTAS_USUARIOS----------ROTAS_USUARIOS-----------------

const usuariosControllers = require('../controllers/usuariosControllers')

router.get('/usuarios', usuariosControllers.listAll)
router.get('/usuarios/:id', usuariosControllers.findById)
router.get('/usuarios/login/:login', usuariosControllers.findByLogin)
// http://localhost:4050/usuarios/login/nome_do_usuario


router.post('/usuarios', usuariosControllers.new)


router.put('/usuarios/:id', usuariosControllers.editUsuario)


router.delete('/usuarios/:id', usuariosControllers.remove)

// ----------ROTAS_MESAS----------ROTAS_MESAS----------ROTAS_MESAS----------ROTAS_MESAS----------ROTAS_MESAS----------ROTAS_MESAS-----------------

const mesasControllers = require('../controllers/mesasControllers')

router.get('/mesas', mesasControllers.listAll)
router.get('/mesas/:id', mesasControllers.findById)
router.get('/mesas/:id/produtos', mesasControllers.listarProdutosDaMesa);


router.post('/mesas', mesasControllers.new)
router.post('/mesas/:id/adicionar-produtos', mesasControllers.adicionarProdutosNaMesa);
router.post('/mesas/:id/fechar', mesasControllers.fecharMesa);


router.put('/mesas/:id', mesasControllers.editMesa)


router.delete('/mesas/:id', mesasControllers.remove)
router.delete('/mesas/:id/produtos/:id_produto', mesasControllers.removerProdutoDaMesa);

// ----------ROTAS_FORMA_PAGAMENTOS----------ROTAS_FORMA_PAGAMENTOS----------ROTAS_FORMA_PAGAMENTOS----------ROTAS_FORMA_PAGAMENTOS----------ROTAS_FORMA_PAGAMENTOS----------ROTAS_FORMA_PAGAMENTOS-----------------

const frmPagamentosControllers = require('../controllers/frmPagamentosControllers')

router.get('/formas', frmPagamentosControllers.listAll)
router.get('/formas/:id', frmPagamentosControllers.findById)

// ----------ROTAS_LOGIN----------ROTAS_LOGIN----------ROTAS_LOGIN----------ROTAS_LOGIN----------ROTAS_LOGIN----------ROTAS_LOGIN-----------------

const loginControllers = require('../controllers/loginControllers')

router.post('/login', loginControllers.login)

// -----------------------------------------------------------------------------

module.exports = router