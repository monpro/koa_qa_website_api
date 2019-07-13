const Router = require('koa-router');
const router = new Router({prefix: '/topics'});
const jwt = require('koa-jwt');
const {find, findById, create,
        update, checkTopicExist, listTopicFollowers
        } = require('../controllers/topics');

const {secret} = require("../config");
const auth = jwt({secret});


router.get('/', find);

router.post('/', auth, create);

router.get('/:id', checkTopicExist, findById);

router.patch('/:id', auth, checkTopicExist, update);

router.get('/:id/followers', auth, checkTopicExist, listTopicFollowers)

module.exports = router;