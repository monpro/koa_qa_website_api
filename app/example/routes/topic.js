const Router = require('koa-router');
const router = new Router({prefix: '/topics'});
const jwt = require('koa-jwt');
const {find, findById, create,
        update
        } = require('../controllers/topics');

const {secret} = require("../config");
const auth = jwt({secret});


router.get('/', find);

router.post('/', auth, create);

router.get('/:id', findById);

router.patch('/:id', auth, update);


module.exports = router;