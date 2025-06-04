const express = require('express')
const router = express.Router()


// ----------MIDDLEWARES----------MIDDLEWARES----------MIDDLEWARES----------MIDDLEWARES----------MIDDLEWARES----------MIDDLEWARES-----------------
const auth = require('../middlewares/authUsuarioMiddleware');
const verifyMaster = require('../middlewares/verifyMaster');
const verifyAdm = require('../middlewares/verifyAdm');
const verifySimple = require('../middlewares/verifySimple');

// ----------CONTROLLERS----------CONTROLLERS----------CONTROLLERS----------CONTROLLERS----------CONTROLLERS----------CONTROLLERS-----------------
const produtosControllers = require('../controllers/produtosControllers');
const usuariosControllers = require('../controllers/usuariosControllers');
const mesasControllers = require('../controllers/mesasControllers');
const frmPagamentosControllers = require('../controllers/frmPagamentosControllers');
const loginControllers = require('../controllers/loginControllers');

// ----------ROTAS_PRODUTOS----------ROTAS_PRODUTOS----------ROTAS_PRODUTOS----------ROTAS_PRODUTOS----------ROTAS_PRODUTOS----------ROTAS_PRODUTOS-----------------

router.get('/produtos', auth, produtosControllers.listAll);
router.get('/produtos/:id', auth, produtosControllers.findById);


router.post('/produtos', auth, verifyAdm, produtosControllers.new);


router.put('/produtos/:id', auth, verifyAdm, produtosControllers.editProduto);


router.delete('/produtos/:id', auth, verifyAdm, produtosControllers.remove);

// ----------ROTAS_USUARIOS----------ROTAS_USUARIOS----------ROTAS_USUARIOS----------ROTAS_USUARIOS----------ROTAS_USUARIOS----------ROTAS_USUARIOS-----------------

router.get('/usuarios', auth, verifySimple, usuariosControllers.listAll);
router.get('/usuarios/:id', auth, verifyAdm, usuariosControllers.findById);
router.get('/usuarios/login/:login', auth, verifyAdm, usuariosControllers.findByLogin);


router.post('/usuarios', auth, verifyMaster, usuariosControllers.new);


router.put('/usuarios/:id', auth, verifyAdm, usuariosControllers.editUsuario);


router.delete('/usuarios/:id', auth, verifyAdm, usuariosControllers.remove);

// ----------ROTAS_MESAS----------ROTAS_MESAS----------ROTAS_MESAS----------ROTAS_MESAS----------ROTAS_MESAS----------ROTAS_MESAS-----------------

router.get('/mesas', auth, verifySimple, mesasControllers.listAll);
router.get('/mesas/:id', auth, verifySimple, mesasControllers.findById);
router.get('/mesas/:id/produtos', auth, verifySimple, mesasControllers.listarProdutosDaMesa);


router.post('/mesas', auth, verifyAdm, mesasControllers.new);
router.post('/mesas/:id/adicionar-produtos', auth, verifyAdm, mesasControllers.adicionarProdutosNaMesa);
router.post('/mesas/:id/fechar', auth, verifyAdm, mesasControllers.fecharMesa);


router.put('/mesas/:id', auth, verifyAdm, mesasControllers.editMesa);


router.delete('/mesas/:id', auth, verifyAdm, mesasControllers.remove);
router.delete('/mesas/:id/produtos/:id_produto', auth, verifyAdm, mesasControllers.removerProdutoDaMesa);

// ----------ROTAS_FORMA_PAGAMENTOS----------ROTAS_FORMA_PAGAMENTOS----------ROTAS_FORMA_PAGAMENTOS----------ROTAS_FORMA_PAGAMENTOS----------ROTAS_FORMA_PAGAMENTOS----------ROTAS_FORMA_PAGAMENTOS-----------------

router.get('/formas', auth, verifySimple, frmPagamentosControllers.listAll);
router.get('/formas/:id', auth, verifySimple, frmPagamentosControllers.findById);

// ----------ROTAS_LOGIN----------ROTAS_LOGIN----------ROTAS_LOGIN----------ROTAS_LOGIN----------ROTAS_LOGIN----------ROTAS_LOGIN-----------------

router.post('/login', loginControllers.login)

// ----------- EXPORTAÇÃO -----------

module.exports = router